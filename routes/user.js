const express = require("express");
const {UserAuthenticationController, VoteActionController} = require("../controllers");
const {limiter, voterAuth, validate, authenticate} = require("../middleware");

const router = express.Router();

router.get("/get-users",limiter, UserAuthenticationController.getUsers);
router.post("/vote/:id", voterAuth, VoteActionController.castVote);

router.post("/signup",validate, UserAuthenticationController.signup);
router.post("/signin",validate, UserAuthenticationController.signin);

router.post("/reset-password", authenticate, UserAuthenticationController.resetPassword);


module.exports = router;
