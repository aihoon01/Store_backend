const bcrypt = require("bcrypt");

exports.hashedPassword = (password) => {
    return bcrypt.hash(password, 10);
};

exports.verifyHash = (arg1, arg2) => {
    return bcrypt.compare(arg1, arg2.password);
};
