const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const app = express();

// yaha dirname se ek level upar jaa (controller ke bahar project root pe)
const publicPath = path.join(__dirname, "..", "public", "pdfs");
app.use("/pdfs", express.static(publicPath));

const generatePDF = async (req, res) => {
  try {
    const { id, username } = req.user;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Generate random certificate number
    const certificateNo = "CERT-" + Math.floor(100000 + Math.random() * 900000);

    // Get current date & time
    const now = new Date();
    const dateTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Voting Certificate</title>
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 40px;
        padding: 20px;
        border: 2px solid #333;
        border-radius: 10px;
        position: relative;
    }
    .header {
        text-align: center;
        margin-bottom: 30px;
    }
    .header h1 {
        color: darkblue;
        text-transform: uppercase;
    }
    .cert-no {
        position: absolute;
        top: 20px;
        right: 30px;
        font-weight: bold;
        color: darkred;
        font-size: 14px;
    }
    .details {
        margin: 60px 0 20px 0;
        line-height: 1.6;
    }
    .details p {
        font-size: 16px;
    }
    .highlight {
        font-weight: bold;
        color: darkgreen;
    }
.barcode {
    text-align: right;   /* Align barcode to right side */
    margin: 10px 0;
}

.footer {
    width: 100%;
    margin-top: 40px;
    font-size: 13px;
    text-align: center;
    border-top: 1px dashed #aaa;
    padding-top: 10px;
    color: #555;
    clear: both; /* ensure it stays below everything */
}

</style>
</head>
<body>
    <!-- Certificate Number (Top Right) -->
    <div class="cert-no">Certificate No: ${certificateNo}</div>

    <div class="header">
        <h1>Voting Acknowledgement Certificate</h1>
        <p>🗳️ Thank you for participating in the election!</p>
    </div>

    <div class="details">
        <p><span class="highlight">Voter Name:</span> ${username}</p>
        <p><span class="highlight">Voter ID:</span> ${id}</p>
        <p><span class="highlight">Date & Time:</span> ${dateTime}</p>
    </div>

    <div class="barcode">
        <svg id="barcode"></svg>
    </div>

    <div class="footer">
        <p>This certificate is system generated and does not require a physical signature.</p>
        <p>© Voting System 2025</p>
    </div>

    <script>
        JsBarcode("#barcode", "${certificateNo}", {
            format: "CODE128",
            lineColor: "#000",
            width: 2,
            height: 50,
            displayValue: true
        });
    </script>
</body>
</html>`;

    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    const filename = `certificate-${Date.now()}.pdf`;
    const pdfPath = path.join(publicPath, filename);

    await page.pdf({ path: pdfPath, format: "A4", printBackground: true });
    await browser.close();

    const fileUrl = `${req.protocol}://${req.get("host")}/pdfs/${filename}`;

    console.log("📂 PDF saved at:", pdfPath);
    console.log("🌐 URL:", fileUrl);

    return res.status(200).json({ url: fileUrl });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

module.exports = { generatePDF };
