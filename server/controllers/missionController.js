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

const completeMission = [
    async (req, res, next) => {
       if(req.user){
            const itemRarity = await determineItemRarity();
            const itemType = await determineItemType();
            const currencyInc = await determineCurrency(req.body.missionDifficulty);

            const rewardItem = Item.findOne(
                {
                    rarity: itemRarity,
                    slot: itemType,
                }
            );
            
            await Users.updateOne(
                {_id: req.user._id},
                {
                    $push: {inventory: rewardItem},
                    $inc:{currency: currencyInc}
                
                }
            );
            


       }
    }
]

// Non Exports
async function determineItemRarity(){
    const itemRarity = Math.floor(Math.random() * 100) + 1;
        if(itemRarity < 51){
            return "common"
        }
        else if(itemRarity){
            return "uncommon"
        }
        else if(itemRarity){
            return "rare"
        }
        else{
            return "legendary"
        };
};

async function determineItemType(){
    const itemType = Math.floor(Math.random() * 100) + 1;
        if(itemType < 25){
            const itemSlot = Math.floor(Math.random() * 100) + 1;
            if(itemSlot > 50){
                return "Headwear";
            }
            else{
                return "Body";
            };
        }
        else if(itemType > 15 && itemType < 36){
            return "Weapon";
        }
        else{
            return "Bionic";
        };
};

async function determineCurrency(difficulty){
    if(difficulty === "Easy"){
        return 100;
    }
    else if(difficulty === "Medium"){
        return 200;
    }
    else if(difficulty === "Hard"){
        return 300;
    }
    else{
        return 500;
    };
};


module.exports = {
    startMission
};