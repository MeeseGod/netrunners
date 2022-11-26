const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required: true},
    rarity: {type: String, required: true},
    slot: {type: String, required: true},
    bonuses: {type: Schema.Types.Mixed, required: true},
    value: {type: Number, required: true},
    isEquipped: {type: Boolean, required: true},
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);