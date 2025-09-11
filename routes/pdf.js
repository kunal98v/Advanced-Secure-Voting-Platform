const express = require("express");
const authenticate = require("../middleware/auth");
const {generatePDF} = require("../Controllers/PdfController")

const router = express.Router()

router.post("/pdf", authenticate, generatePDF);

module.exports = router