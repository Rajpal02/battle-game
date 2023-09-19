const mongoose = require("mongoose");

// Define your MongoDB URI
const mongoURI = "mongodb://localhost:27017/battle-game"; // Replace with your MongoDB URI

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Export the Mongoose connection
module.exports = mongoose.connection;
