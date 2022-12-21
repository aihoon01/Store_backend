const express = require("express");
const { check } = require("express-validator");
const { displayView, profile, sendMessage} = require("../controllers/dash_b_controller");
const { checkNotAuthenticated } = require("../middlewares/verify_m");
const { updateUserInfo } = require("../services/dashboardServices");

const proRouter = express.Router();


proRouter.get('/dashboard', checkNotAuthenticated, displayView);

proRouter.get('/dashboard/:id', checkNotAuthenticated, profile);
proRouter.post('dashboard/:id', checkNotAuthenticated, updateUserInfo);

proRouter.post('/support', checkNotAuthenticated, sendMessage );

proRouter.get('/projects', checkNotAuthenticated, ...);
proRouter.get('projects/:id', checkNotAuthenticated, ...);
proRouter.post('projects/:id', checkNotAuthenticated, ...);

module.exports = proRouter;