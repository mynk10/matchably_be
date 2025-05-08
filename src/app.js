const express = require("express");
const { adminAuth } = require("./middleware/admin");
const { validateSignupData } = require("./utils/validation");
const { connectDB } = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const app = express(); //making an instance of an express server
app.use(express.json());

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
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      res.send("login successfull!!");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//find user by emailID
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//get all users
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//update the user
app.patch("/update/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;
  try {
    const ALLOWED_UPDATES = ["userId", "lastName", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }

    await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("update fail:  " + err.message);
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
