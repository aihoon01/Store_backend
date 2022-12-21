const { pool } = require('../config/dbConfig');

exports.updateUserInfo = (bname, contact, location ) {
   return pool.query(`UPDATE users SET bname=$1, contact=$2, location=$3 returning [bname, contact, location]`, [bname, contact, location]);

}