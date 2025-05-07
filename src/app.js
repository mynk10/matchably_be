const express = require("express");
const { adminAuth } = require("./middleware/admin");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express(); //making an instance of an express server
app.use(express.json());

//request handler
app.post("/signup", async (req, res) => {
  //creating new instance of User model
  const user = new User(req.body);
  await user.save();
  res.send("User added successfully");
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
