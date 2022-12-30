const { check, validationResult } = require("express-validator");

exports.validateSignUp = [
    check("firstname")
        .trim()
        .isLength({max: 20})
        .withMessage("First name cannot be more than 20 character!"),

    check("lastname")
        .trim()
        .isLength({max: 20})
        .withMessage("Last name cannot be more than 20 character!"),
    
    check("bname")
        .trim()
        .isLength({max: 100})
        .withMessage("Business name cannot be more than 100 characters"),
    
    check("email")
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid email!")
        .not()
        .isEmpty()
        .withMessage("Email is required"),
    
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is required!")
        .custom((value) => {
            const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

            if (!value.match(regex)) {
                throw new Error("Passwords must contain at least eight characters, including uppercase, lowercase letters, numbers and a special character")
            }
            return true;

        }),

    check("password2")
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password does not match")
            }
            return true;
        })

];

exports.validateReset =[   
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is required!")
        .custom((value) => {
            const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

            if (!value.match(regex)) {
                throw new Error("Passwords must contain at least eight characters, including uppercase, lowercase letters, numbers and a special character")
            }
            return true;

        }),

    check("password2")
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password does not match")
            }
            return true;
        })
];

exports.inputValidation = (req, res, next) => {
    const result = validationResult(req).array();

    if (!result.length) return next();

    const error = result[0].msg;
    res.status(401).send({success: false, message: error});
};

exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated) {
        //res.redirect('dashboard') redirect to dashboard 
    }
    next()  //else next.
};

exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(402).send('unauthorized');
    }
};
