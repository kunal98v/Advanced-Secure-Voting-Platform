const express = require("express");
const authenticate = require("../Middleware/auth");
const { addCandidate, getCandidates, deleteCandidate, updateCandidate } = require("../Controllers/CandidateActionController");
const checkAdmin = require("../Middleware/checkAdmin");

const router = express.Router()

router.post("/add", authenticate, checkAdmin, addCandidate);
router.get("/get", getCandidates);
router.delete("/delete/:id",authenticate,checkAdmin, deleteCandidate);
router.put("/update/:id",authenticate, checkAdmin, updateCandidate);

module.exports = router