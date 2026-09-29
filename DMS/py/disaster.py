import os
from twilio.rest import Client

account_sid = os.environ.get("TWILIO_ACCOUNT_SID", "your_account_sid")
auth_token = os.environ.get("TWILIO_AUTH_TOKEN", "your_auth_token")

client = Client(account_sid, auth_token)

call = client.calls.create(
    to="+919942373735",          # verified number
    from_="+12295446795",        # Twilio number
    url=f"https://webhooks.twilio.com/v1/Accounts/{account_sid}/Flows/FWda26b9cf4c69c629351c53b8c19b45ac"
)

print("Call SID:", call.sid)