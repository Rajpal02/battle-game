const express = require("express");
const router = express.Router();
const Battle = require("../models/battle");
const Player = require("../models/player");
const { battleQueue } = require("../battleProcessor");

// Submit a battle request
router.post("/", async (req, res) => {
  try {
    const { attackerId, defenderId } = req.body;

    // Check if the attacker and defender exist
    const attacker = await Player.findById(attackerId);
    const defender = await Player.findById(defenderId);

    if (!attacker || !defender) {
      return res
        .status(404)
        .json({ message: "Attacker or defender not found" });
    }

    // Create a new battle and save it to the database
    const battle = new Battle({
      attacker: attackerId,
      defender: defenderId,
    });

    await battle.save();

    // Add the battle to the battle queue for processing
    await battleQueue.add({ battleId: battle._id });

    res.status(201).json({ message: "Battle request submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
