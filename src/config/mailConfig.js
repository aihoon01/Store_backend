require("dotenv").config();
const nodemailer = require("nodemailer");


exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "aihoonstephen@gmail.com",
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});