const { getEmail, saveToDatabase, getUsersFromDatabase } = require("../services/userTable");
const { check } = require("../middlewares/checkers");

exports.signUp = async (req, res) => {
    let { name, email, password, password2 } = req.body;
    email = email.toLowerCase();
    try {
        const emailCheck = await getEmail(email);
        if (emailCheck.rows.length > 0) {
            res.send("Email already exists!");
        } else {
            const saved = await saveToDatabase(name, email, password);
            if (saved) res.json(saved);

        }
    } catch (err) {
        throw err;
    }
};

exports.getAll = async(req, res) => {
    let users = await getUsersFromDatabase();
    console.log(users.rows[0]);
    res.send(users.rows[0])
}

