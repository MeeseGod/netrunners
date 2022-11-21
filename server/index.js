const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const port = process.env.PORT;
const userRouter = require("./routes/users");

// app.get("/", (req, res) => {
//     res.send("testing")
// })

app.use("/api/users", userRouter);

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

// connect to db
mongoose.connect(process.env.MONGO)
    .then(() => {
        // listen for requests after connecting
        app.listen(port, ()=>{console.log(`Listening on port: ${port}`)});
    })
    .catch((error => {
        console.log(error);
    }));

