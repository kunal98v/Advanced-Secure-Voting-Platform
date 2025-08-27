const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

const candidateRoutes = require("./routes/candidate");
const logger = require("./middleware/logger");
const User = require("./models/User");
const validate = require("./middleware/validate");

const SECRET_KEY = "THIS_IS_SECRET_KEY";

app.use(express.json());

mongoose
  .connect("mongodb+srv://kunal98v:Kunal1234$@mr47.9zgc8xn.mongodb.net/")
  .then(() => console.log("MongoDB Connected !"))
  .catch((err) => console.log("Error", err));

app.listen(PORT, () => {
  console.log(`Server Running or port : ${PORT}`);
});

app.use(logger);

app.use("/candidate", candidateRoutes);

app.post("/signup", validate, async (req, res) => {
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

app.post("/signin", validate, async (req, res) => {
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
