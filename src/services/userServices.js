const { pool } = require('../config/dbConfig');
const { hashedPassword} = require("../helpers/sys")

exports.getUserByEmail = (email) => {
    try {
    return pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
} catch(error) {
    throw error;
}
};

exports.saveToDatabase = async (firstname, lastname, bname, email, Password, role) => {
    const hashed = await hashedPassword(Password);

    return pool.query(`INSERT INTO users (firstname, lastname, bname, email, password, role) VALUES($1, $2, $3, $4, $5, $6) returning *`, [firstname, lastname, bname, email, hashed, role])
};

exports.getUserById = (id) => {
        return pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
};

exports.resetUserPassword = async(password, email) => {
    const hashed = await hashedPassword(password);
    return pool.query(`UPDATE users SET password=$1 WHERE email=$2 returning *`, [hashed, email])
};

