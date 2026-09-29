import 'package:flutter/material.dart';
import '../models/hazard_models.dart';
import '../services/api_service.dart';
import '../services/location_service.dart';
import '../theme/iris_theme.dart';

class HomeScreen extends StatefulWidget {
  final Function(int) onNavigateTab;

  const HomeScreen({super.key, required this.onNavigateTab});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService _apiService = ApiService();
  final LocationService _locationService = LocationService();
  SensorTelemetry? _telemetry;
  List<HazardAlert> _alerts = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _locationService.addListener(_onLocationUpdate);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        _locationService.init();
        _loadData();
      }
    });
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

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    final telemetry = await _apiService.getTelemetry();
    final alerts = await _apiService.getAlerts();
    if (mounted) {
      setState(() {
        _telemetry = telemetry;
        _alerts = alerts;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: IrisTheme.backgroundWhite,
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: IrisTheme.primaryBlue.withOpacity(0.3), width: 1.5),
                image: const DecorationImage(
                  image: AssetImage('assets/images/iris_logo.png'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'I R I S',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.w900, letterSpacing: 2.0, color: IrisTheme.textPrimary),
                ),
                Text(
                  'SIH-26178 • Hazard Node 04',
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w500, color: IrisTheme.textSecondary),
                ),
              ],
            ),
          ],
        ),
        actions: [
          GestureDetector(
            onTap: () => _locationService.refreshLocation(),
            child: Container(
              margin: const EdgeInsets.only(right: 12),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: _locationService.hasPermission ? IrisTheme.safeGreenBg : IrisTheme.surfaceMuted,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: _locationService.hasPermission 
                      ? IrisTheme.safeGreen.withOpacity(0.4) 
                      : IrisTheme.borderLight,
                ),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.my_location,
                    size: 13,
                    color: _locationService.hasPermission ? IrisTheme.safeGreen : IrisTheme.primaryBlue,
                  ),
                  const SizedBox(width: 5),
                  Text(
                    _locationService.isLoading 
                        ? 'Locating...' 
                        : _locationService.currentAreaName,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      color: _locationService.hasPermission ? IrisTheme.safeGreen : IrisTheme.textPrimary,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _loadData,
        color: IrisTheme.primaryBlue,
        child: _isLoading
            ? const Center(child: CircularProgressIndicator(color: IrisTheme.primaryBlue))
            : SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Am I Safe Status Card
                    _buildAmISafeCard(),

                    const SizedBox(height: 16),

                    // Quick Emergency Action Matrix
                    _buildQuickActionMatrix(),

                    const SizedBox(height: 20),

                    // Section: Distributed Sensor Telemetry
                    _buildSectionHeader(
                      title: 'Live Sensor Telemetry',
                      subtitle: 'Distributed Edge AI monitoring nodes',
                      actionText: 'View Details',
                      onActionTap: () => widget.onNavigateTab(2), // Evac & Sensor Map
                    ),

                    const SizedBox(height: 10),

                    _buildTelemetryGrid(),

                    const SizedBox(height: 20),

                    // Section: Active Critical Warnings
                    _buildSectionHeader(
                      title: 'Active Hazard Warnings',
                      subtitle: '${_alerts.length} active advisories in your sector',
                      actionText: 'See All',
                      onActionTap: () => widget.onNavigateTab(1), // Alerts tab
                    ),

                    const SizedBox(height: 10),

                    ..._alerts.take(2).map((alert) => _buildAlertItem(alert)),

                    const SizedBox(height: 20),

                    // Safety Checklist Banner
                    _buildPreparednessCard(),

                    const SizedBox(height: 32),
                  ],
                ),
              ),
      ),
    );
  }

  Widget _buildAmISafeCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: IrisTheme.warningAmberBg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: IrisTheme.warningAmber.withOpacity(0.35), width: 1.2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: IrisTheme.warningAmber.withOpacity(0.18),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.warning_amber_rounded, color: IrisTheme.warningAmber, size: 24),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Text(
                          'Am I Safe?',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: IrisTheme.textSecondary,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: IrisTheme.warningAmber,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text(
                            'ALERT ZONE',
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w800,
                              color: Colors.white,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      'High Flood Risk Warning',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w800,
                        color: IrisTheme.textPrimary,
                        letterSpacing: -0.3,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            'Basin water level has reached 87% capacity. High-priority evacuation advisory active for riverbank wards 3 & 4.',
            style: const TextStyle(
              fontSize: 13,
              height: 1.4,
              color: IrisTheme.textSecondary,
            ),
          ),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: IrisTheme.borderLight),
            ),
            child: Row(
              children: [
                const Icon(Icons.gps_fixed, size: 14, color: IrisTheme.safeGreen),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    _locationService.currentPosition != null
                        ? 'Live GPS: ${_locationService.latitude.toStringAsFixed(4)}° N, ${_locationService.longitude.toStringAsFixed(4)}° E • River Influx: ${_locationService.distanceToKm(9.1865, 76.8142)} km'
                        : 'Location: Acquiring live satellite fix...',
                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: IrisTheme.textPrimary),
                  ),
                ),
                if (!_locationService.hasPermission)
                  GestureDetector(
                    onTap: () => _locationService.refreshLocation(),
                    child: const Text('ALLOW GPS', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: IrisTheme.primaryBlue)),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () => widget.onNavigateTab(2), // Map
                  icon: const Icon(Icons.navigation_rounded, size: 16),
                  label: const Text('View Safe Route'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: IrisTheme.warningAmber,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 10),
                  ),
                ),
              ),
              const SizedBox(width: 10),
              OutlinedButton.icon(
                onPressed: () => widget.onNavigateTab(3), // SOS
                icon: const Icon(Icons.sos_rounded, color: IrisTheme.dangerRed, size: 18),
                label: const Text('SOS', style: TextStyle(color: IrisTheme.dangerRed)),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: IrisTheme.dangerRed, width: 1.5),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActionMatrix() {
    return Row(
      children: [
        _buildActionTile(
          icon: Icons.sos_rounded,
          label: 'Emergency SOS',
          color: IrisTheme.dangerRed,
          bgColor: IrisTheme.dangerRedBg,
          onTap: () => widget.onNavigateTab(3),
        ),
        const SizedBox(width: 10),
        _buildActionTile(
          icon: Icons.alt_route_rounded,
          label: 'Safe Corridors',
          color: IrisTheme.primaryBlue,
          bgColor: IrisTheme.surfaceMuted,
          onTap: () => widget.onNavigateTab(2),
        ),
        const SizedBox(width: 10),
        _buildActionTile(
          icon: Icons.night_shelter_outlined,
          label: 'Shelters',
          color: IrisTheme.safeGreen,
          bgColor: IrisTheme.safeGreenBg,
          onTap: () => widget.onNavigateTab(2),
        ),
        const SizedBox(width: 10),
        _buildActionTile(
          icon: Icons.campaign_outlined,
          label: 'Report Issue',
          color: IrisTheme.warningAmber,
          bgColor: IrisTheme.warningAmberBg,
          onTap: () => widget.onNavigateTab(4),
        ),
      ],
    );
  }

  Widget _buildActionTile({
    required IconData icon,
    required String label,
    required Color color,
    required Color bgColor,
    required VoidCallback onTap,
  }) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 6),
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: IrisTheme.borderLight),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, color: color, size: 24),
              const SizedBox(height: 6),
              Text(
                label,
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: IrisTheme.textPrimary,
                  height: 1.1,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionHeader({
    required String title,
    required String subtitle,
    required String actionText,
    required VoidCallback onActionTap,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w800,
                color: IrisTheme.textPrimary,
                letterSpacing: -0.2,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              subtitle,
              style: const TextStyle(
                fontSize: 12,
                color: IrisTheme.textMuted,
              ),
            ),
          ],
        ),
        GestureDetector(
          onTap: onActionTap,
          child: Text(
            actionText,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w700,
              color: IrisTheme.primaryBlue,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildTelemetryGrid() {
    final t = _telemetry;
    if (t == null) return const SizedBox.shrink();

    return GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      childAspectRatio: 1.25,
      children: [
        _buildTelemetryCard(
          title: 'River Stage',
          value: '${t.riverStageMeters.toStringAsFixed(2)} m',
          subtitle: 'Danger mark: 5.50 m',
          ratio: t.riverCapacityPercent,
          color: IrisTheme.dangerRed,
          icon: Icons.water_rounded,
        ),
        _buildTelemetryCard(
          title: '24h Rainfall',
          value: '${t.rainfall24hMm.toStringAsFixed(1)} mm',
          subtitle: t.rainfallStatus,
          ratio: (t.rainfall24hMm / 120.0).clamp(0.0, 1.0),
          color: IrisTheme.warningAmber,
          icon: Icons.umbrella_rounded,
        ),
        _buildTelemetryCard(
          title: 'Pore Pressure',
          value: '${t.porePressureKPa.toStringAsFixed(1)} kPa',
          subtitle: 'Slope risk: Elevated',
          ratio: (t.porePressureKPa / 60.0).clamp(0.0, 1.0),
          color: IrisTheme.warningAmber,
          icon: Icons.landscape_rounded,
        ),
        _buildTelemetryCard(
          title: 'Air Quality (AQI)',
          value: '${t.aqi}',
          subtitle: 'Moderate Haziness',
          ratio: (t.aqi / 300.0).clamp(0.0, 1.0),
          color: IrisTheme.safeGreen,
          icon: Icons.air_rounded,
        ),
      ],
    );
  }

  Widget _buildTelemetryCard({
    required String title,
    required String value,
    required String subtitle,
    required double ratio,
    required Color color,
    required IconData icon,
  }) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: IrisTheme.surfaceCard,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: IrisTheme.borderLight),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: IrisTheme.textSecondary,
                ),
              ),
              Icon(icon, size: 16, color: color),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                value,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: IrisTheme.textPrimary,
                  letterSpacing: -0.3,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: const TextStyle(
                  fontSize: 11,
                  color: IrisTheme.textMuted,
                ),
              ),
            ],
          ),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: ratio,
              minHeight: 5,
              backgroundColor: IrisTheme.borderSubtle,
              valueColor: AlwaysStoppedAnimation<Color>(color),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAlertItem(HazardAlert alert) {
    Color badgeColor;
    Color badgeBg;
    if (alert.severity == 'critical') {
      badgeColor = IrisTheme.dangerRed;
      badgeBg = IrisTheme.dangerRedBg;
    } else if (alert.severity == 'warning') {
      badgeColor = IrisTheme.warningAmber;
      badgeBg = IrisTheme.warningAmberBg;
    } else {
      badgeColor = IrisTheme.primaryBlue;
      badgeBg = IrisTheme.surfaceMuted;
    }

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
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: badgeBg,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: badgeColor.withOpacity(0.3)),
                ),
                child: Text(
                  alert.severity.toUpperCase(),
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w800,
                    color: badgeColor,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  alert.title,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: IrisTheme.textPrimary,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            alert.instruction,
            style: const TextStyle(
              fontSize: 12,
              color: IrisTheme.textSecondary,
              height: 1.35,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPreparednessCard() {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: IrisTheme.surfaceMuted,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: IrisTheme.borderLight),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: IrisTheme.primaryBlue.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.backpack_rounded, color: IrisTheme.primaryBlue, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Emergency Go-Bag Check',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: IrisTheme.textPrimary,
                  ),
                ),
                SizedBox(height: 2),
                Text(
                  'Keep ID documents, medicines, drinking water, and flashlight accessible.',
                  style: TextStyle(
                    fontSize: 11,
                    color: IrisTheme.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
