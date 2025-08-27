const express = require("express");
const Candidate = require("../models/Candidate");
const validateCandidate = require("../middleware/validate")
const authenticate = require("../middleware/auth")

const router = express.Router()

// add
router.post("/add", authenticate, async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json({ message: "Candidate Created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get
router.get("/get", authenticate, async (req, res) => {
  const data = await Candidate.find();
  res.status(200).json({ data: data });
});

// delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      res.status(404).json({ message: "Candidate not Found" });
    }
    res.status(200).json({ message: "Candidate Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// update
router.put("/update/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body);
    if (!candidate) {
      res.status(404).json({ message: "Candidate not Found" });
    }
    res.status(200).json({ message: "Candidate Updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router