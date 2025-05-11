const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middleware/admin");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("sending a connection request");
    res.send(user.firstName + "sent a connection request");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = requestRouter;
