const Users = require("../models/user");
const Character = require("../models/character");
const Item = require("../models/item");
const Mission = require("../models/mission");
const { body, validationResult } = require("express-validator");

const startMission = [
    body("missionID", "Must be a valid ID")
    .trim()
    .isLength({ min: 1})
    .escape(),

    async (req, res, next) => {
        if(req.user){
            await Mission.findByIdAndUpdate(req.body.missionID, 
                {
                    isStarted: true,
                    endTime: (Date.now() + 6000),
                }
            );
            res.status(200)
        }
    }
]


module.exports = {
    startMission
};