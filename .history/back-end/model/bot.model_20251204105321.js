const mongoose = require("mongoose");

const botUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  runtime: { type: Number, default: 0 },
});

const positionSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  city: { type: String, required: true },
});

const dataSchema = new mongoose.Schema({
  operator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  Status: { type: String, default: "idle" },
  Battery: { type: Number, default: 100 },
  DistanceCovered: { type: Number, default: 0 },
  Robotuptime: { type: Number, default: 0 },
  Wastetraystatus: { type: String, default: "empty" },
  humidity: { type: Number, default: 80 },
  temperature: { type: Number, default: 25 },
  tide: { type: String, default: "n/a" },
  position: positionSchema,
});

const botSchema = new mongoose.Schema({
  name: { type: String, required: true },
  UniqueCode: { type: String, required: true, unique: true },
  data: [dataSchema], // only first item updated repeatedly
  operators: [botUserSchema],
});

const botModel = mongoose.model("Bot", botSchema);

module.exports = botModel;
