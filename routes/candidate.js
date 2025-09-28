const express = require("express");
const { CandidateActionController } = require("../Controllers");
const {limiter, authenticate, checkAdmin} = require("../Middleware");

const router = express.Router()

router.post("/add", authenticate, checkAdmin, CandidateActionController.addCandidate);
router.get("/get",limiter, CandidateActionController.getCandidates);
router.delete("/delete/:id",authenticate,checkAdmin, CandidateActionController.deleteCandidate);
router.put("/update/:id",authenticate, checkAdmin, CandidateActionController.updateCandidate);

module.exports = router