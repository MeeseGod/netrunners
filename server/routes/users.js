const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

// Get user's character
router.get("/getCharacter", userController.getCharacter);

// Get user login page
router.get("/currentUser", userController.getCurrentUser);

// Send login request
router.post("/login", userController.postLogin);

// Logout
router.get("/logout", userController.userLogout);

module.exports = router;