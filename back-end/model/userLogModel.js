const mongoose = require("mongoose");
const actionSchema = mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },
    details: {
      type: String
    }
  },
  { timestamps: true }
);
const userLogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    actions: [actionSchema]
  },
  { timestamps: true }
);
const userLogModel = mongoose.model("userlog", userLogSchema);
module.exports = userLogModel;
