const express = require("express");
const { adminAuth, userAuth } = require("./middleware/admin");
const { validateSignupData } = require("./utils/validation");
const { connectDB } = require("./config/database");
var cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const app = express(); //making an instance of an express server
app.use(express.json());
app.use(cookieParser());

//user signup  request handler
app.post("/signup", async (req, res) => {
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
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// user login
app.post("/login", async (req, res) => {
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
      res.send("login successfull!!");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//profile api
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("sending a connection request");
    res.send(user.firstName + "sent a connection request");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("connection established successfully");
    //listening to port
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("database cannot be connected");
  });
