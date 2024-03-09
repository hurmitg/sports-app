const express = require("express");
const {
  signupUser,
  loginUser,
  getUsers,
  verifyUser,
} = require("../controllers/user.controller");

const user = express.Router();

user.get("/", getUsers);

user.post("/signup", signupUser);

user.post("/login", loginUser);

user.post("/verify", verifyUser);

module.exports = user;
