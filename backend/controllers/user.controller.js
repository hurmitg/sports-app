const { generateToken, verifyToken } = require("../config/generateToken");
const UserModel = require("../models/user.model");

// get Users API (for testing)
const getUsers = async (req, res) => {
  let users = await UserModel.find().select("-password");
  return res.status(200).send(users);
};

// user signupAPI

const signupUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Please enter all the fields");
  }
  const userExists = await UserModel.findOne({ username });
  if (userExists) return res.status(401).send("Username already exists !");
  const user = await UserModel.create({ username, password });
  if (user) {
    return res.status(201).json({
      _id: user._id,
      username: user.username,
      password: user.email,
      token: generateToken(user._id),
    });
  }

  return res.status(400).send("Failed to create User.");
};

// user loginAPI

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Please enter all the fields");
  }

  const user = await UserModel.findOne({ username });

  if (user && user.password == password) {
    return res.status(201).json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  }
  return res.status(401).send("Invalid Credentials");
};

// verify token API

const verifyUser = async (req, res) => {
  const { token } = req.body;
  if (!verifyToken(token)) {
    return res.status(401).send("Invalid Token");
  }
  const { id } = verifyToken(token);
  const user = await UserModel.findOne({ _id: id }).select("-password");
  if (user) return res.status(200).send(user);
  return res.status(401).send("Authentication Failed");
};

module.exports = { signupUser, loginUser, getUsers, verifyUser };
