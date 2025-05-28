const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middleware/admin");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    //checking corner cases 
      
    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "invalid status type " + status });
    }

    if (toUserId == fromUserId) {
      return res.status(400).send("cannot send connection to yourself");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [ //mongo db or condition 
        { fromUserId, toUserId },// this is the check if the from user id and to user id already exist in connection db (already connection request is sent )
        { fromUserId: toUserId, toUserId: fromUserId },//this is the check if the to user id has already sent connection request to from user id (so it will be a pending connection request for from user id)
      ],
    });
    if (existingConnectionRequest) {
      return res.status(400).send("connection request already sent");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();
    res.json({ message: "connection request sent", data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    //validation
    //status must be accepted rejected
    //check if loggedin user is toUserId
    //requestId should be valid
    // find the connection request in ConnectionRequest db check if status is interested
    try {
      const user = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "status not allowed " });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: user._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "connection request not found " });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      return res.json({ message: "connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
