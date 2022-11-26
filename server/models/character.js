const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    level: {type: Number, required: true},
    neededExperience: {type: Number, required: true},
    currentExperience: {type: Number, required: true},
    currency: {type: Number, required: true},
    stats: {type: Schema.Types.Mixed, required: true},
    inventory: [
         { type: Schema.Types.ObjectId, ref: "Item" }
    ],
    equipped: [
        { type: Schema.Types.ObjectId, ref: "Item" }
    ],
    // missions: [
    //     { type: Schema.Types.ObjectId, ref: "Mission" }
    // ],
    
}, { timestamps: true });

module.exports = mongoose.model("Character", CharacterSchema);