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

const botSchema = new mongoose.Schema({
  UniqueCode: String,
  name: String,
  data: [
    {
      Battery: Number,
      DistanceCovered: Number,
      Robotuptime: Number,
      Status: String,
      Wastetraystatus: String,
      date: Date,
      tide: String,
      humidity: Number,
      temp: Number,
      operator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      position: {
        city: String,
        lat: String,
        lng: String,
      },
    },
  ],
  operators: [
    {
      date: Date,
      runtime: Number,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
});
const botModel = mongoose.model("bot", botSchema);
module.exports = botModel;
