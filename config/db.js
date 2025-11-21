
const mongoose = require('mongoose');
require('dotenv').config();

// Function that connects our app to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); 
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // stop the app if connection fails
  }
};

module.exports = connectDB;
