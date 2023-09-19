const express = require("express");
const router = express.Router();
const Player = require("../models/player");

// Retrieve the leaderboard
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Player.find()
      .sort({ amountOfGold: -1 })
      .select("name amountOfGold");

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
