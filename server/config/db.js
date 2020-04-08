//import modules
const mongoose = require("mongoose");
const config = require("config");
const db = "mongodb://localhost/grunttracker";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
