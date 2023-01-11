const express = require("express");
const { displayView, sendMessage, updateProfile, getProject, editProject, getProjectByCat, createProject, store, buildTemplate, loadTemplates, deleteStore, storeFiles, getFile} = require("../controllers/dboardControllers");
const { checkNotAuthenticated } = require("../middlewares/verify_m");

const proRouter = express.Router();


proRouter.get('/dashboard', displayView); //checkNotAuthenticated

// proRouter.get('/dashboard/:profile', checkNotAuthenticated, profile);
proRouter.post('/dashboard/profile', updateProfile); //checkNotAuthenticated

proRouter.post('/dashboard/support', sendMessage); //checkNotAuthenticated

//Users Recent Projects
// proRouter.get('/dashboard/projects/', checkNotAuthenticated, recentProjects);

//BULK DATA TRANSMISSION AS REQUESTED BY FRONT-END DEV
proRouter.post('/dashboard/projects', buildTemplate, loadTemplates);  // checkNotAuthenticated
proRouter.get('/dashboard/projects', loadTemplates); // checkNotAuthenticated
proRouter.delete('/dashboard/projects', deleteStore, loadTemplates); // checkNotAuthenticated

//Options by Category for users to choose from
proRouter.get('/dashboard/projects/:cat', checkNotAuthenticated, getProjectByCat);

//Users Personalized templates
proRouter.get('/dashboard/project/:tid', checkNotAuthenticated, getProject);
proRouter.post('/dashboard/project/:tid', checkNotAuthenticated, store, createProject);
proRouter.put('/dashboard/project/:tid', checkNotAuthenticated, editProject);

//Uploading Pictures and Files 
proRouter.post('/uploads', storeFiles);
proRouter.get('/uploads/:name', getFile);

module.exports = proRouter;