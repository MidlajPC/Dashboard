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
  Robotuptime: {
    type: Number
  },
  position: positionSchema
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
  currentuser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  data: [dataschema],
  operators: [botuserSchema]
});
const botModel = mongoose.model("bot", botSchema);
module.exports = botModel;
