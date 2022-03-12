const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  // serialNo: {
  //   type: Number,
  //   // required: true,
  // },
  Date: {
    type: Date,
    required: true,
  },
  modeOfTravel: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  bookedby: { type: mongoose.Schema.ObjectId, ref: "user" },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "rejected", "confirmed"],
  },
});

const Request = mongoose.model("request", RequestSchema);
module.exports = Request;
