const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getUsers", userController.getUsers);

// Get user's character
router.get("/getCharacter", userController.getCharacter);

// Gets current logged in user information
router.get("/currentUser", userController.getCurrentUser);

// Send login request
router.post("/login", userController.postLogin);

// Logout
router.get("/logout", userController.userLogout);

module.exports = router;