const { getUserByEmail, saveToDatabase, getUsersFromDatabase, getUserToken, verifyUserStatus, resetUserPassword, getUserById} = require("../services/userServices");
const { check } = require("../middlewares/verify_m");
const { verifyHash } = require("../helpers/sys");
const config = require("../config/jwtConfig");
const jwt = require("jwt-simple");
const crypto = require("crypto");
const { transporter } = require("../config/mailConfig");
const { jwtSecret } = require("../config/jwtConfig");

exports.signUp = async (req, res) => {

    let { firstname, lastname, email, password, password2} = req.body, { role } = req.query;
    let emailToken = crypto.randomBytes(64).toString("hex"),
    isverified = false;
    email = email.toLowerCase();
    try {
        const emailCheck = await getUserByEmail(email);
        if (emailCheck.rows.length > 0) {
            res.status(404).send("Email already exists!");
        } else {
            const user = await saveToDatabase(firstname, lastname, email, password, role, emailToken, isverified);
            if (user.rows.length > 0) {
               let mailOptions =  {
                    from: ` "Verify your email" <aihoonstephen@gmail.com>`,
                    to: user.rows[0].email,
                    subject: "Storefront -Verify Your Email",
                    html: `<div style="background-color:#0d253f" width: 100%>
                    <h2 style="color:white">STOREFRONT</h2>
                    <hr style="text-align:left; margin:0px; width:100px; height:0.3px; color:#01b4e4; top:0px">
                    <br>
                    <h3 style="color: white">Hi ${user.rows[0].firstname}!</h3>
                    <h3 style="color:white">Thanks for registering with us at Storefront and welcome!</h3>
                    <span style="color:white"> We're excited to see you join the community!. As a business owner of Storefront, you can choose from a wide range of multiple design templates and additionally customise your templates to fit your business needs and there are many more features for you</span>
                    <br>
                    <br>
                    <a style="color: #fff; border-radius:20px; border:10px; background-color:#01b4e4; padding: 0px 10px; font-weight:700px"  href="${req.protocol}://${req.headers.host}/verify-email?token=${user.rows[0].emailtoken}">ACTIVATE MY ACCOUNT</a>
                    <br>
                    <br>
                    <p style="color:white">You are receiving this email because you registered with us on www.${req.headers.host}</p>
                    </div>`
                
                };

            
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    throw error;
                } else {
                    res.status(200).send("Verification email has been sent to your email account");
                }
                
            })
        } else {
            res.status(404);
        }

        }
    } catch (err) {
        throw err;
    }
};

exports.login =async (req, res) => {
    let { email, password } = req.body;
    try{
    const results= await getUserByEmail(email);
    if (results.rows.length > 0) {
        let user = results.rows[0];
        let payload = {
            id: user.id,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7days
        };
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({
            token: token
        });
    } 
} catch (error) {
    throw error;
}

};

exports.logout = (req, res) => {
    req.logout(function(err) {
        if(err) return next(err)
    });
    res.send("You have successully logged out");
};

exports.verifyUser = async (req, res) => {
    try{
        const tok = req.query.token;
        const user = await getUserToken(tok);
        if(user.rows.length > 0 && user.rows[0].isverified == false) {
            const email = user.rows[0].email;
             const verify = await verifyUserStatus(email);
             res.status(200).send("You have been verified");
        } else {
            res.status(401).send("Couldn't verify your email")
        }
    } catch(error) {
        res.status(500).send(error);
    }
};


exports.authenticateUser = async (email, password, done) => {
    try {
        const results = await getUserByEmail(email);
        if (results.rows.length > 0) {
            const user = results.rows[0];

            try {
                const isMatch = await verifyHash(password, user);

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Password or email is not correct"});
                }
            } catch (err) {
                throw err;
            }
        } else {
            return done(null, false, {message: "Password is email is not correct"});
        }
    } catch (err) {
        throw err;
    }
};

exports.resetPassword = async(req, res) => {
    try {
        let { email } = req.body;
        const user= await getUserByEmail(email);
    if (user.rows.length > 0) {
        let payload = {
            id: user.rows[0].id,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7days
        };

        const jwtSecret = config.jwtSecret + user.rows[0].password
        const token = jwt.encode(payload, jwtSecret);
        let mailOptions = {
            from:` "Reset your Password" <aihoonstephen@gmail.com>`,
            to: user.rows[0].email,
            subject: "RESET YOUR PASSWORD",
            html: `
            <h3 >Hi ${user.rows[0].firstname}</h3>
            <p>As you have requested for reset password instructions, here they are, please follow the URL:</p>
            <br>
            <a href="${req.protocol}://${req.headers.host}/reset-password?token=${token}&id=${user.rows[0].id}">RESET YOUR PASSWORD HERE</a>
            `
        }

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                throw err;
            } else {
                res.status(200).send("You will receive an email with a reset link if you have registered an account with us with this mail.");
            }
        })
    } 
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong!")
    }
};

exports.reset = async(req, res) => {
    try {
    let { token, id} = req.query;
    let { password, password2 } = req.body;
    
    const results = await getUserById(id);
    
    const jwtSecret = config.jwtSecret +results.rows[0].password;
    const verified = await jwt.decode(token, jwtSecret);
        const update = await resetUserPassword(password, results.rows[0].email);
        console.log(update.rows[0].password)

        if (update.rows.length > 0) {
            res.status(200).send("Password successfully reseted");
        }

    } catch (error) {
    res.status(404).send("Invalid token")
}
}
