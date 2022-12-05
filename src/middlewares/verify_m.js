const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
    check("firstname")
        .trim()
        .not()
        .isEmpty()
        .withMessage("First name is required!")
        .isString()
        .isLength({max: 20})
        .withMessage("First name cannot be more than 20 character!"),

    check("lastname")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Last name is required!")
        .isString()
        .isLength({max: 20})
        .withMessage("Last name cannot be more than 20 character!"),
    
    check("email")
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid email!"),
    
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is required!")
        .custom((value) => {
            const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

            if (!value.match(regex)) {
                throw new Error("Passwords must contain at least six characters, including uppercase, lowercase letters,numbers and a special character")
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

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();

    if (!result.length) return next();

    const error = result[0].msg;
    res.status(401).send({success: false, message: error});
}
