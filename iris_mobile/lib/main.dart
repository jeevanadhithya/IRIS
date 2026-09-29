import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/iris_theme.dart';
import 'screens/home_screen.dart';
import 'screens/alerts_screen.dart';
import 'screens/map_screen.dart';
import 'screens/sos_screen.dart';
import 'screens/community_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      systemNavigationBarColor: Colors.white,
      systemNavigationBarIconBrightness: Brightness.dark,
    ),
  );
  runApp(const IrisMobileApp());
}

class IrisMobileApp extends StatelessWidget {
  const IrisMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'I R I S',
      debugShowCheckedModeBanner: false,
      theme: IrisTheme.whiteTheme,
      home: const MainNavigationShell(),
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;

  void _onTabSelected(int index) {
    setState(() => _currentIndex = index);
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> screens = [
      HomeScreen(onNavigateTab: _onTabSelected),
      const AlertsScreen(),
      const MapScreen(),
      const SosScreen(),
      const CommunityScreen(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(
            top: BorderSide(color: IrisTheme.borderLight, width: 1),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: _onTabSelected,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home_outlined),
              activeIcon: Icon(Icons.home_rounded),
              label: 'Overview',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.notifications_active_outlined),
              activeIcon: Icon(Icons.notifications_active_rounded),
              label: 'Alerts',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.map_outlined),
              activeIcon: Icon(Icons.map_rounded),
              label: 'Evac & Map',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.sos_outlined, color: IrisTheme.dangerRed),
              activeIcon: Icon(Icons.sos_rounded, color: IrisTheme.dangerRed),
              label: 'SOS',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.people_alt_outlined),
              activeIcon: Icon(Icons.people_alt_rounded),
              label: 'Community',
            ),
          ],
        ),
      ),
    );
  }
}
