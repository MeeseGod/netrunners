const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName : {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
}, { timestamps: true });

UserSchema
    .virtual('url')
    .get(function(){
        return `/user/${this._id}`;
});

UserSchema
  .virtual('username')
  .get(function(){
    return this.userName
});

module.exports = mongoose.model("User", UserSchema);