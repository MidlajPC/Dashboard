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
      default: true,
      required: true
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
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
