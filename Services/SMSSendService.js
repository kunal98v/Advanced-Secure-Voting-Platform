const twilio = require("twilio");
require("dotenv").config({ path: __dirname + "/../.env" });

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, message) => {
  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE, 
      to: to,
    });

    console.log("✅ SMS sent:", sms.sid);
    return sms;
  } catch (err) {
    console.error("❌ Error sending SMS:", err);
  }
};

sendSMS("+917738579164", "Baki saheb mazet na !");

module.exports = { sendSMS };
