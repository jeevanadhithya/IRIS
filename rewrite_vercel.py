import sys

with open('IRIS Backend/vercel.json', 'w', encoding='utf-8') as f:
    f.write('''{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/server.js"
    }
  ]
}''')
