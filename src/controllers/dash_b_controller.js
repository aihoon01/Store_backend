const { ResultWithContext } = require("express-validator/src/chain");
const { transporter } = require("../config/mailConfig");
const { getUserByEmail, saveToDatabase, resetUserPassword, getUserById} = require("../services/userServices");


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

exports.profile = async(req, res) => {
    try {
    const userDetails = await getUserById(req.params.id);
    let keys =  userDetails.rows[0];
    res.json({
        name: keys.firstname + " " + keys.lastname,
        bname: keys.bname,
        email: keys.email,
        contact: keys.contact,
        location: keys.location

    });
} catch (error) {
    res.status(500).send('Internal server error');
};
};

exports.updateProfile = async(req, res) => {
    try {
    const userDetails = await getUserById(req.params.id);
    let keys =  userDetails.rows[0];
    res.json({
        name: keys.firstname,
        bname: keys.bname,
        email: keys.email,
        contact: keys.contact,
        location: keys.location

    });
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
}