const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const userAuth = require("../middleware/admin");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const ConnectionRequests = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName description age gender photoURL"
    ); //.populate("fromUserId", ["firstName","lastName"]) ---we can either write it in string or in array
    res.json({
      message: "data fetched successfully ",
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
      .populate(
        "fromUserId",
        "firstName lastName description age gender photoURL"
      )
      .populate(
        "toUserId",
        "firstName lastName description age gender photoURL"
      );

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() == user._id.toString()) {
        return row.toUserId;
      } else return row.fromUserId;
    });
    res.json({ message: "connection fetched successfully", data: data });
  } catch (err) {
    res.send("ERROR : " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const user = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideUsersFromFeed) },
        },
        { _id: { $ne: user._id } },
      ],
    })
      .skip(skip)
      .limit(limit);

    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
