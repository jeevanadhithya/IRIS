import sys

with open('iris_mobile/lib/main.dart', 'r', encoding='utf-8') as f:
    content = f.read()

bad_screens = '''  final List<Widget> _screens = [
    const HomeScreen(),
    const AlertsScreen(),
    const MapScreen(),
    const SosScreen(),
    const CommunityScreen(),
  ];'''

good_screens = '''  List<Widget> get _screens => [
    HomeScreen(onNavigateTab: _onTabSelected),
    const AlertsScreen(),
    const MapScreen(),
    const SosScreen(),
    const CommunityScreen(),
  ];'''

content = content.replace(bad_screens, good_screens)

with open('iris_mobile/lib/main.dart', 'w', encoding='utf-8') as f:
    f.write(content)
