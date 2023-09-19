const mongoose = require("mongoose");

// Define the Battle schema
const battleSchema = new mongoose.Schema({
  attacker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player", // Reference to the Player model
    required: true,
  },
  defender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player", // Reference to the Player model
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"], // Status can be 'pending' or 'completed'
    default: "pending", // Default status is 'pending'
  },
  battleReport: {
    type: String,
  },
});

// Create the Battle model
const Battle = mongoose.model("Battle", battleSchema);

module.exports = Battle;
