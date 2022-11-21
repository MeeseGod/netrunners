#! /usr/bin/env node

console.log('This script populates some test items to our database.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require('./models/user');
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let users = []

function userCreate(username, password, isAdmin, cb) {
    bcrypt.hash(password, 10, (err, hashedpassword) => {
    var user = new User({ 
        username: username,
        password: hashedpassword,
        isAdmin: isAdmin,
    });
       
    user.save(function (err) {
        if (err) {
        cb(err, null);
        return;
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user);
    });
  
    });
}


function createUsers(cb) {
  async.series([
    function(callback) {
        userCreate("admin", "89bang", true , callback)
    },
    function(callback) {
        userCreate("normaluser", "82bang", true , callback)
    },
  ],
  cb)
}

async.series([
    createUsers,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log("Success");
    };
    // All done, disconnect from database
    mongoose.connection.close();
});