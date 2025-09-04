const express = require("express");
const validate = require("../middleware/validate");
const { signup, signin } = require("../controllers/UserAuthenticationController");

const router = express.Router();

router.post("/signup", validate, signup);

router.post("/signin", validate, signin);

module.exports = router;
