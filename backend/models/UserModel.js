const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  mailId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rollNo: {
    type: String,
    // required: true,
  },
  branch: {
    type: String,
    // required: true,
  },
  phoneNo: {
    type: Number,
    // required: true,
  },
  roomNo: {
    type: String,
    // required: true,
  },
  hostel: {
    type: String,
    // required: true,
  },
  requestsPerMonth: {
    type: Number,
    default: 0,
  },
  requests: [{ type: mongoose.Schema.ObjectId, ref: "request" }],
});

module.exports = mongoose.model("user", UserSchema);
