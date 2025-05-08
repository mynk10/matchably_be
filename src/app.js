const express = require("express");
const { adminAuth } = require("./middleware/admin");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express(); //making an instance of an express server
app.use(express.json());

//request handler
app.post("/signup", async (req, res) => {
  //creating new instance of User model`
  const user = new User(req.body);
  await user.save();
  res.send("User added successfully");
});

//get user by emial id
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
    res.status(400).send("update fail: " + err.message);
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
