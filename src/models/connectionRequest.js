const mongoose = require("mongoose");

const connectionRequestschema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      ref: "User",
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{value} is incorrect status type",
      },
    },
  },
  { timestamps: true }
);
connectionRequestschema.index({ fromUserId: 1, toUserId: 1 }); //compound indexing for making expensive operations optimized

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestschema
);

module.exports = ConnectionRequestModel;
