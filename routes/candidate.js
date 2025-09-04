const express = require("express");
const authenticate = require("../middleware/auth");
const { addCandidate, getCandidates, deleteCandidate, updateCandidate } = require("../controllers/CandidateActionController");

const router = express.Router()

// add
router.post("/add", authenticate, addCandidate);

// get
router.get("/get", authenticate, getCandidates);

// delete
router.delete("/delete/:id",authenticate, deleteCandidate);

// update
router.put("/update/:id",authenticate, updateCandidate);

module.exports = router