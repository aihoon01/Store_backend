const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const authRouter = require("./src/routes/authRoute");
// const auth = require("./src/middlewares/auth_m")();
const passport = require("passport");
const initializePassport = require("./src/config/passportConfig");
const session = require("express-session");
require("dotenv").config();


// auth();
initializePassport(passport);

//Middlewares
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}));

// app.use(auth.initialize());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//API ROUTES
app.use(authRouter);
  
//Port config
const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);