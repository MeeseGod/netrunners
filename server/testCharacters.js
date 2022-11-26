#! /usr/bin/env node

console.log('This script populates some test items to our database.');

const async = require('async');
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const Character = require('./models/character');
const Item = require("./models/item");
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// Console log if we have an error connecting to our MongoDB
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let characters = [];
let items = [];

function characterCreate(level, neededExperience, currentExperience, currency, stats, inventory, equipped, cb) {
    const character = new Character ({
        level: level,
        neededExperience: neededExperience,
        currentExperience: currentExperience,
        currency: currency,
        stats: stats,
        inventory: inventory,
        equipped: equipped,
    });
       
    character.save(function (err) {
        if (err) {
        cb(err, null);
        return;
        }
        console.log('New Character: ' + character);
        characters.push(character)
        cb(null, character)
    });
};

function itemCreate(name, rarity, slot, bonuses, value, isEquipped, cb){
    const item = new Item({
        name: name,
        rarity: rarity,
        slot: slot,
        bonuses: bonuses,
        value: value,
        isEquipped: isEquipped,
    });

    item.save(function(err){
        if(err){
            cb(err, null);
            return;
        };
        console.log("New Item: " + item);
        items.push(item)
        cb(null, item)
    });
};

function createCharacters(cb) {
  async.series([
    function(callback) {
        characterCreate(1, 100, 0, 0, 
            {
                "strength": 1,
                "intelligence": 1
            },
            [
                items[0],
            ],
            [
                // Equipped
            ],
            callback)
    },
  ],
  cb)
};

function createItems(cb){
    async.series([
        function(callback){
            itemCreate(
                "Dagger",
                "Common",
                "Weapon",
                {
                    "strength" : 1,
                    "dex" : 1
                },
                10,
                false,
                callback
            );
        },
    ],
    cb)
};

// Goes through creation functions
async.series([
    createItems,
    createCharacters,
],

// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log("Successfully populated DB");
    };
    // All done, disconnect from database
    mongoose.connection.close();
});