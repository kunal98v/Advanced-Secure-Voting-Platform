const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Candidate = require("../models/Candidate");

const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User Created !" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const {username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id : user._id, username: username, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({ message: "Logged in Sucessfull", token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({ message: "Users Data", data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const castVote = async (req, res) => {
  try {
    const user = req.user;
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      res.status(404).json({ message: "Candidate not Found" });
    }

    if (candidate.isVoted) {
      return res.status(400).json({ message: "You have already Voted !" });
    }

    candidate.votes.push(user.id);
    candidate.voteCount = candidate.votes.length;
    candidate.isVoted = true;

    await candidate.save();

    return res.status(200).json({ message: "Vote Recorder Sucessfully!", data: user });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signup, signin, getUsers, castVote };
