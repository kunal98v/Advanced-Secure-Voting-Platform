
const Candidate = require("../models/Candidate");
const { sendMail } = require("../Services/EmailSendService");
const User = require("../models/User");
const { generatePDF } = require("../Services/PdfService");

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

    const path  = await generatePDF(req, res);
    await sendMail(userExist.username, path); 

    return res
      .status(200)
      .json({ message: "Vote Recorder Sucessfully!", data: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {castVote};