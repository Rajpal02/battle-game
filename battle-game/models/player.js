const mongoose = require("mongoose");

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
    max: 1000000000,
    default: 0,
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

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
