const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { battleQueue } = require("./battleProcessor"); // Import the battleQueue
const playersRouter = require("./routes/players"); // Import players router
const battlesRouter = require("./routes/battles"); // Import battles router
const leaderboardRouter = require("./routes/leaderboard"); // Import leaderboard router
const { authMiddleware } = require("./middleware/authMiddleware"); // Import the authMiddleware
const errorHandler = require("./middleware/errorHandler"); // Import the errorHandler middleware

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:4200", // Replace with your Angular app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Set to true if your Angular app sends credentials (e.g., cookies)
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// MongoDB Configuration
const mongoURI = "mongodb://localhost:27017/battle-game";
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
app.use("/api/players", authMiddleware, playersRouter); // Protect players routes with authMiddleware
app.use("/api/battles", authMiddleware, battlesRouter); // Protect battles routes with authMiddleware
app.use("/api/leaderboard", authMiddleware, leaderboardRouter); // Protect leaderboard route with authMiddleware

// Error handling middleware
app.use(errorHandler);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
