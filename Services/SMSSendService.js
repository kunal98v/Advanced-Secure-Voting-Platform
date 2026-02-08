const twilio = require("twilio");
require("dotenv").config({ path: __dirname + "/../.env" });

let client = null;

const initializeTwilio = () => {
  if (!client && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith("AC")) {
    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  return client;
};

const sendSMS = async (to, message) => {
  try {
    const twilioClient = initializeTwilio();
    if (!twilioClient) {
      console.warn("⚠️  Twilio not configured. Add valid TWILIO_ACCOUNT_SID to .env");
      return;
    }

    const sms = await twilioClient.messages.create({
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

module.exports = { sendSMS };
