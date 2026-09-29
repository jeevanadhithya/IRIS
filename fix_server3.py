import sys
import re

with open('IRIS Backend/server.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'if \(\!process\.env\.VERCEL\) \{.*?\}\)',
    r'''if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log('====================================================');
    console.log('  IRIS EOC Resilient Backend running on port ' + PORT);
    console.log('  Motto: Sense -> Analyze -> Predict -> Warn -> Guide -> Respond');
    console.log('  Twilio Gateway: ' + (twilioClient ? 'ENABLED' : 'SIMULATION FALLBACK'));
    console.log('====================================================');
  });
}''',
    content,
    flags=re.DOTALL
)

with open('IRIS Backend/server.js', 'w', encoding='utf-8') as f:
    f.write(content)
