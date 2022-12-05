const { getEmail, saveToDatabase, getUsersFromDatabase } = require("../services/userTable");
const { check } = require("../middlewares/verify_m");
const { verifyHash } = require("../helpers/sys");
const config = require("../config/jwtConfig");
const jwt = require("jwt-simple");

exports.signUp = async (req, res) => {

    let { firstname, lastname, email, password, password2} = req.body, { role } = req.query;
    console.log(role)
    email = email.toLowerCase();
    try {
        const emailCheck = await getEmail(email);
        if (emailCheck.rows.length > 0) {
            res.send("Email already exists!");
        } else {
            const saved = await saveToDatabase(firstname, lastname, email, password, role);
            if (saved.rows.length > 0) res.json(saved.rows[0]);

        }
    } catch (err) {
        throw err;
    }
};

exports.login =async (req, res) => {
    let { email, password } = req.body;
    try{
    const results= await getEmail(email);
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

}

exports.logout = (req, res) => {
    req.logout(function(err) {
        if(err) return next(err)
    });
    res.send("You have successully logged out");
};

exports.authenticateUser = async (email, password, done) => {
    try {
        const results = await getEmail(email);
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

