const { pool } = require('../config/dbConfig');
const { hashedPassword} = require("../helpers/sys")

exports.getUserByEmail = (email) => {
    try {
    return pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
} catch(error) {
    throw error;
}
};

exports.saveToDatabase = async (firstname, lastname, email, Password, role, emailtoken,isverified) => {
    const hashed = await hashedPassword(Password);

    return pool.query(`INSERT INTO users (firstname, lastname, email, password, role, emailtoken, isverified) VALUES($1, $2, $3, $4, $5, $6, $7) returning *`, [firstname, lastname, email, hashed, role, emailtoken, isverified])
};

exports.getUserById = (id) => {
        return pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
}

exports.getUserToken = (token) => {
    return pool.query(`SELECT * FROM users WHERE emailtoken=$1`, [token]);
}

exports.verifyUserStatus=(email) => {
    return pool.query(`UPDATE users SET emailtoken=Null, isverified=true WHERE email=$1`, [email]);
};

exports.resetUserPassword = async(password, email) => {
    const hashed = await hashedPassword(password);
    return pool.query(`UPDATE users SET password=$1 WHERE email=$2 returning *`, [hashed, email])
};

