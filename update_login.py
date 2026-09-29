import sys

with open('IRIS Frontend/src/pages/auth/Login.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the quick-fill credentials
content = content.replace("setIdentifier('admin@geosense.in')", "setIdentifier('admin@iris.gov.in')")
content = content.replace("setPassword('admin2026')", "setPassword('Admin2026!')")

content = content.replace("setIdentifier('citizen@geosense.in')", "setIdentifier('citizen@iris.gov.in')")
content = content.replace("setPassword('password123')", "setPassword('Citizen2026!')")

# Replace default state
content = content.replace("useState('citizen@geosense.in')", "useState('admin@iris.gov.in')")
content = content.replace("useState('password123')", "useState('Admin2026!')")

# Replace the hardcoded logic
content = content.replace("password === 'admin2026'", "password === 'Admin2026!'")

with open('IRIS Frontend/src/pages/auth/Login.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
