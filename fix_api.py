import sys

with open('iris_mobile/lib/services/api_service.dart', 'r', encoding='utf-8') as f:
    content = f.read()

bad_base = "static const String baseUrl = 'http://localhost:3009/api';"
good_base = '''
  import 'package:flutter/foundation.dart' show kIsWeb;
  import 'dart:io' show Platform;

  static String get baseUrl {
    if (kIsWeb) return 'http://localhost:3009/api';
    try {
      if (Platform.isAndroid) return 'http://10.0.2.2:3009/api';
    } catch (_) {}
    return 'http://localhost:3009/api';
  }'''

content = content.replace(bad_base, good_base)

# The imports need to be at the top, I'll just put it globally correctly
bad_base = '''import '../models/hazard_models.dart';

class ApiService {
  // Use localhost or standard Android emulator / LAN IP
  static const String baseUrl = 'http://localhost:3009/api';'''

good_base = '''import '../models/hazard_models.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:io' show Platform;

class ApiService {
  // Use localhost or standard Android emulator / LAN IP
  static String get baseUrl {
    if (kIsWeb) return 'http://localhost:3009/api';
    try {
      if (Platform.isAndroid) return 'http://10.0.2.2:3009/api';
    } catch (_) {}
    return 'http://localhost:3009/api';
  }'''

content = content.replace("static const String baseUrl = 'http://localhost:3009/api';", "")
with open('iris_mobile/lib/services/api_service.dart', 'r', encoding='utf-8') as f:
    old = f.read()

new_old = old.replace('''import '../models/hazard_models.dart';

class ApiService {
  // Use localhost or standard Android emulator / LAN IP
  static const String baseUrl = 'http://localhost:3009/api';''', good_base)

with open('iris_mobile/lib/services/api_service.dart', 'w', encoding='utf-8') as f:
    f.write(new_old)
