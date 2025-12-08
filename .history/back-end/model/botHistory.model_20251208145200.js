const mongoose = require("mongoose");
const { Schema } = mongoose;

const positionSchema = new Schema({
city: { type: String },
lat: { type: String },
lng: { type: String },
}, { _id: false });

const dataSchema = new Schema({
Battery: { type: Number },
DistanceCovered: { type: Number },
Robotuptime: { type: Number },
Status: { type: String },
Wastetraystatus: { type: String },
date: { type: Date },
tide: { type: String },
humidity: { type: Number },
temp: { type: Number },
operator: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // change to your operator model
position: positionSchema,
}, { _id: false });

const operatorsSchema = new Schema({
date: { type: Date },
runtime: { type: Number },
user: { type: Schema.Types.ObjectId, ref: "User" }, // change to your user model
}, { _id: false });

const botHistorySchema = new Schema({
UniqueCode: { type: String },
data: [dataSchema],
name: { type: String },
operators: [operatorsSchema],
}, { collection: "Bot_History" }); // explicit collection name

module.exports = mongoose.model("Bot_History", botHistorySchema);
