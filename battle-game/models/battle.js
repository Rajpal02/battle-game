const mongoose = require("mongoose");

const battleSchema = new mongoose.Schema({
  attacker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  defender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  battleReport: {
    type: String,
  },
});

const Battle = mongoose.model("Battle", battleSchema);

module.exports = Battle;
