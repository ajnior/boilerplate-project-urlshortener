require("dotenv").config();
const mongoose = require("mongoose");

const connectMongoDB = async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongoDB...");
};

const connectDB = async () => {
  try {
    await connectMongoDB();
  } catch (e) {
    console.log("Problem connecting with mongoDB", e);
  }
};

module.exports = connectDB;
