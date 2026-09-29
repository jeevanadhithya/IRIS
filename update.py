import sys

with open('iris_mobile/lib/main.dart', 'r', encoding='utf-8') as f:
    content = f.read()

bad_init = '''    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false;
            });
          },
        ),
      )
      ..loadRequest(Uri.parse(targetUrl));'''

good_init = '''    _controller = WebViewController();
    
    if (!kIsWeb) {
      _controller.setJavaScriptMode(JavaScriptMode.unrestricted);
      _controller.setBackgroundColor(const Color(0x00000000));
      _controller.setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false;
            });
          },
        ),
      );
    } else {
      // On web, iframe loading state is harder to track cross-origin, just dismiss loader quickly
      Future.delayed(const Duration(seconds: 1), () {
        if (mounted) setState(() => _isLoading = false);
      });
    }
    
    _controller.loadRequest(Uri.parse(targetUrl));'''

content = content.replace(bad_init, good_init)

with open('iris_mobile/lib/main.dart', 'w', encoding='utf-8') as f:
    f.write(content)
