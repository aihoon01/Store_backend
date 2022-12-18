const { getUserByEmail, saveToDatabase, resetUserPassword, getUserById} = require("../services/userServices");
const { verifyHash } = require("../helpers/sys");
const config = require("../config/jwtConfig");
const jwt = require("jwt-simple");
const { transporter } = require("../config/mailConfig");
const { jwtSecret } = require("../config/jwtConfig");

const unverifiedMail = [];
//Signup Function
exports.signUp = async (req, res) => {

    let { firstname, lastname, bname, email, password, password2} = req.body, { role } = req.query;
    email = email.toLowerCase(); 
    try {
        const emailCheck = await getUserByEmail(email);
        if (emailCheck.rows.length > 0) {
            res.status(404).send("Email already exists!");
        } else {
            res.status(201).send("Verification email has been sent to your email account. Login with your Email verification link");
            const payload = {
                fname : firstname,
                lname : lastname,
                bname: bname,
                email : email,
                password: password,
                role: role
            }
            let token = jwt.encode(payload, jwtSecret);
               let mailOptions =  {
                    from: ` "Verify your email" <aihoonstephen@gmail.com>`,
                    to: email,
                    subject: "Storefront -Verify Your Email",
                    html: `<div style="background-color:#0d253f" width: 100%>
                    <h2 style="color:white">STOREFRONT</h2>
                    <hr style="text-align:left; margin:0px; width:100px; height:0.3px; color:#01b4e4; top:0px">
                    <br>
                    <h3 style="color: white">Hi ${firstname}!</h3>
                    <h3 style="color:white">Thanks for registering with us at Storefront and welcome!</h3>
                    <span style="color:white"> We're excited to see you join the community!. As a business owner of Storefront, you can choose from a wide range of multiple design templates and additionally customise your templates to fit your business needs and there are many more features for you</span>
                    <br>
                    <br>
                    <a style="color: #fff; border-radius:20px; border:10px; background-color:#01b4e4; padding: 0px 10px; font-weight:700px"  href="https://main--amalistore.netlify.app/authentication/verify-email?token=${token}">ACTIVATE MY ACCOUNT</a>
                    <br>
                    <br>
                    <p style="color:white">You are receiving this email because you registered with us on www.${req.headers.host}</p>
                    </div>`
                
                };

            
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    throw error;
                } else {
                unverifiedMail.push(email);

                }
                
            });
        

        }
    } catch (err) {
        res.status(500).send("Internal server problem");
    }

};

exports.logout = (req, res) => {
    req.logout(function(err) {
        if(err) return next(err)
    });
    res.status(200).send("You have successully logged out");
};

//Controller for verifying user token before saving to Database
exports.verifytoken = async (req, res) => {
    try{
        const { token } = req.query;
        const payload= jwt.decode(token, jwtSecret);
        let { fname, lname, bname, email, password, role } = payload;

        //if token is verified proceed to storing details to database
        if (payload) {
        //Save Details to Database
        const results = await saveToDatabase(fname, lname, bname, email, password, role);
        if(results.rows.length) {
        res.status(201).send("Thank you for verifying your email");
        } 
    } else {
        res.status(404).send("Verification link expired");
    }

    } catch(error) {
        res.status(500).send("Internal Server Problem");
    }
unverifiedMail.splice(unverifiedMail.indexOf(req.body.email), 1);

};

//Call Back function for Express Passport-local Strategy 
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
                return done(err);
            }
        } else {
            return done(null, false, {message: "Password is email is not correct"});
        }
    } catch (err) {
        return done(err);
    }
};


exports.resetPassword = async(req, res) => {
    try {
        res.status(200).send("You will receive an email with a reset link if you have registered an account with us with this mail.");
        let { email } = req.body;
        const user= await getUserByEmail(email);
    if (user.rows.length > 0) {
        let payload = {
            id: user.rows[0].id,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 1 // 1days
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
            <a href="https://main--amalistore.netlify.app/reset-password?token=${token}&id=${user.rows[0].id}">RESET YOUR PASSWORD HERE</a>
            `
        }

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                res.status(404).send("Something went wrong");
            }
        })
    } 
    } catch (error) {
        res.status(500).send("Internal Server Problem!")
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

        if (update.rows.length > 0) {
            res.status(200).send("Password successfully reseted");
        }

    } catch (error) {
    res.status(404).send("Invalid token")
}
};

exports.access = (req, res) => {
    res.status(201).send("You will be redirected soon");
};

exports.login = async (req, res) => {
    const results = await getUserByEmail(req.body.email);
    const details = {
        id: results.rows[0].id,
        firstname: results.rows[0].firstname,
        business: results.rows[0].bname
    }
    res.json(details);
};

exports.vCheck = (req, res, next) => {
    if (unverifiedMail.includes(req.body.email)) {
        res.status(404).send("You need to verify your email first");
    } else {
        next()
    }
};
