const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT;
const userRouter = require("./routes/users");

// Calls on the userRouter routes.
app.use("/api/users", userRouter);

// connect to db
mongoose.connect(process.env.MONGO)
    .then(() => {
        // listen for requests after connecting
        app.listen(port, ()=>{console.log(`Listening on port: ${port}`)});
    })
    .catch((error => {
        console.log(error);
    }));

