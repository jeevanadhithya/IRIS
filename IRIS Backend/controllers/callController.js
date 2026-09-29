const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID || "your_account_sid";
const authToken = process.env.TWILIO_AUTH_TOKEN || "your_auth_token";

const client = twilio(accountSid, authToken);

exports.callUser = async (req, res) => {
    try {
        const execution = await client.studio.v2
            .flows(process.env.TWILIO_FLOW_SID || "your_flow_sid")//add ac 
            .executions
            .create({
                to: "+919942373735",      // Your verified phone number
                from: "+12295446795"      // Your Twilio number
            });

        console.log("Studio Execution SID:", execution.sid);
        res.status(200).json({ success: true, message: "Call initiated successfully", sid: execution.sid });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Failed to initiate call", error: error.message });
    }
};
