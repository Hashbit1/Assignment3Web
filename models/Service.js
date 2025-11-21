// models/Service.js
const mongoose = require('mongoose');
// Mongoose schema for a vehicle service record
const serviceSchema = new mongoose.Schema(
  {
    vehicleName: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: String,
      required: true,
      trim: true, // e.g., Oil Change, Tires, Brakes
    },
    serviceDate: {
      type: Date,
      required: true,
    },
    cost: {
      type: Number,
      default: 0,
    },
    mileage: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

module.exports = mongoose.model('Service', serviceSchema);
