import 'package:flutter/material.dart';
import '../models/hazard_models.dart';
import '../services/api_service.dart';
import '../services/location_service.dart';
import '../theme/iris_theme.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  final ApiService _apiService = ApiService();
  final LocationService _locationService = LocationService();
  List<ShelterInfo> _shelters = [];
  List<EvacuationCorridor> _corridors = [];
  String _selectedCorridorId = 'COR-A';
  bool _isNavigating = false;

  @override
  void initState() {
    super.initState();
    _locationService.addListener(_onLocationUpdate);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        _locationService.init();
      }
    });
    _shelters = _apiService.getShelters();
    _corridors = _apiService.getEvacuationCorridors();
  }

  @override
  void dispose() {
    _locationService.removeListener(_onLocationUpdate);
    super.dispose();
  }

  void _onLocationUpdate() {
    if (mounted) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) setState(() {});
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: IrisTheme.backgroundWhite,
      appBar: AppBar(
        title: const Text('Evacuation & Safe Shelters'),
        actions: [
          GestureDetector(
            onTap: () => _locationService.refreshLocation(),
            child: Container(
              margin: const EdgeInsets.only(right: 12),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: _locationService.hasPermission ? IrisTheme.safeGreenBg : IrisTheme.surfaceMuted,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: _locationService.hasPermission 
                      ? IrisTheme.safeGreen.withOpacity(0.4) 
                      : IrisTheme.borderLight,
                ),
              ),
              child: Row(
                children: [
                  Icon(
                    Icons.wifi_tethering, 
                    size: 14, 
                    color: _locationService.hasPermission ? IrisTheme.safeGreen : IrisTheme.textMuted,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    _locationService.hasPermission 
                        ? 'Live GPS Fix (${_locationService.latitude.toStringAsFixed(3)}°)' 
                        : 'Acquiring GPS',
                    style: TextStyle(
                      fontSize: 11, 
                      fontWeight: FontWeight.w700, 
                      color: _locationService.hasPermission ? IrisTheme.safeGreen : IrisTheme.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Map Canvas Simulation
            _buildMapCanvas(),

            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Active Navigation Prompt
                  if (_isNavigating)
                    Container(
                      margin: const EdgeInsets.only(bottom: 16),
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: IrisTheme.safeGreenBg,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: IrisTheme.safeGreen),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.navigation, color: IrisTheme.safeGreen, size: 28),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: const [
                                Text(
                                  'Evacuation Mode Active',
                                  style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: IrisTheme.safeGreen),
                                ),
                                SizedBox(height: 2),
                                Text(
                                  'Proceed along North Ridge Road toward St. Mary Shelter. Hazard clear.',
                                  style: TextStyle(fontSize: 11, color: IrisTheme.textSecondary),
                                ),
                              ],
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.close, size: 18, color: IrisTheme.textSecondary),
                            onPressed: () => setState(() => _isNavigating = false),
                          ),
                        ],
                      ),
                    ),

                  // Evacuation Corridors
                  const Text(
                    'AI Safe Corridors',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: IrisTheme.textPrimary,
                      letterSpacing: -0.2,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Corridors evaluated by hydrodynamic models & edge river sensors',
                    style: TextStyle(fontSize: 12, color: IrisTheme.textMuted),
                  ),

                  const SizedBox(height: 12),

                  ..._corridors.map((c) => _buildCorridorCard(c)),

                  const SizedBox(height: 20),

                  // Verified Emergency Shelters
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Verified Relief Shelters',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
                          color: IrisTheme.textPrimary,
                          letterSpacing: -0.2,
                        ),
                      ),
                      Text(
                        '${_shelters.length} active',
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: IrisTheme.textMuted),
                      ),
                    ],
                  ),

                  const SizedBox(height: 10),

                  ..._shelters.map((s) => _buildShelterCard(s)),

                  const SizedBox(height: 24),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMapCanvas() {
    return Container(
      height: 210,
      width: double.infinity,
      color: IrisTheme.surfaceMuted,
      child: Stack(
        children: [
          // Background Grid / Terrain pattern
          CustomPaint(
            size: const Size(double.infinity, 210),
            painter: _TerrainPainter(),
          ),

          // User Pin
          Positioned(
            left: 70,
            bottom: 60,
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: IrisTheme.primaryBlue,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    'You (${_locationService.latitude.toStringAsFixed(3)}°, ${_locationService.longitude.toStringAsFixed(3)}°)',
                    style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w700),
                  ),
                ),
                const Icon(Icons.person_pin_circle, color: IrisTheme.primaryBlue, size: 30),
              ],
            ),
          ),

          // Hazard Zone Marker
          Positioned(
            left: 170,
            top: 40,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: IrisTheme.dangerRed.withOpacity(0.9),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  Icon(Icons.water, color: Colors.white, size: 12),
                  SizedBox(width: 4),
                  Text('Inundation 1.2m', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w700)),
                ],
              ),
            ),
          ),

          // Shelter Pin
          Positioned(
            right: 40,
            top: 30,
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: IrisTheme.safeGreen,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Text('St. Mary Shelter', style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w700)),
                ),
                const Icon(Icons.night_shelter_rounded, color: IrisTheme.safeGreen, size: 28),
              ],
            ),
          ),

          // Map Control Buttons
          Positioned(
            right: 12,
            bottom: 12,
            child: Column(
              children: [
                _buildMapMiniBtn(
                  Icons.my_location,
                  tooltip: 'Recenter GPS',
                  onTap: () async {
                    final pos = await _locationService.refreshLocation();
                    if (mounted && pos != null) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Live GPS: ${pos.latitude.toStringAsFixed(4)}° N, ${pos.longitude.toStringAsFixed(4)}° E (±${pos.accuracy.toStringAsFixed(1)}m)'),
                          backgroundColor: IrisTheme.safeGreen,
                          duration: const Duration(seconds: 2),
                        ),
                      );
                    }
                  },
                ),
                const SizedBox(height: 6),
                _buildMapMiniBtn(Icons.layers_outlined),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMapMiniBtn(IconData icon, {VoidCallback? onTap, String? tooltip}) {
    return GestureDetector(
      onTap: onTap,
      child: Tooltip(
        message: tooltip ?? '',
        child: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(8),
            boxShadow: [
              BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 4, offset: const Offset(0, 2)),
            ],
          ),
          child: Icon(icon, size: 18, color: IrisTheme.primaryBlue),
        ),
      ),
    );
  }

  Widget _buildCorridorCard(EvacuationCorridor c) {
    final isSelected = _selectedCorridorId == c.id;
    Color statusColor;
    Color statusBg;
    IconData statusIcon;

    if (c.status == 'clear') {
      statusColor = IrisTheme.safeGreen;
      statusBg = IrisTheme.safeGreenBg;
      statusIcon = Icons.check_circle_outline_rounded;
    } else if (c.status == 'flooded') {
      statusColor = IrisTheme.dangerRed;
      statusBg = IrisTheme.dangerRedBg;
      statusIcon = Icons.cancel_outlined;
    } else {
      statusColor = IrisTheme.warningAmber;
      statusBg = IrisTheme.warningAmberBg;
      statusIcon = Icons.error_outline_rounded;
    }

    return GestureDetector(
      onTap: () {
        setState(() => _selectedCorridorId = c.id);
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: isSelected ? IrisTheme.primaryBlue.withOpacity(0.03) : IrisTheme.surfaceCard,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: isSelected ? IrisTheme.primaryBlue : IrisTheme.borderLight,
            width: isSelected ? 1.6 : 1.0,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: statusBg,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(statusIcon, size: 12, color: statusColor),
                      const SizedBox(width: 4),
                      Text(
                        c.status.toUpperCase(),
                        style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: statusColor),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    c.name,
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: IrisTheme.textPrimary),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              c.hazardWarning,
              style: TextStyle(
                fontSize: 11,
                color: c.isSafe ? IrisTheme.textSecondary : IrisTheme.dangerRed,
                fontWeight: c.isSafe ? FontWeight.w400 : FontWeight.w600,
              ),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${c.distanceKm} km • ${c.etaMinutes} min walk',
                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: IrisTheme.textMuted),
                ),
                if (c.isSafe)
                  GestureDetector(
                    onTap: () {
                      setState(() => _isNavigating = true);
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: IrisTheme.primaryBlue,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text('Start Route', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700)),
                    ),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildShelterCard(ShelterInfo s) {
    const shelterCoords = {
      'SH-01': [9.1890, 76.8180],
      'SH-02': [9.1980, 76.8290],
      'SH-03': [9.1720, 76.8350],
    };
    final coords = shelterCoords[s.id];
    final liveDist = coords != null
        ? _locationService.distanceToKm(coords[0], coords[1])
        : s.distanceKm;

    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: IrisTheme.surfaceCard,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: IrisTheme.borderLight),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  s.name,
                  style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: IrisTheme.textPrimary),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: IrisTheme.safeGreenBg,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '$liveDist km away',
                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: IrisTheme.safeGreen),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(s.address, style: const TextStyle(fontSize: 11, color: IrisTheme.textMuted)),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Capacity: ${s.occupied}/${s.capacity}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: IrisTheme.textSecondary)),
                        Text('${s.availableBeds} beds available', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: IrisTheme.safeGreen)),
                      ],
                    ),
                    const SizedBox(height: 4),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: s.occupancyRate,
                        minHeight: 5,
                        backgroundColor: IrisTheme.borderSubtle,
                        valueColor: AlwaysStoppedAnimation<Color>(
                          s.occupancyRate > 0.8 ? IrisTheme.dangerRed : IrisTheme.primaryBlue,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 6,
            runSpacing: 4,
            children: s.amenities.map((a) {
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: IrisTheme.surfaceMuted,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(a, style: const TextStyle(fontSize: 10, color: IrisTheme.textSecondary)),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}

class _TerrainPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final riverPaint = Paint()
      ..color = const Color(0xFFBAE6FD)
      ..strokeWidth = 14
      ..style = PaintingStyle.stroke;

    final path = Path()
      ..moveTo(0, size.height * 0.4)
      ..cubicTo(size.width * 0.3, size.height * 0.2, size.width * 0.6, size.height * 0.8, size.width, size.height * 0.6);
    canvas.drawPath(path, riverPaint);

    final roadPaint = Paint()
      ..color = const Color(0xFF10B981)
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;

    final roadPath = Path()
      ..moveTo(70, size.height - 40)
      ..lineTo(size.width * 0.5, size.height * 0.35)
      ..lineTo(size.width - 50, 45);
    canvas.drawPath(roadPath, roadPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
