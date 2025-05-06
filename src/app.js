const express = require("express");

const app = express(); //making an instance of an express server

//request handler

app.get("/user", (req, res) => {
  res.send({ firstname: "mayank", lastname: "sharma" });
});

app.post("/user", (req, res) => {
  res.send("the details of user is saved");
});

app.delete("/user", (req, res) => {
  res.send("the details of user is deleted");
});

app.use("/", (req, res) => {
  res.send("hello this is dashboard");
});

//listening to port
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
