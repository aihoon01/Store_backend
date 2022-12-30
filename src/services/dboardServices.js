const { pool } = require('../config/dbConfig');

exports.updateUserInfo = (firstname, lastname, bname, email, contact, location )=> {
   return pool.query(`UPDATE users SET firstname = $1, lastname = $2, bname=$3, contact=$4, location=$5 WHERE email=$6 returning *`, [firstname, lastname, bname, contact, location, email]);

};

exports.getProjects = (id) => {
   // let users;
   // // users.id = id
   return pool.query(`
   WITH st AS (SELECT * FROM store WHERE store.userid = $1)
   SELECT storeinfo.templateid, storeinfo.features FROM storeinfo, st
   WHERE storeinfo.storeid= st.id GROUP BY 1, 2`, [id]);
   // const ids = await pool.query(`SELECT id FROM users WHERE users.id = $1`, [id]);
   // const storeid = await pool.query(`SELECT * FROM store WHERE user.`)
};

exports.createStore = (name, uid) => {
   return pool.query(`INSERT INTO store (name, userid) VALUES($1, $2)`, [name, uid])
};

exports.createTemplate = (name, uid) => {
   return pool.query(`
   WITH temp AS (SELECT id FROM store WHERE store.name=$1 AND store.userid=$2)
      INSERT INTO storeinfo(storeid) VALUES((SELECT id FROM temp))`, 
      [name, uid]);

};

// exports.createTemplate = (name, uid, cat, tid) => {
//    return pool.query(`
//    WITH temp AS (SELECT id FROM store WHERE store.name=$1 AND store.userid=$2)
//       INSERT INTO storeinfo(storeid, category, templateid) VALUES((SELECT id FROM temp), $3, $4) returning storeinfo.templateid, storeinfo.features`, 
//       [name, uid, cat, tid]);

// };

exports.addToStore =(name ,uid, props) => {
   return pool.query(`
   WITH temp AS (SELECT id FROM store WHERE store.name=$1 AND store.userid=$2)
   UPDATE storeinfo SET features=$3 WHERE storeinfo.storeid = (SELECT id FROM temp)
   `, [name, uid, props]);
};

exports.getStore = (name) => {
   return pool.query(`SELECT * FROM store WHERE name =$1`, [name])
};

exports.getstoreInfo = (uid) =>{
   return pool.query(
   `WITH temp AS (SELECT * FROM store WHERE store.userid=$1)
      SELECT temp.name, storeinfo.features FROM temp JOIN storeinfo ON temp.id = storeinfo.storeid
      `, [uid]
   )
};

exports.deleteTemplate = (name, uid) => {
   return pool.query(`DELETE FROM store WHERE name=$1 AND userid=$2`, [name, uid]);
};


exports.getTemplate = (uid, tid) => {
   return pool.query(`
   WITH store AS (SELECT * FROM store WHERE store.userid=$1),
      temp AS ( SELECT * FROM storeinfo, store WHERE store.id = storeinfo.storeid)
      SELECT temp.templateid, temp.features FROM temp WHERE temp.templateid = $2`, [uid, tid]);
};

exports.editTemplate = (sid, props, tid ) => {
   return pool.query(`
    WITH temp AS (SELECT * FROM storeinfo, store WHERE storeinfo.storeid = $1),
      ID AS (SELECT temp.templateid FROM temp WHERE temp.templateid = $2)
      UPDATE storeinfo SET features = $3 WHERE storeinfo.templateid = (SELECT * FROM ID) returning *`, [sid, tid, props]);
};

exports.getTemplateByCat= (cat) => {
   return pool.query(`
   SELECT * FROM templates WHERE category=$1`, [cat])
}