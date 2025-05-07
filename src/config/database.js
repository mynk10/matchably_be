const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mynk1008:mynk1008@cluster1.zmrtnli.mongodb.net/"
  );
};

module.exports = { connectDB };


