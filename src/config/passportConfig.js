const LocalStrategy = require("passport-local").Strategy;

const { authenticateUser } = require("../controllers/authController");
const { getUserById } = require("../services/userServices");
const { pool } = require("./dbConfig");

function initialize(passport) {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    authenticateUser
    ))

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
        const user = await getUserById(id);
        if (user.rows.length > 0) done(null, user.rows[0])
    
} catch (error) {
    throw error;
}
});

}
module.exports = initialize