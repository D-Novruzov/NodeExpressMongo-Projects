const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
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
    select: false
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
  active: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});


//document pre save middleware to encrypt the password and delete the passwordConfirm from the database, for the password not to be persisted
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);


  this.passwordConfirm = undefined; 

  next();
});
module.exports = mongoose.model("User", userSchema);
