import sys
import re

with open('README.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the table rows with the live links
old_table = '''| ðŸŒ  **Web Dashboard** | ðŸ“± **Mobile Application** | ðŸŽ¯ **Official Submission** |
|:---:|:---:|:---:|
| **Docker Port: 80** | **Flutter Release** | **SIH 2026 Â· PS-26178** |'''

new_table = '''| 🌐 **Live Web Dashboard** | 📱 **Android App (APK)** | 📁 **Evaluation Drive** |
|:---:|:---:|:---:|
| [**iris-frontend-sih.vercel.app**](https://iris-frontend-sih.vercel.app/) | [**Download v1.0.0 Release**](https://github.com/jeevanadhithya/IRIS/releases/tag/v1.0.0) | [**Google Drive Assets**](https://drive.google.com/drive/folders/1S2ui2_ELrqhOKkWcbbIvXsx56H7OcEDZ?usp=drive_link) |'''

content = content.replace(old_table, new_table)
# Just in case the encoding characters were read weirdly, I'll use a regex to replace the table rows
content = re.sub(r'\|.*Web Dashboard.*?\|.*?Mobile Application.*?\|.*?Official Submission.*?\|.*?\|.*?\|.*?\|.*?\|.*?\|.*?\|', new_table, content, flags=re.DOTALL)

with open('README.md', 'w', encoding='utf-8') as f:
    f.write(content)
