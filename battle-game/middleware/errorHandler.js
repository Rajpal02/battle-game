// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Handle specific error types, if needed
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Handle other errors with a generic 500 Internal Server Error response
  res.status(500).json({ message: "Internal Server Error" });
}

module.exports = errorHandler;
