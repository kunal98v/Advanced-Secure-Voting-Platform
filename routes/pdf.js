const express = require("express");
const {authenticate} = require("../Middleware");
const {generatePDF} = require("../Services/PdfService")

const router = express.Router()

router.post("/pdf", authenticate, generatePDF);

module.exports = router