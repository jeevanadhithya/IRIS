import sys

with open('iris_mobile/lib/screens/map_screen.dart', 'r', encoding='utf-8') as f:
    content = f.read()

import_fix = '''import '../theme/iris_theme.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:flutter/foundation.dart' show kIsWeb;'''

content = content.replace("import '../theme/iris_theme.dart';\nimport 'package:webview_flutter/webview_flutter.dart';", import_fix)

init_fix_bad = '''  void initState() {
    super.initState();
    
    _webController = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..loadRequest(Uri.parse('https://your-vercel-frontend-domain.vercel.app'));
    
    _fetchData();
  }'''

init_fix_good = '''  void initState() {
    super.initState();
    
    _webController = WebViewController();
    if (!kIsWeb) {
      _webController.setJavaScriptMode(JavaScriptMode.unrestricted);
      _webController.setBackgroundColor(const Color(0x00000000));
    }
    _webController.loadRequest(Uri.parse('https://flashflood1.vercel.app'));
    
    _fetchData();
  }'''

content = content.replace(init_fix_bad, init_fix_good)

with open('iris_mobile/lib/screens/map_screen.dart', 'w', encoding='utf-8') as f:
    f.write(content)
