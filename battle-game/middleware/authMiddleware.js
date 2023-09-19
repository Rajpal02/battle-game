const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "d850b632fc26fbde715805d1677f4584fb8a74404b3175b4bc866dad5099d2b8";

function authMiddleware(req, res, next) {
  // Get the token from the request header
  const token = req.header("x-auth-token");

  // Check if the token is missing
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user (or relevant data) to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid token." });
  }
}

// Function to generate a JWT token
function generateToken(data) {
  return jwt.sign(data, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
}

module.exports = { authMiddleware, generateToken };
