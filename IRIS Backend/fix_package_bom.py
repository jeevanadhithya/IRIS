import json
import codecs

# Read the file and strip BOM if it exists
with open('package.json', 'rb') as f:
    raw = f.read()

if raw.startswith(codecs.BOM_UTF8):
    raw = raw[len(codecs.BOM_UTF8):]

# Decode and parse json
data = json.loads(raw.decode('utf-8'))

# Write it back strictly without BOM
with open('package.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)
