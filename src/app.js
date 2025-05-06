const express = require("express");

const app = express(); //making an instance of an express server

//request handler

app.get(
  "/user",
  (req, res, next) => {
    console.log("handling the route handler");
    next();
    // res.send("route handler 1");
  },
  (req, res) => {
    console.log("handling the route handler 2");
    res.send("route handler 2")
  }
);

//listening to port
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
