const express = require("express");
const validate = require("../middleware/validate");
const { signup, signin, getUsers, resetPassword} = require("../controllers/UserAuthenticationController");
const voterAuth = require("../middleware/voterAuth");
const authenticate = require("../middleware/auth");
const {castVote} = require("../controllers/VoteActionController");

const router = express.Router();

router.get("/get-users", getUsers)
router.post("/vote/:id", voterAuth, castVote);

router.post("/signup",validate, signup);
router.post("/signin",validate, signin);

router.post("/reset-password", authenticate, resetPassword)


module.exports = router;
