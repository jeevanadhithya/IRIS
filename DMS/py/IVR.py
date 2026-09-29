from twilio.rest import Client

import os

# Twilio credentials
account_sid = os.environ.get("TWILIO_ACCOUNT_SID", "your_account_sid")
auth_token  = os.environ.get("TWILIO_AUTH_TOKEN", "your_auth_token")
flow_sid    = os.environ.get("TWILIO_FLOW_SID", "your_flow_sid")

client = Client(account_sid, auth_token)

def trigger_disaster(disaster_type, to_number):
    execution = client.studio.v2 \
        .flows(flow_sid) \
        .executions \
        .create(
            to=to_number,
            from_="+17656456852",   # Twilio voice/SMS number
            parameters={
                "disasterType": disaster_type
            }
        )

    print(f"✅ {disaster_type} alert sent to {to_number}")
    print("Execution SID:", execution.sid)

# 🔥 Test calls
# trigger_disaster("flood", "+919942373735")
trigger_disaster("earthquake", "+919942373735")
# trigger_disaster("cyclone", "+919942373735")
# trigger_disaster("landslide", "+919942373735")
