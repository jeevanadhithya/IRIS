import sys
import re

with open('IRIS Backend/server.js', 'r', encoding='utf-8') as f:
    content = f.read()

# I will use a regex to replace the server.listen block
content = re.sub(
    r'server\.listen\(PORT, \(\) => \{.*?\}\);',
    r'''if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(====================================================);
    console.log(  IRIS EOC Resilient Backend running on port );
    console.log(  Motto: Sense -> Analyze -> Predict -> Warn -> Guide -> Respond);
    console.log(  Twilio Gateway: );
    console.log(====================================================);
  });
}''',
    content,
    flags=re.DOTALL
)

with open('IRIS Backend/server.js', 'w', encoding='utf-8') as f:
    f.write(content)
