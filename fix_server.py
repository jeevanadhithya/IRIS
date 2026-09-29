import sys

with open('IRIS Backend/server.js', 'r', encoding='utf-8') as f:
    content = f.read()

bad_listen = '''server.listen(PORT, () => {
  console.log('====================================================');
  console.log('  IRIS EOC Resilient Backend running on port ' + PORT);
  console.log('  Motto: Sense -> Analyze -> Predict -> Warn -> Guide -> Respond');
  console.log('  Twilio Gateway: ' + (twilioClient ? 'ENABLED' : 'DISABLED (Mock Mode)'));
  console.log('====================================================');
});'''

good_listen = '''if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log('====================================================');
    console.log('  IRIS EOC Resilient Backend running on port ' + PORT);
    console.log('  Motto: Sense -> Analyze -> Predict -> Warn -> Guide -> Respond');
    console.log('  Twilio Gateway: ' + (twilioClient ? 'ENABLED' : 'DISABLED (Mock Mode)'));
    console.log('====================================================');
  });
}

// Export the Express app as a serverless function for Vercel
module.exports = app;'''

content = content.replace(bad_listen, good_listen)

with open('IRIS Backend/server.js', 'w', encoding='utf-8') as f:
    f.write(content)
