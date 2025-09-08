const express = require("express");
const validate = require("../middleware/validate");
const { signup, signin } = require("../controllers/UserAuthenticationController");

const router = express.Router();

router.use(validate); // middleware applied to all routes below 👇

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
