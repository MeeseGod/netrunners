#! /usr/bin/env node

console.log('This script populates some test items to our database.');

const async = require('async');
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require('./models/user');
const Character = require('./models/character');
const Item = require("./models/item");
const Mission = require("./models/mission");
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// Console log if we have an error connecting to our MongoDB
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let users = [];
let characters = [];
let items = [];
let missions = [];

function userCreate(username, password, isAdmin, character, cb) {
    bcrypt.hash(password, 10, (err, hashedpassword) => {
    var user = new User({ 
        username: username,
        password: hashedpassword,
        isAdmin: isAdmin,
        character: character,
    });
       
    user.save(function (err) {
        if (err) {
        cb(err, null);
        return;
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user);
    });
  
    });
};

function characterCreate(level, neededExperience, currentExperience, currency, stats, inventory, equipped, missions, cb) {
    const character = new Character ({
        level: level,
        neededExperience: neededExperience,
        currentExperience: currentExperience,
        currency: currency,
        stats: stats,
        inventory: inventory,
        equipped: equipped,
        missions: missions,
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

function missionCreate(title, missionType, difficulty, isStarted, timeToComplete, isComplete, cb){
    const mission = new Mission({
        title: title,
        missionType: missionType,
        difficulty: difficulty,
        isStarted: isStarted,
        timeToComplete: timeToComplete,
        isComplete: isComplete,
    });

    mission.save(function(err){
        if(err){
            cb(err, null);
            return;
        };
        console.log("New Mission: " + mission);
        missions.push(mission)
        cb(null, mission)
    });
};

function createUsers(cb) {
  async.series([
    function(callback) {
        userCreate("admin", "89bang", true, characters[0], callback)
    },
  ],
  cb)
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
              [
                  missions[0],
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
  
  function createMissions(cb){
      async.series([
          function(callback){
              missionCreate(
                  "Hack the World",
                  "Hacking",
                  "Easy",
                  false,
                  600,
                  false,
                  callback
              )
          }
      ],
      cb)
  };

// Goes through creation functions
async.series([
    createItems,
    createMissions,
    createCharacters,
    createUsers,
],

// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log("Success");
    };
    // All done, disconnect from database
    mongoose.connection.close();
});