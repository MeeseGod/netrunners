const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

router.get("/currentUser", userController.getCurrentUser);

router.post("/login", userController.postLogin);

module.exports = router;