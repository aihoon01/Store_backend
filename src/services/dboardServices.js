const { pool } = require('../config/dbConfig');

exports.updateUserInfo = (firstname, bname, email, contact, location, id )=> {
   return pool.query(`UPDATE users SET firstname = $1, bname=$2, email=$3, contact=$4, location=$5 WHERE id=$6 returning *`, [firstname, bname, email,contact, location, id]);

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
};


exports.importMedia = (uid, data) => {
   return pool.query(
         `UPDATE users SET profile = $1 WHERE id = $2 returning profile`, [data, uid]  
   )
};

exports.exportMedia = (uid) => {
   return pool.query(
      `SELECT profile FROM users WHERE id = $1`, [uid]
   )
};


// exports.findId = (storename, uid) => {
//    try{
//        return pool.query(`SELECT uid from views where storename= $1 AND uid = $2`, [storename, uid])
//    } catch (error) {
//        throw error;
//    }
// };

exports.addView = (storename) => {
   try {
       return pool.query(`INSERT INTO views (storename, seen) VALUES($1, true)`, [storename])
   } catch (error) {
       throw error;
   }
};

exports.getVendors = (uid) => {
   return pool.query(`WITH store AS(SELECT * FROM store WHERE userid = $1)
   SELECT vendors.id, vendors.vendor, vendors.commission
   FROM store, vendors WHERE vendors.storeid = store.id`, [uid])
};

exports.detailedInsights = (uid) => {
   return pool.query(`WITH store AS (SELECT * FROM store WHERE userid=$1),
   sitescreated AS (SELECT COUNT(store) AS sites FROM store),
  views AS (SELECT COUNT(views.seen) AS views FROM views JOIN store ON views.storename=store.name),
  vends AS (SELECT vendors.id, vendors.vendor, vendors.commission, vendors.storeid FROM vendors JOIN store ON vendors.storeid = store.id),
  items AS (SELECT items.id, items.size, items.vendorid FROM items JOIN vends ON items.vendorid=vends.id),
  itemscount AS (SELECT SUM(items.size) AS items FROM items),
  orders AS (SELECT orders.id, orders.uid, orders.vendorid, orders.price FROM orders JOIN vends ON orders.vendorid = vends.id),
  orderscount AS (SELECT COUNT(orders.id) AS orders FROM orders),
  pricesum AS (SELECT SUM(orders.price) AS price FROM orders )
  
  SELECT sitescreated.sites AS sites, views.views AS views, itemscount.items AS items, orderscount.orders AS orders,
  pricesum.price AS earnings FROM sitescreated, views, itemscount, orderscount, pricesum`, [uid])
};

exports.fileMedia = (uid, storename) => {
   return pool.query(`WITH store AS (SELECT * FROM store WHERE userid = $1 AND name=$2)
   SELECT fileName FROM media, store WHERE media.storeid = (SELECT id FROM store)`, [uid, storename])
};

exports.uploadMedia = (uid, storename, filename) => {
   return pool.query(`WITH store AS (SELECT * FROM store WHERE userid = $1 AND name=$2) INSERT INTO media (storeid, fileName) VALUES((SELECT id FROM store), $3)`, [uid, storename, filename])
};

exports.updateMedia = (uid, storename, filename, existingfile) => {
   return pool.query(`WITH store AS (SELECT * FROM store WHERE userid = $1 AND name=$2)
    UPDATE media  SET fileName = $3 WHERE storeid=(SELECT id FROM store) AND filename =$4`, [uid, storename, filename, existingfile])
}