import sys

with open('IRIS Backend/server.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''app.get('/api/sensors', (req, res) => {'''
telemetry_route = '''app.get('/api/telemetry', (req, res) => {
  res.json({
      riverStage: 4.95,
      riverThreshold: 5.50,
      rainfall: 92.1,
      porePressure: 45.2,
      aqi: 110,
      timestamp: new Date().toISOString(),
      status: 'high'
  });
});

app.get('/api/sensors', (req, res) => {'''

content = content.replace(target, telemetry_route)

with open('IRIS Backend/server.js', 'w', encoding='utf-8') as f:
    f.write(content)
