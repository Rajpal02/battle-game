const express = require("express");
const router = express.Router();
const Player = require("../models/player");

// Route to create a new player
router.post("/", async (req, res) => {
  try {
    const { identifier, name, amountOfGold, attack, hitPoints, luck } =
      req.body;

    // Validate player data (you can add more validation as needed)
    if (
      !identifier ||
      !name ||
      !amountOfGold ||
      !attack ||
      !hitPoints ||
      !luck
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a player with the same name already exists
    const existingPlayer = await Player.findOne({ name });

    if (existingPlayer) {
      return res
        .status(400)
        .json({ message: "Player with this name already exists" });
    }

    // Create a new player
    const player = new Player({
      identifier,
      name,
      amountOfGold,
      attack,
      hitPoints,
      luck,
    });

    // Save the player to the database
    await player.save();

    res.status(201).json({ message: "Player created successfully", player });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to retrieve all players
router.get("/", async (req, res) => {
  try {
    // Retrieve all players from the database
    const players = await Player.find();

    res.status(200).json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
