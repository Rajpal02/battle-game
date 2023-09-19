const mongoose = require("mongoose");

// Define the Player schema
const playerSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 20,
    unique: true,
  },
  amountOfGold: {
    type: Number,
    max: 1000000000, // Max value of 1 billion
    default: 0, // Default value is 0
  },
  attack: {
    type: Number,
    required: true,
  },
  hitPoints: {
    type: Number,
    required: true,
  },
  luckValue: {
    type: Number,
  },
});

// Create the Player model
const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
