const mongoose = require("mongoose");
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
    lg: {
      type: [Number],
      required: true
    }
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
  }
});
const botModel = mongoose.model("bot", botSchema);
module.exports = botModel;
