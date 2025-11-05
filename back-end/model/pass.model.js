const mongoose = require("mongoose");
const passSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  pass: {
    type: String,
    required: true
  }
});
const passmodel = mongoose.model("pass", passSchema);
module.exports = passmodel;
