const mongoose = require("mongoose");

// Define your MongoDB URI
const mongoURI = "mongodb://localhost/battle-game";

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
