const mongoose = require('mongoose');
const db = 'mongodb://localhost/grunttracker'

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
