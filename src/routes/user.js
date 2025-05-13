const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const userAuth = require("../middleware/admin");

const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    user = req.user;
    const ConnectionRequests = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");
    res.json({
      messgae: "data fetched successfully ",
      data: ConnectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
