import os

for root, dirs, files in os.walk('IRIS Frontend/src'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            if '<Grid item' in content or '<Grid ' in content:
                # Remove the word 'item' from Grid tags.
                # E.g., <Grid item xs={12}> -> <Grid xs={12}>
                new_content = content.replace('<Grid item ', '<Grid ').replace('<Grid item>', '<Grid>')
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
