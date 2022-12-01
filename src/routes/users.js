const express = require("express");
const { signUp } = require("../controllers/app");
const { check } = require("../middlewares/checkers");

const usersRouter = express.Router();

// signupRouter.use(check);
usersRouter.post('/users/register', check, signUp);

module.exports = usersRouter;