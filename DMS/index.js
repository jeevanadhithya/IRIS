require("dotenv").config();
const twilio = require("twilio");

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID || "your_account_sid";
const authToken  = process.env.TWILIO_AUTH_TOKEN || "your_auth_token";
const flowSid    = process.env.TWILIO_FLOW_SID || "your_flow_sid";
const client = twilio(accountSid, authToken);

async function triggerDisaster(disasterType, toNumber) {
  await client.studio.v2
    .flows(flowSid)
    .executions
    .create({
      to: toNumber,
      from: "+16505824250", // Twilio SMS-enabled number
      parameters: {
        disasterType: disasterType
      }
    });

  console.log(`✅ ${disasterType} alert sent to ${toNumber}`);
}

// 🔥 Test calls
//triggerDisaster("flood", "+919942373735");
triggerDisaster("earthquake", "+919942373735");
//triggerDisaster("cyclone", "+919942373735");
//triggerDisaster("landslide", "+919942373735");
