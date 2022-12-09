const passport = require("passport");
const passportJWT = require('passport-jwt');
const { getUserById, getUserByEmail } = require("../services/userServices");
const cfg = require("../config/jwtConfig");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt")
};

module.exports = function() {
    const strategy = new Strategy(params, async function(payload, done) {
    try {
       const user = await getUserById(payload.id);
        if (user.rows.length > 0) {
            if (payload.expire<=Date.now()) {
                return done(new Error("TokenExpired"), null)
            } else {
                return done(null, user)
                }
        }

        else {
            return done(new Error("UserNotFound"), null);
       }

    } catch (error) {
            throw error
        }
    });

    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate:  function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};

exports.verifyEmail = async(req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email);
        console.log(user);
        if (user.rows[0].isverified) {
            next();
        }
    } catch (error) {
        res.status(404).send("Please check your email to verify your account")
    }
};