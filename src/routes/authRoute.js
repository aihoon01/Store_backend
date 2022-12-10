const express = require("express");
const { signUp, logout, resetPassword, reset, access, verifytoken } = require("../controllers/authController");
const { validateSignUp, inputValidation, validateReset, checkAuthenticated } = require("../middlewares/verify_m");
const passport = require("passport");

const authRouter = express.Router();

// signupRout 
authRouter.post('/auth/register', validateSignUp, inputValidation, signUp);
authRouter.get('/auth/register', checkAuthenticated, access);
authRouter.get('/verify-email', verifytoken);

// loginRoute
authRouter.post('/auth/login', passport.authenticate("local"), access);
authRouter.get('/auth/login', checkAuthenticated, access);

//logout
authRouter.get('/auth/logout', logout);

//Password Reset
authRouter.post('/reset', resetPassword);
authRouter.get('/reset-password', access);
authRouter.post('/reset-password', validateReset, inputValidation, reset);



module.exports = authRouter;