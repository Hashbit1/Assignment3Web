
const mongoose = require('mongoose');

//  to store OAuth users (Google or GitHub)
const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,        
      required: true,
    },
    providerId: {
      type: String,         
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: String,         
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
