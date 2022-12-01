const { pool } = require('../config/dbConfig');
const { hashedPassword } = require("../helpers/sys")

exports.getEmail = (email) => {
    return pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

exports.saveToDatabase = async (name, email, Password) => {
    const hashed = await hashedPassword(Password);
    console.log(hashed);

    return pool.query(`INSERT INTO users (name, email, password) VALUES($1, $2, $3) returning *`, [name, email, hashed])
};

exports.getUsersFromDatabase = () => {
    return pool.query(`SELECT * FROM users`);
}