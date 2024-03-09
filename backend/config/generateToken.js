const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_Secret = process.env.JWT_SECRET;

/** Generates a JWT token for the given user ID. */
const generateToken = (id) => {
  return jwt.sign({ id }, jwt_Secret, {
    expiresIn: "10d",
  });
};

const verifyToken = (token) => {
  try {
    const verified = jwt.verify(token, jwt_Secret);
    return verified;
  } catch (error) {
    return false;
  }
};

module.exports = { generateToken, verifyToken, jwt_Secret };
