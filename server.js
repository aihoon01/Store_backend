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
const store = new session.MemoryStore();
require("dotenv").config();


// auth();
initializePassport(passport);

//Middlewares
app.use(session({
    secret: process.env.secret,
    cookie: {secure: true, sameSite: 'none'},
    resave: false,
    saveUninitialized: false,
    store,
}));

// app.use(auth.initialize());
app.set("trust proxy", 1);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: ["https://amalistore.netlify.app", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(fileUpload());

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
