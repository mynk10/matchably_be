const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");

const authRouter = express.Router();

//user signup  request handler
authRouter.post("/signup", async (req, res) => {
  try {
    // validating the credintials of user
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // encrypting the password
    const hashPassword = await bcrypt.hash(password, 10);
    //creating new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    const token = await user.getJWT();
    res.cookie("token", token);
    res.json({ message: "User added successfully", data: user });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// user login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create a jwt token
      const token = await user.getJWT();
      //store jwt in a cookie
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//user logout
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("user logged out ");
});

module.exports = authRouter;
