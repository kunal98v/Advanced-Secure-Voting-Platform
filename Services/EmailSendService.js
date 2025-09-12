const nodemailer = require("nodemailer");
require("dotenv").config({ path: __dirname + "/../.env" });

const sendMail = async (username, path) => {

  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "<noreply@election-commission.com>",
    to: "test@example.com",
    subject: "Thankyou for Voting !",
    html: `<div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; padding:20px; background:#f9f9f9;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.1); padding:20px;">
      <h2 style="color:#2c3e50;">Thank You for Voting 🗳️</h2>
      <p>Dear <b>${username}</b>,</p>
      <p>We sincerely appreciate your participation in the election. Your vote plays a vital role in shaping the future and strengthening democracy.</p>
      <p>Rest assured, your vote has been securely recorded.</p>
      <p>Your Voting Certificate has been attached below :</p>
      <hr style="margin:20px 0;">
      <p style="font-size:14px; color:#777;">This is an automated message from the Election Commission. Please do not reply to this email.</p>
    </div>
  </div>`,
    attachments: [
      {
        filename: "VotingCertificate.pdf",
        path: path,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail Sent Successfully !");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = {sendMail};
