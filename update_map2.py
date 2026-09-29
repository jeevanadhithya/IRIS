import sys

with open('iris_mobile/lib/screens/map_screen.dart', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the import
if 'import \'package:flutter/foundation.dart\' show kIsWeb;' not in content:
    content = content.replace('import \'package:webview_flutter/webview_flutter.dart\';', 
                              'import \'package:webview_flutter/webview_flutter.dart\';\nimport \'package:flutter/foundation.dart\' show kIsWeb;')

# Fix the initState
bad_init = '''  void initState() {
    super.initState();
    
    _webController = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..loadRequest(Uri.parse('https://your-vercel-frontend-domain.vercel.app'));
    
    _fetchData();
  }'''

good_init = '''  void initState() {
    super.initState();
    
    _webController = WebViewController();
    if (!kIsWeb) {
      _webController.setJavaScriptMode(JavaScriptMode.unrestricted);
      _webController.setBackgroundColor(const Color(0x00000000));
    }
    _webController.loadRequest(Uri.parse('https://flashflood1.vercel.app'));
    
    _fetchData();
  }'''

if bad_init in content:
    content = content.replace(bad_init, good_init)
else:
    # Let's do it with string slice or simpler replace if indentation was different
    # Actually, I'll just write a robust regex
    import re
    content = re.sub(
        r'_webController = WebViewController\(\)[\s\n\r]*\.\.setJavaScriptMode\(JavaScriptMode\.unrestricted\)[\s\n\r]*\.\.setBackgroundColor\(const Color\(0x00000000\)\)[\s\n\r]*\.\.loadRequest\(Uri\.parse\(\'[^\']+\'\)\);',
        '''_webController = WebViewController();
    if (!kIsWeb) {
      _webController.setJavaScriptMode(JavaScriptMode.unrestricted);
      _webController.setBackgroundColor(const Color(0x00000000));
    }
    _webController.loadRequest(Uri.parse('https://flashflood1.vercel.app'));''',
        content
    )

with open('iris_mobile/lib/screens/map_screen.dart', 'w', encoding='utf-8') as f:
    f.write(content)
