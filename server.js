const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const authRouter = require("./src/routes/authRoute");
// const auth = require("./src/middlewares/auth_m")();
const passport = require("passport");
const initializePassport = require("./src/config/passportConfig");
const session = require("express-session");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
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
app.use(cors());

// Swagger Setup
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Storefront App",
            version: "1.0.0",
            description: "An API for the Storefront template App",
            contact: {
                name: "API Support",
                email: "stephen.aihoon@gmail.com"
            }
        },
        servers: [ {url: "https://storefront-dpqh.onrender.com"}, {url: "http://localhost:3001"}]
    },
    apis: ["./src/controllers/*.js"]
};

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//API ROUTES
app.use(authRouter);
  
//Port config
const PORT = process.env.PORT || 3001;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);