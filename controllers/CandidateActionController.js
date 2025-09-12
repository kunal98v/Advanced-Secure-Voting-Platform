const Candidate = require("../models/Candidate");

// add candidate
const addCandidate = async (req, res) => {
  try {
    const {name} = req.body;
    const exists = await Candidate.findOne({name:name});
    console.log(exists)
    if (exists) {
      return res.status(400).json({message : "Canidate with same name already exists !"})
    }

    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json({ message: "Candidate Created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get candidates
const getCandidates = async (req, res) => {
  const data = await Candidate.find().sort({voteCount : -1}).select("name party voteCount");
  res.status(200).json({ data: data });
};

// delete candidate
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      res.status(404).json({ message: "Candidate not Found" });
    }
    res.status(200).json({ message: "Candidate Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update candidate
const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!candidate) {
      res.status(404).json({ message: "Candidate not Found" });
    }
    res.status(200).json({ message: "Candidate Updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidates,
};
