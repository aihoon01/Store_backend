const { transporter } = require("../config/mailConfig");
const { getProjects, getTemplate, editTemplate, getTemplateByCat, createTemplate, createStore, getStore, addToStore, getstoreInfo, deleteTemplate, updateUserInfo, importMedia, exportMedia, getVendors, detailedInsights, fileMedia, uploadMedia, updateMedia, addView, addVendorDetails, getVendor, addItemsDetails } = require("../services/dboardServices");
const fs = require('fs');
require("dotenv").config();


exports.storeAnalytics = async(req, res) => {
    let uid = req.query.uid;
    const insights = await detailedInsights(uid)
    const vendors = await getVendors(uid)
    
    let overview= {
        summary : insights.rows[0],
        
        vendors: vendors.rows[0]

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
    const emailCheck = await getUserByEmail(email);
    if (emailCheck.rows.length) {
    res.status(403).send('Email already exists'); 
    } else {
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
}
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

exports.templateInsights = async (req, res) => {
    let uid = req.query.uid, name = req.params.name;
    
    await addView(name)
    
    res.status(201).send();

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
    const storename = req.params.storename;
    let response = {};
    for(const [key, value] of Object.entries(req.files)) {
        let keyName = value.name;
        const rootPath = './src/controllers/uploads/';
        const uploadPath = rootPath + keyName; 
        const fileExists = await fileMedia(uid, storename);

        if(!fileExists.rows.length) {
            await uploadMedia(uid, storename, keyName, key);

        } else {

            if(fileExists.rows[0].filename === keyName) {
                const deletePath = rootPath + fileExists.rows[0];
               fs.unlink(deletePath, (err) => {
                if(err) return
               });
               await updateMedia(uid, storename, keyName, key, fileExists.rows[0].filename);
            }
             else {
                await uploadMedia(uid, storename, keyName, key);
            };

        };
        
    
        value.mv(uploadPath, function(err) {
            if (err) return res.status(500).send(err);
            
        });

        const exportPath = process.env.baseURLT + `/uploads/${keyName}`; 
        response[key] = {src: exportPath};

    }

    res.send(response);

};

exports.feedFiles = async (req, res) => {
    let uid = req.query.uid, 
    storename = req.params.storename;

    const files = await fileMedia(uid, storename);
    let response = {};

    files.rows.forEach(file => {
        let fname = file.filename,
        label = file.label
        const exportPath = process.env.baseURLT + `/uploads/${fname}`; 
        response[label] = {src: exportPath};
    });
    res.send(response);

};
// const rootPath = require('../../src/controllers/uploads/')
exports.updateProfileImg = async (req, res) => {
    const uid = req.query.uid;
    const { tag } = req.files;
    const tagName = tag.name;
    const rootPath = './src/controllers/uploads/';
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
        res.send(exportPath);
    });

     await importMedia(uid, tagName);

};

exports.getProfilePic = async (req, res) => {
    const uid = req.query.uid;
    const profileExists = await exportMedia(uid);
    if(profileExists.rows.length) {
    const exportPath = process.env.baseURLT + `/uploads/${profileExists.rows[0].profile}`
    res.send(exportPath);
    } else {
        res.status(403).send("User has no profile Picture");
    }
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

exports.addVendor = async (req, res, next) => {
    let {uid }= req.query,
    {storename} = req.params,
    {item, commission, vendor} = req.body;

    const vendorExists = await getVendor(vendor);
    if(!vendorExists.rows.length) {
        await addVendorDetails(uid, storename, commission);
        next()
    } else {
        res.status(404).send('Vendor already exists')
    }

};

exports.addItems = async (req, res) => {
     let {uid }= req.query,
    {storename} = req.params,
    {item, vendor}= req.body;

    let itemName = item.name,
    itemPrice = item.price,
    itemSize = item.size;
    try {
    await addItemsDetails(uid, storename, vendor, itemName, itemSize, itemPrice);
    } catch(error) {
        res.send(404).send("Couldn't add Item")
    }

    res.status(201).send("Vendor and Items successfully added");

};