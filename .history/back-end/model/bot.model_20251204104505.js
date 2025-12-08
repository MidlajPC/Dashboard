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
const positionSchema = mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});
const dataschema = mongoose.Schema({
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  date: {
    type: Date,
    default: Date.now
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
  humidity: {
    type: String
  },
  temperature: {
    type: Number
  },
  tide: {
    type: String
  },
  Robotuptime: {
    type: Number
  },
  position: positionSchema
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
