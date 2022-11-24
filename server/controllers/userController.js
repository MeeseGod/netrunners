const Users = require("../models/user");
const passport = require("passport");

// Get logged in User
const getCurrentUser = async (req, res) => {
    const user = req.user;
    if(req.user){
        res.send(user);
    }
}

// Get all users in our DB
const getUsers = async (req, res) => {
    const users = await Users.find({}).sort({createdAt: -1});
    res.status(200).json(users);
}

// Confirm or reject login
const postLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
});

const userLogout = (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err)
        }
    res.redirect("/");
    })
}

module.exports = {
    getUsers,
    getCurrentUser,
    postLogin,
    userLogout,
}