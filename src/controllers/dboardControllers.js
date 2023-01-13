const { transporter } = require("../config/mailConfig");
const { getProjects, getTemplate, editTemplate, getTemplateByCat, createTemplate, createStore, getStore, addToStore, getstoreInfo, deleteTemplate, updateUserInfo, importMedia, exportMedia } = require("../services/dboardServices");
const fs = require('fs');
require("dotenv").config();
exports.displayView = async(req, res) => {
    const overview = {
        summary : {
        sitesCreated: '-',
        views: '-',
        orders: '-',
        earnings: '-'
            },
        
        vendors: {
        }

};
    res.json(overview);
};

// exports.profile = async(req, res) => {
//     try {
//     const userDetails = await getUserById(req.params.id);
//     let keys =  userDetails.rows[0];
//     res.json({
//         name: keys.firstname + " " + keys.lastname,
//         bname: keys.bname,
//         email: keys.email,
//         contact: keys.contact,
//         location: keys.location

//     });
// } catch (error) {
//     res.status(500).send('Internal server error');
// };
// };

exports.updateProfile = async(req, res) => {
    try {
    let uid = req.query.id
    let {firstname, business, email, contact, location } = req.body;
    // name=name.split(" ");
    // let firstname = name[0], lastname = name[1];
   const updatedUser=  await updateUserInfo(firstname, business, email, contact, location, uid);
   const details = updatedUser.rows[0];
   let user = {
    id: details.id,
    firstname: details.firstname,
    business: details.bname,
    email: details.email,
    location: details.location,
    contact: details.contact
}
   res.json(user);
} catch (error) {
    res.status(500).send('Internal server error');
};
};

exports.sendMessage = (req, res) => {
    let {message, email} = req.body;
    try {
    const mailOptions = {
        from: ` "Storefront - ${email} " <${email}>`,
        to: `steppak199@gmail.com`,
        subject: "Storefront -Support Assistance",
        html: `<h3>${message}</h3>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            throw error;
        }
    });
    res.status(200).send();

    } catch (error) {
        res.status(500).send('Internal server error');
    }
};

exports.recentProjects= async(req, res) => {
    const projects = await getProjects(req.query.uid);
    res.status(200).json(projects.rows);
};

exports.loadTemplates = async(req ,res) => {
    try{
    const stores = await getstoreInfo(req.query.uid);
    let allStores = {};
    stores.rows.forEach(store=> {
        let name = store.name, features = store.features;
        allStores[name] = features;
    
    });
    // res.send(allStores[0]);
    console.log(allStores);
    res.json(allStores)
} catch(error) {
    res.send(error);
}
};

exports.buildTemplate = async(req, res, next) => {
    try {
    const {uid} = req.query;
    for(const [key, value] of Object.entries(req.body)) {
        const storeExist = await getStore(key);
        if(!storeExist.rows.length) {
         await createStore(key, uid)
         await createTemplate(key, uid);
        }; 
         await addToStore(key, uid, value);
    };
    next()
    } catch(error) {
        res.send(error)
    }
};

exports.deleteStore = async(req, res, next) => {
    try {
    let { name, uid} = req.query;
    await deleteTemplate(name, uid);
    } catch(error) {
        res.send(error);
    }
    next();
};

exports.getProject= async(req, res) => {
    let tid = req.params.tid, uid= req.query.uid;
    const projects = await getTemplate(uid, tid);
    res.status(200).json(projects.rows[0]);
};

exports.editProject= async(req, res) => {
    let {props, sid} = req.body, tid = req.params.tid, uid = req.query.id;
    // props = JSON.parse(props);
    const projects = await editTemplate(sid, props, tid);
    res.status(201).send(projects.rows[0]);
};

exports.getProjectByCat = async(req, res) => {
    let cat = req.params.cat;
    const projects = await getTemplateByCat(cat);
    res.status(200).send(projects.rows);
};

exports.store = async(req, res, next) => {
    let {name} = req.body, uid = req.query.uid;
    const store = await createStore(name, uid);
    next();
};

exports.createProject = async (req, res) => {
    let {name, category} = req.body, tid = req.params.tid, uid = req.query.uid;
    const project = await createTemplate(name, uid, category, tid);
    res.status(201).send(project.rows[0]);
};

exports.storeFiles = async (req, res) => {
    const uid = req.query.uid;
    const { tag } = req.files;
    const tagName = tag.name;
    const uploadPath = __dirname + "/uploads/" + tagName;

    tag.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);
        const exportPath = process.env.baseURLT + `/uploads/${tagName}`; 
        res.send(exportPath);
    });

     await importMedia(uid, tagName);

};

exports.updateProfileImg = async (req, res) => {
    const uid = req.query.uid;
    const { tag } = req.files;
    const tagName = tag.name;
    const rootPath = __dirname + '/uploads/';
    const uploadPath = rootPath + tagName;


    const profileExists = await exportMedia(uid);
    if (profileExists.rows.length) {
      const deletePath = rootPath + profileExists.rows[0].profile;
       fs.unlink(deletePath, (err)=> {
        if(err) {
        return 
        }
       });
    };

    tag.mv(uploadPath, function(err) {
        console.log(uploadPath);
        if (err) return res.status(500).send(err);
        const exportPath = process.env.baseURLT + `/uploads/${tagName}`;
        console.log(exportPath);
        res.send(exportPath);
    });

     await importMedia(uid, tagName);

};

// exports.getFile = async (req, res) => {
//     let { uid } = req.query;
//     const profile = await exportMedia(uid)
//     const exportPath = __dirname + `/uploads/${profile.rows[0].profile}`; 
//     res.sendFile(exportPath);
// };

exports.getFile = async (req, res) => {
    let { img } = req.params;
    const exportPath = __dirname + `/uploads/${img}`; 
    res.sendFile(exportPath);
};