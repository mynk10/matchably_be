const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: {
      type: String,
      required: true,
      unique: true,
      //match : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      validate(value) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(value)) throw new Error("email is not valid");
        // using validator library
        // if(!validator.isEmail(value)){thorw new Error("email is not valid")}
      },
    },
    password: { type: String, required: true },
    age: { type: Number, max: 100, min: 10 },
    gender: {
      type: String,
      //enum : [ "male","female","other"],
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("not a valid gender");
        }
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
