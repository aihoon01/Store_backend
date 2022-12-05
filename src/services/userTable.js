const { pool } = require('../config/dbConfig');
const { hashedPassword } = require("../helpers/sys")

exports.getEmail = (email) => {
    try {
    return pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
} catch(error) {
    throw error;
}
};

exports.saveToDatabase = async (firstname, lastname, email, Password, role) => {
    const hashed = await hashedPassword(Password);
    console.log(hashed);

    return pool.query(`INSERT INTO users (firstname, lastname, email, password, role) VALUES($1, $2, $3, $4, $5) returning *`, [firstname, lastname, email, hashed, role])
};

exports.getUserById = (id) => {
        return pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
}