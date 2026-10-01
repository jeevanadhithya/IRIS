import json

data = {
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/api/index.js"
        }
    ]
}

with open('vercel.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)
