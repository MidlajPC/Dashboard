const mongoose = require("mongoose");
const botuserSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  date: {
    type: Date
  },
  runtime: {
    type: Number
  }
});
const botSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  UniqueCode: {
    type: Number,
    required: true,
    unique: true
  },
  Position: {
    lat: {
      type: [Number],
      required: true
    },
    lng: {
      type: [Number],
      required: true
    },
    city: { type: String, required: true }
  },
  Status: {
    type: String
  },
  Battery: {
    type: Number
  },
  DistanceCovered: {
    type: Number
  },
  Wastetraystatus: {
    type: String
  },
  Robotuptime: {
    type: Number
  },
  operators: [botuserSchema],
  currentOperator: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});
const botModel = mongoose.model("bot", botSchema);
module.exports = botModel;
