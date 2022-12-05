const express = require("express");
const { signUp, login, logout } = require("../controllers/authController");
const { validateUserSignUp, userValidation } = require("../middlewares/verify_m");
const passport = require("passport");

const usersRouter = express.Router();

// signupRouter.use(check);
usersRouter.post('/users/register', validateUserSignUp, userValidation, signUp);

usersRouter.post('/users/login', passport.authenticate("local"), login)

usersRouter.get('/users/logout', logout);
module.exports = usersRouter;