const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const missionController = require("../controllers/missionController");

router.post("/startMission", missionController.startMission);

router.post("/completeMission", missionController.completeMission);

module.exports = router;