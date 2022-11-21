const Users = require("../models/user");

// get all users
const getUsers = async (req, res) => {
    const users = await Users.find({}).sort({createdAt: -1});
    
    res.status(200).json(users);
}

module.exports = {
    getUsers,
}