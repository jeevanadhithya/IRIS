import os

for root, dirs, files in os.walk('IRIS Frontend/src'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if '<Grid' in content and 'Grid' not in content.split('from \'@mui/material\'')[0]:
                    print(path)
