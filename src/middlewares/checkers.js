exports.check = (req, res, next) => {
    let {name, email, password, password2 } = req.body;
    let errors = [];

if ((!name || !email || !password || !password2)) {
    errors.push({message: "Please enter all required fields*"});
};

if (password.length < 6) {
    errors.push({message: "Password should be at leat 6 characters"});
}

if (password != password2) {
    errors.push({message: "password do not match"});
}

if (errors.length > 0) {
    res.json(errors);
} else {
    next()
}

}