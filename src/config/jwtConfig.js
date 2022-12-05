require("dotenv").config();
module.exports = {
    jwtSecret: process.env.jwtSecret,
    jwtSession: {
        session: false
    }
};
