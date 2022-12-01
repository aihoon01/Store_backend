const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const usersRouter = require("./src/routes/users");

//Middlewares
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

//API ROUTES
app.use(usersRouter);
  
//Port config
const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);