const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    bus: {
      type: mongoose.Schema.ObjectId,
      ref: "Bus",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    seats: {
      type: Array,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    } 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
