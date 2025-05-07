const express = require("express");
const { adminAuth } = require("./middleware/admin");
const { connectDB } = require("./config/database");

const app = express(); //making an instance of an express server

//request handler
app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res) => {
  res.send("fetched data");
});

app.get("/admin/deleteData", (req, res) => {
  res.send("deleted data");
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
