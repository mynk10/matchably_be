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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: user._id, status: "accepted" },
        { fromUserId: user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() == user._id.toString()) {
        return row.toUserId;
      } else return row.fromUserId;
    });
    res.json({ data });
  } catch (err) {
    res.send("ERROR : " + err.message);
  }
});

module.exports = userRouter;
