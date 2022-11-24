const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MissionSchema = new Schema({
    title: {type: String, required: true},
    missionType: {type: String, required: true},
    difficulty: {type: String, required: true},
    timeToComplete: {type: Number, required: true},
}, { timestamps: true });

module.exports = mongoose.model("Mission", MissionSchema);