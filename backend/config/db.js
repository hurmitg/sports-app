const mongoose = require("mongoose");
require("dotenv").config();
require("colors");
let mongo_uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`---------- MongoDB Connected ----------`.white.bgGreen.italic);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

module.exports = connectDB;
