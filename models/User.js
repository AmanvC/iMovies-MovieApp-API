const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // status: {
    //   type: String,
    //   enum: ["Active", "Pending"],
    //   default: "Pending",
    // },
    // confirmationCode: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;