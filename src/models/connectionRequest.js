const mongoose = require("mongoose");

const connectionRequestschema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{value} is incorrect status type",
      },
    },
  },
  { timestamps: true }
);
connectionRequestschema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestschema
);

module.exports = ConnectionRequestModel;
