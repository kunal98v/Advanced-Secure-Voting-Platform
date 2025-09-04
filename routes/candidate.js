const express = require("express");
const authenticate = require("../middleware/auth");
const { addCandidate, getCandidates, deleteCandidate, updateCandidate } = require("../controllers/CandidateActionController");

const router = express.Router()

router.post("/add", authenticate, addCandidate);
router.get("/get", authenticate, getCandidates);
router.delete("/delete/:id",authenticate, deleteCandidate);
router.put("/update/:id",authenticate, updateCandidate);

module.exports = router