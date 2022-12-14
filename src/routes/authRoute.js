const express = require("express");
const { signUp, logout, resetPassword, reset, access, verifytoken, vCheck, login } = require("../controllers/authController");
const { validateSignUp, inputValidation, validateReset, checkAuthenticated } = require("../middlewares/verify_m");
const passport = require("passport");
const authRouter = express.Router();

// signupRoute 
authRouter.post('/register', validateSignUp, inputValidation, signUp);
authRouter.get('/verify-email', verifytoken);

// loginRoute
authRouter.post('/login', vCheck, passport.authenticate("local"), login);

//logout
authRouter.get('/logout', logout);

//Password Reset
authRouter.post('/reset', resetPassword);
// authRouter.get('/reset-password', access);
authRouter.post('/reset-password', validateReset, inputValidation, reset);



module.exports = authRouter;