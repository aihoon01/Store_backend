const express = require("express");
const { signUp, login, logout } = require("../controllers/authController");
const { validateUserSignUp, userValidation, checkAuthenticated } = require("../middlewares/verify_m");
const passport = require("passport");

const usersRouter = express.Router();

// signupRouter.use(check);
usersRouter.post('/users/register', validateUserSignUp, userValidation, signUp);

usersRouter.post('/users/login', passport.authenticate("local"), login)

usersRouter.get('/users/logout', logout);
usersRouter.get('/users/register', checkAuthenticated); //if user is authenticated redirect to dashboard
usersRouter.get('/users/login', checkAuthenticated); // If user is authenticated redirect to dashboard
module.exports = usersRouter;