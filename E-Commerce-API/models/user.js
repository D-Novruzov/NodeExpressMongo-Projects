const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    lowecase: true,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "please enter a valid password"],
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});
module.exports = mongoose.model("User", userSchema);
