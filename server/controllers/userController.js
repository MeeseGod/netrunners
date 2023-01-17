const Users = require("../models/user");
const Character = require("../models/character");
const Item = require("../models/item");
const Mission = require("../models/mission");
const passport = require("passport");

// Get logged in user's character
const getCharacter = async (req, res) => {
    if(req.user){
        const character = await Character.findById(req.user.character)
        .populate("missions")
        .populate("inventory");
        // console.log(character);
        // console.log(character.missions[0].toString());
        res.send(character);
    };
};

// Get logged in User
const getCurrentUser = async (req, res) => {
    const user = req.user;
    if(req.user){
        // const currentUser = await Users.find({username: req.user.username})
        // .populate("character")
        res.send(user);
    };
};

// Get all users in our DB
const getUsers = async (req, res) => {
    const users = await Users.find({}).sort({createdAt: -1});
    res.status(200).json(users);
};

// Confirm or reject login
const postLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
});

const userLogout = (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err);
        };
    res.redirect("/");
    });
};

module.exports = {
    getCharacter,
    getCurrentUser,
    getUsers,
    postLogin,
    userLogout,
};