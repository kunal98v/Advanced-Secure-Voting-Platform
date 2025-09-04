const express = require("express");
const User = require("../models/User");
const validate = require("../middleware/validate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "THIS_IS_SECRET_KEY";

const router = express.Router();

router.post("/signup", validate, async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User Created !" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/signin", validate, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ username: username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "Logged in Sucessfull", token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
