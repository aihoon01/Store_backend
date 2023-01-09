const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const authRouter = require("./src/routes/authRoute");
// const auth = require("./src/middlewares/auth_m")();
const passport = require("passport");
const initializePassport = require("./src/config/passportConfig");
const session = require("express-session");
const cors = require("cors");
const proRouter = require('./src/routes/profileRoute');
const fileUpload = require('express-fileupload');
require("dotenv").config();


// auth();
initializePassport(passport);

//Middlewares
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

// app.use(auth.initialize());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true}));
app.use(fileUpload())

//API ROUTES
app.use(authRouter);
app.use(proRouter);
  
//Port config
const PORT = process.env.PORT || 3001;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

module.exports = app;