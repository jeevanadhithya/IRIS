import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';

class LocationService extends ChangeNotifier {
  static final LocationService _instance = LocationService._internal();
  factory LocationService() => _instance;
  LocationService._internal();

  Position? _currentPosition;
  String _currentAreaName = 'Locating...';
  bool _isLoading = false;
  bool _hasPermission = false;
  String? _errorMessage;
  StreamSubscription<Position>? _positionStreamSubscription;

  Position? get currentPosition => _currentPosition;
  String get currentAreaName => _currentAreaName;
  bool get isLoading => _isLoading;
  bool get hasPermission => _hasPermission;
  String? get errorMessage => _errorMessage;

  double get latitude => _currentPosition?.latitude ?? 9.1824;
  double get longitude => _currentPosition?.longitude ?? 76.8123;
  double get accuracy => _currentPosition?.accuracy ?? 5.0;

  void _safeNotifyListeners() {
    scheduleMicrotask(() {
      notifyListeners();
    });
  }

  /// Initialize and fetch immediate location
  Future<void> init() async {
    await refreshLocation();
    startLiveTracking();
  }

  /// Request permissions and get current GPS location
  Future<Position?> refreshLocation() async {
    _isLoading = true;
    _errorMessage = null;
    _safeNotifyListeners();

    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        _errorMessage = 'Location services are disabled on device';
        _currentAreaName = 'GPS Disabled (Kallada Basin)';
        _isLoading = false;
        _safeNotifyListeners();
        return null;
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          _errorMessage = 'Location permissions are denied';
          _currentAreaName = 'Permission Denied';
          _isLoading = false;
          _hasPermission = false;
          _safeNotifyListeners();
          return null;
        }
      }

      if (permission == LocationPermission.deniedForever) {
        _errorMessage = 'Location permissions permanently denied';
        _currentAreaName = 'Permissions Blocked';
        _isLoading = false;
        _hasPermission = false;
        _safeNotifyListeners();
        return null;
      }

      _hasPermission = true;

      // Get high accuracy live fix
      final position = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.high,
          timeLimit: Duration(seconds: 10),
        ),
      );

      _currentPosition = position;
      _currentAreaName = formatAreaLabel(position.latitude, position.longitude);
      _isLoading = false;
      _safeNotifyListeners();
      return position;
    } catch (e) {
      // Fallback to last known position if immediate fix takes too long
      try {
        final lastKnown = await Geolocator.getLastKnownPosition();
        if (lastKnown != null) {
          _currentPosition = lastKnown;
          _currentAreaName = formatAreaLabel(lastKnown.latitude, lastKnown.longitude);
          _hasPermission = true;
          _isLoading = false;
          _safeNotifyListeners();
          return lastKnown;
        }
      } catch (_) {}

      _errorMessage = 'Could not acquire GPS: ${e.toString()}';
      _currentAreaName = 'GPS Fallback (Kallada Zone)';
      _isLoading = false;
      _safeNotifyListeners();
      return null;
    }
  }

  /// Start continuous stream tracking
  void startLiveTracking() {
    _positionStreamSubscription?.cancel();

    try {
      const locationSettings = LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 5, // update every 5 meters
      );

      _positionStreamSubscription = Geolocator.getPositionStream(
        locationSettings: locationSettings,
      ).listen(
        (Position position) {
          _currentPosition = position;
          _currentAreaName = formatAreaLabel(position.latitude, position.longitude);
          _hasPermission = true;
          _safeNotifyListeners();
        },
        onError: (e) {
          _errorMessage = e.toString();
          _safeNotifyListeners();
        },
      );
    } catch (e) {
      debugPrint('Live tracking stream failed: $e');
    }
  }

  /// Stop live stream tracking
  void stopLiveTracking() {
    _positionStreamSubscription?.cancel();
    _positionStreamSubscription = null;
  }

  /// Calculate distance in kilometers to a target point
  double distanceToKm(double targetLat, double targetLng) {
    try {
      if (_currentPosition == null) {
        // Use fallback default location
        final distMeters = Geolocator.distanceBetween(9.1824, 76.8123, targetLat, targetLng);
        return double.parse((distMeters / 1000).toStringAsFixed(2));
      }
      final distMeters = Geolocator.distanceBetween(
        _currentPosition!.latitude,
        _currentPosition!.longitude,
        targetLat,
        targetLng,
      );
      return double.parse((distMeters / 1000).toStringAsFixed(2));
    } catch (_) {
      return 1.25; // fallback km
    }
  }

  /// Format clean area / coordinates string
  String formatAreaLabel(double lat, double lng) {
    // Generate localized sector label based on coordinates
    final latStr = lat.toStringAsFixed(4);
    final lngStr = lng.toStringAsFixed(4);
    return '$latStr°, $lngStr°';
  }

  @override
  void dispose() {
    _positionStreamSubscription?.cancel();
    super.dispose();
  }
}
