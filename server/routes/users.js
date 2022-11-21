var express = require('express');
var router = express.Router();

const {
    getUsers,
} = require("../controllers/userController");

router.get("/", getUsers);


module.exports = router;