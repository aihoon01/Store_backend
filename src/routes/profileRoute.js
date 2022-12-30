const express = require("express");
const { check } = require("express-validator");
const { displayView, profile, sendMessage, updateProfile, recentProjects, getProject, editProject, getProjectByCat, createProject, store, buildTemplate, loadTemplates, deleteStore} = require("../controllers/dboardControllers");
const { checkNotAuthenticated } = require("../middlewares/verify_m");

const proRouter = express.Router();


proRouter.get('/dashboard', checkNotAuthenticated, displayView);

// proRouter.get('/dashboard/:profile', checkNotAuthenticated, profile);
proRouter.post('/dashboard/profile', checkNotAuthenticated, updateProfile);

proRouter.post('/dashboard/support', checkNotAuthenticated, sendMessage);

//Users Recent Projects
// proRouter.get('/dashboard/projects/', checkNotAuthenticated, recentProjects);

//BULK DATA TRANSMISSION AS REQUESTED BY FRONT-END DEV
proRouter.post('/dashboard/projects', checkNotAuthenticated, buildTemplate, loadTemplates);
proRouter.get('/dashboard/projects', checkNotAuthenticated, loadTemplates);
proRouter.delete('/dashboard/projects', checkNotAuthenticated, deleteStore, loadTemplates);

//Options by Category for users to choose from
proRouter.get('/dashboard/projects/:cat', checkNotAuthenticated, getProjectByCat);

//Users Personalized templates
proRouter.get('/dashboard/project/:tid', checkNotAuthenticated, getProject);
proRouter.post('/dashboard/project/:tid', checkNotAuthenticated, store, createProject);
proRouter.put('/dashboard/project/:tid', checkNotAuthenticated, editProject);

module.exports = proRouter;