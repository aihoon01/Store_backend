const express = require("express");
const { signUp, login, logout, verifyUser, resetPassword, reset } = require("../controllers/authController");
const { validateUserSignUp, inputValidation, validateReset } = require("../middlewares/verify_m");
const passport = require("passport");
const { verifyEmail } = require("../middlewares/auth_m");

const usersRouter = express.Router();

// signupRouter.use(check); 
usersRouter.post('/users/register', validateUserSignUp, inputValidation, signUp);

usersRouter.post('/users/login', passport.authenticate("local"), verifyEmail, login)

usersRouter.get('/users/logout', logout);
usersRouter.get('/verify-email', verifyUser);
usersRouter.post('/reset', resetPassword);
usersRouter.post('/reset-password', validateReset, inputValidation, reset);
usersRouter.get('/reset-password', (req, res) => {
    res.status(200).send("You will be redirected shortly")
});


module.exports = usersRouter;