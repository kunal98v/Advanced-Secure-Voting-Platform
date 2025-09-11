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
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id, username: username, role: user.role },
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

const resetPassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body || {};
    const { id } = req.user;
    if (!current_password || !new_password) {
      return res
        .status(400)
        .json({ message: "Both current and new password are required!" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect!" });
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password Reset Sucessfull" });
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
    const userExist = await User.findById(user.id);
    console.log(userExist);
    if (userExist.isVoted) {
      return res.status(400).json({ message: "You have already Voted !" });
    }

    candidate.votes.push(user.id);
    candidate.voteCount = candidate.votes.length;
    await candidate.save();

    userExist.isVoted = true;
    await userExist.save();

    return res
      .status(200)
      .json({ message: "Vote Recorder Sucessfully!", data: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signup, signin, getUsers, castVote, resetPassword };
