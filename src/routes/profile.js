const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/admin");
const { validateEditProfileData } = require("../utils/validation");

//get profile api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//update profile
profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error(" not a valid update ");
    }
    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.json({ meaasge: "updated successfully", data: user });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
