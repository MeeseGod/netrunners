const Users = require("../models/user");
const passport = require("passport");

// get all users
const getUsers = async (req, res) => {
    const users = await Users.find({}).sort({createdAt: -1});
    
    res.status(200).json(users);
}

const getCurrentUser = async (req, res) => {
    const user = req.user;
    if(req.user){
        res.send(user);
    }
}

const postLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
});

module.exports = {
    getUsers,
    getCurrentUser,
    postLogin,
}