const { verifyToken } = require("../config/generateToken");
const UserModel = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = verifyToken(token);
      if (decoded) {
        req.user = await UserModel.findById(decoded.id).select("-password");
        return next();
      } else {
        return res.status(401).send("Not authorized, Invalid Credentials");
      }
    } catch (e) {
      return res.status(401).send("Not authorized, Invalid Credentials");
    }
  } else return res.status(401).send("Not authorized, Please Login First");
};

module.exports = { protect };
