import 'dart:async';
import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../services/location_service.dart';
import '../theme/iris_theme.dart';

class SosScreen extends StatefulWidget {
  const SosScreen({super.key});

  @override
  State<SosScreen> createState() => _SosScreenState();
}

class _SosScreenState extends State<SosScreen> {
  final ApiService _apiService = ApiService();
  final LocationService _locationService = LocationService();
  bool _isDispatching = false;
  bool _isDispatched = false;
  int _countdown = 5;
  Timer? _timer;
  String _selectedReason = 'Flooding / Trapped by Water';
  final TextEditingController _noteController = TextEditingController();

  final List<String> _distressReasons = [
    'Flooding / Trapped by Water',
    'Landslide Mud Influx / Road Cutoff',
    'Medical Emergency / Injured Citizen',
    'Senior Citizen / Child Assistance Needed',
    'Structural Collapse Risk',
  ];

  final List<Map<String, String>> _emergencyContacts = [
    {'name': 'National Emergency', 'number': '112', 'desc': 'Police, Fire & Rescue'},
    {'name': 'NDRF Headquarters', 'number': '1078', 'desc': 'National Disaster Response Force'},
    {'name': 'Disaster Medical Ambulance', 'number': '108', 'desc': 'Rapid Emergency Care'},
    {'name': 'State Emergency Ops (SEOC)', 'number': '1070', 'desc': 'District Magistrate EOC'},
  ];

  @override
  void initState() {
    super.initState();
    _locationService.addListener(_onLocationUpdate);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        _locationService.refreshLocation();
      }
    });
  }

  void _onLocationUpdate() {
    if (mounted) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) setState(() {});
      });
    }
  }

  @override
  void dispose() {
    _locationService.removeListener(_onLocationUpdate);
    _timer?.cancel();
    _noteController.dispose();
    super.dispose();
  }

  void _triggerSosCountdown() {
    setState(() {
      _isDispatching = true;
      _countdown = 5;
    });

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_countdown > 1) {
        setState(() => _countdown--);
      } else {
        _timer?.cancel();
        _dispatchSosSignal();
      }
    });
  }

  void _cancelSosCountdown() {
    _timer?.cancel();
    setState(() {
      _isDispatching = false;
      _countdown = 5;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('SOS Dispatch Cancelled'),
        backgroundColor: IrisTheme.textSecondary,
        duration: Duration(seconds: 2),
      ),
    );
  }

  Future<void> _dispatchSosSignal() async {
    setState(() => _isDispatching = false);
    
    // Send live GPS coordinates to backend Twilio pipeline & SEOC
    final success = await _apiService.sendSOS(
      latitude: _locationService.latitude,
      longitude: _locationService.longitude,
      emergencyType: _selectedReason,
      citizenNote: _noteController.text.trim(),
    );

    if (mounted) {
      setState(() => _isDispatched = success);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: IrisTheme.backgroundWhite,
      appBar: AppBar(
        title: const Text('Emergency SOS Dispatch'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Column(
          children: [
            // Status or Trigger Zone
            if (_isDispatched)
              _buildDispatchedSuccessCard()
            else if (_isDispatching)
              _buildCountdownCard()
            else
              _buildSosTriggerCard(),

            const SizedBox(height: 20),

            // Distress Reason Selector
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: IrisTheme.surfaceCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: IrisTheme.borderLight),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Emergency Nature',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: IrisTheme.textPrimary),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    initialValue: _selectedReason,
                    decoration: const InputDecoration(
                      contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    ),
                    items: _distressReasons.map((r) {
                      return DropdownMenuItem(
                        value: r,
                        child: Text(r, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                      );
                    }).toList(),
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedReason = val);
                    },
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _noteController,
                    maxLines: 2,
                    decoration: const InputDecoration(
                      hintText: 'Additional details (e.g. 3 people on rooftop, water rising)...',
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // One-Touch Emergency Speed Dials
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: IrisTheme.surfaceCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: IrisTheme.borderLight),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Direct Emergency Hotlines',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: IrisTheme.textPrimary),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Toll-free 24/7 disaster helplines',
                    style: TextStyle(fontSize: 11, color: IrisTheme.textMuted),
                  ),
                  const SizedBox(height: 12),
                  ..._emergencyContacts.map((c) => _buildContactRow(c)),
                ],
              ),
            ),

            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildSosTriggerCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
      decoration: BoxDecoration(
        color: IrisTheme.dangerRedBg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: IrisTheme.dangerRed.withOpacity(0.3), width: 1.5),
      ),
      child: Column(
        children: [
          const Text(
            'HOLD FOR IMMEDIATE RESCUE',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w800,
              color: IrisTheme.dangerRed,
              letterSpacing: 0.8,
            ),
          ),
          const SizedBox(height: 6),
          const Text(
            'Transmits live GPS coordinates to District Disaster Management Authority & Twilio SMS Alert Grid',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, color: IrisTheme.textSecondary, height: 1.3),
          ),
          const SizedBox(height: 20),
          GestureDetector(
            onTap: _triggerSosCountdown,
            child: Container(
              width: 140,
              height: 140,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: IrisTheme.dangerRed,
                boxShadow: [
                  BoxShadow(
                    color: IrisTheme.dangerRed.withOpacity(0.35),
                    blurRadius: 20,
                    spreadRadius: 4,
                  ),
                ],
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  Icon(Icons.sos_rounded, color: Colors.white, size: 48),
                  SizedBox(height: 4),
                  Text(
                    'TRIGGER SOS',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 0.5,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          GestureDetector(
            onTap: () => _locationService.refreshLocation(),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: IrisTheme.borderLight),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.gps_fixed, 
                    size: 13, 
                    color: _locationService.hasPermission ? IrisTheme.safeGreen : IrisTheme.warningAmber,
                  ),
                  const SizedBox(width: 6),
                  Text(
                    _locationService.isLoading
                        ? 'Acquiring high-precision GPS lock...'
                        : 'Live GPS: ${_locationService.latitude.toStringAsFixed(4)}° N, ${_locationService.longitude.toStringAsFixed(4)}° E (±${_locationService.accuracy.toStringAsFixed(1)}m)',
                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: IrisTheme.textPrimary),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCountdownCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 28, horizontal: 16),
      decoration: BoxDecoration(
        color: IrisTheme.dangerRed,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          const Text(
            'DISPATCHING IN',
            style: TextStyle(color: Colors.white70, fontSize: 13, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 8),
          Text(
            '$_countdown',
            style: const TextStyle(color: Colors.white, fontSize: 64, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: _cancelSosCountdown,
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: IrisTheme.dangerRed,
              padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 12),
            ),
            child: const Text('CANCEL BROADCAST', style: TextStyle(fontWeight: FontWeight.w800)),
          ),
        ],
      ),
    );
  }

  Widget _buildDispatchedSuccessCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: IrisTheme.safeGreenBg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: IrisTheme.safeGreen),
      ),
      child: Column(
        children: [
          const Icon(Icons.check_circle_rounded, color: IrisTheme.safeGreen, size: 48),
          const SizedBox(height: 10),
          const Text(
            'SOS Transmitted Successfully',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: IrisTheme.safeGreen),
          ),
          const SizedBox(height: 6),
          const Text(
            'Emergency team dispatched. Stay where you are and keep your mobile phone battery active.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, color: IrisTheme.textSecondary),
          ),
          const SizedBox(height: 16),
          OutlinedButton(
            onPressed: () {
              setState(() => _isDispatched = false);
            },
            style: OutlinedButton.styleFrom(
              side: const BorderSide(color: IrisTheme.safeGreen),
            ),
            child: const Text('Reset SOS Status', style: TextStyle(color: IrisTheme.safeGreen, fontWeight: FontWeight.w700)),
          ),
        ],
      ),
    );
  }

  Widget _buildContactRow(Map<String, String> contact) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: IrisTheme.surfaceMuted,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                contact['name']!,
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: IrisTheme.textPrimary),
              ),
              Text(
                contact['desc']!,
                style: const TextStyle(fontSize: 11, color: IrisTheme.textMuted),
              ),
            ],
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: IrisTheme.primaryBlue,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              children: [
                const Icon(Icons.call, color: Colors.white, size: 14),
                const SizedBox(width: 4),
                Text(
                  contact['number']!,
                  style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w800),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
