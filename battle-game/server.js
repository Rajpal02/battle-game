const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { battleQueue } = require("./battleProcessor");
const playersRouter = require("./routes/players");
const battlesRouter = require("./routes/battles");
const leaderboardRouter = require("./routes/leaderboard");
const { authMiddleware } = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// MongoDB Configuration
const mongoURI = "mongodb://localhost/battle-game";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Routes
app.use("/api/players", authMiddleware, playersRouter);
app.use("/api/battles", authMiddleware, battlesRouter);
app.use("/api/leaderboard", authMiddleware, leaderboardRouter);

// Error handling middleware
app.use(errorHandler);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
