const express = require("express");
const User = require("../models/User");
const validateUser = require("../middleware/validateUser")

const router = express.Router()

// add
router.post("/add-user", validateUser, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User Created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get
router.get("/get-users", async (req, res) => {
  const users = await User.find();
  res.status(200).json({ data: users });
});

// delete
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json({ message: "User Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// update
router.put("/update-user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json({ message: "User Updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router