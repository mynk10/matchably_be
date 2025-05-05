const express = require("express");

const app = express(); //making an instance of an express server

//request handler 
app.use("/hello", (req, res) => {
  res.send("hello from the server");
});

app.use("/test", (req, res) => {
  res.send("hello this is test");
});

app.use("/", (req, res) => {
  res.send("hello this is dashboard");
});

//listening to port 
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
