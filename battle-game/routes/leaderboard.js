const express = require("express");
const router = express.Router();
const Player = require("../models/player");

// Retrieve the leaderboard
router.get("/", async (req, res) => {
  try {
    // Fetch all players and sort them by their score in descending order
    const leaderboard = await Player.find()
      .sort({ amountOfGold: -1 }) // Adjust the sorting criteria as needed
      .select("name amountOfGold"); // Include only required fields in the response

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
