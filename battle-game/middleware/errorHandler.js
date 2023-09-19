function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(500).json({ message: "Internal Server Error" });
}

module.exports = errorHandler;
