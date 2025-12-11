const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    password: {
      type: String
      // required: true
    },
    role: {
      type: String,
      required: true
    },
    activityStatus: {
      type: Boolean,
      default: false
    },
    lastseen: {
      type: Date
    },
    loginStatus: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      required: true
    }
    // UserId: {
    //   type: String,
    //   required: true
    // }
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  console.log("pre-save middleware triggered");
  if (!this.isModified("password")) {
    console.log("no changes ditected");
    return next();
  }
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password.toString(), salt);
    next();
  } catch (error) {
    next(err);
  }
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
