const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 1234;

app.get("/", (req, res) => {
    res.send("testing")
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, ()=>{console.log(`Listening on port: ${port}`)});