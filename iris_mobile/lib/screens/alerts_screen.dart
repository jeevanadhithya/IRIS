import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/hazard_models.dart';
import '../services/api_service.dart';
import '../theme/iris_theme.dart';

class AlertsScreen extends StatefulWidget {
  const AlertsScreen({super.key});

  @override
  State<AlertsScreen> createState() => _AlertsScreenState();
}

class _AlertsScreenState extends State<AlertsScreen> {
  final ApiService _apiService = ApiService();
  List<HazardAlert> _alerts = [];
  bool _isLoading = true;
  String _selectedCategory = 'all';

  final List<Map<String, String>> _categories = [
    {'id': 'all', 'label': 'All Alerts'},
    {'id': 'flood', 'label': 'Floods'},
    {'id': 'landslide', 'label': 'Landslides'},
    {'id': 'fire', 'label': 'Wildfires'},
  ];

  @override
  void initState() {
    super.initState();
    _loadAlerts();
  }

  Future<void> _loadAlerts() async {
    setState(() => _isLoading = true);
    final alerts = await _apiService.getAlerts();
    if (mounted) {
      setState(() {
        _alerts = alerts;
        _isLoading = false;
      });
    }
  }

  List<HazardAlert> get _filteredAlerts {
    if (_selectedCategory == 'all') return _alerts;
    return _alerts.where((a) => a.category.toLowerCase() == _selectedCategory).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: IrisTheme.backgroundWhite,
      appBar: AppBar(
        title: const Text('Early Warnings & Alerts'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded),
            onPressed: _loadAlerts,
            tooltip: 'Refresh Feeds',
          ),
        ],
      ),
      body: Column(
        children: [
          // Filter Chips
          Container(
            height: 48,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _categories.length,
              separatorBuilder: (_, _) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final cat = _categories[index];
                final isSelected = _selectedCategory == cat['id'];
                return ChoiceChip(
                  label: Text(
                    cat['label']!,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                      color: isSelected ? Colors.white : IrisTheme.textPrimary,
                    ),
                  ),
                  selected: isSelected,
                  selectedColor: IrisTheme.primaryBlue,
                  backgroundColor: IrisTheme.surfaceMuted,
                  side: BorderSide(
                    color: isSelected ? IrisTheme.primaryBlue : IrisTheme.borderLight,
                  ),
                  onSelected: (selected) {
                    if (selected) {
                      setState(() => _selectedCategory = cat['id']!);
                    }
                  },
                );
              },
            ),
          ),

          const SizedBox(height: 8),

          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator(color: IrisTheme.primaryBlue))
                : RefreshIndicator(
                    onRefresh: _loadAlerts,
                    color: IrisTheme.primaryBlue,
                    child: ListView(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      children: [
                        if (_filteredAlerts.isEmpty)
                          const Center(
                            child: Padding(
                              padding: EdgeInsets.symmetric(vertical: 40),
                              child: Text(
                                'No alerts active in this category',
                                style: TextStyle(color: IrisTheme.textMuted),
                              ),
                            ),
                          )
                        else
                          ..._filteredAlerts.map((alert) => _buildDetailedAlertCard(alert)),

                        const SizedBox(height: 16),

                        // NDMA Guidelines Expandable Section
                        _buildNDMAGuidelinesCard(),

                        const SizedBox(height: 24),
                      ],
                    ),
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailedAlertCard(HazardAlert alert) {
    Color badgeColor;
    Color badgeBg;
    IconData icon;

    if (alert.severity == 'critical') {
      badgeColor = IrisTheme.dangerRed;
      badgeBg = IrisTheme.dangerRedBg;
      icon = Icons.warning_rounded;
    } else if (alert.severity == 'warning') {
      badgeColor = IrisTheme.warningAmber;
      badgeBg = IrisTheme.warningAmberBg;
      icon = Icons.error_outline_rounded;
    } else {
      badgeColor = IrisTheme.primaryBlue;
      badgeBg = IrisTheme.surfaceMuted;
      icon = Icons.info_outline_rounded;
    }

    final timeStr = DateFormat('hh:mm a').format(alert.timestamp);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: IrisTheme.surfaceCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: badgeColor.withOpacity(0.35), width: 1.2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: badgeBg,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(14),
                topRight: Radius.circular(14),
              ),
            ),
            child: Row(
              children: [
                Icon(icon, color: badgeColor, size: 18),
                const SizedBox(width: 8),
                Text(
                  alert.severity.toUpperCase(),
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: badgeColor,
                    letterSpacing: 0.5,
                  ),
                ),
                const Spacer(),
                Text(
                  timeStr,
                  style: const TextStyle(fontSize: 11, color: IrisTheme.textSecondary, fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  alert.title,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: IrisTheme.textPrimary,
                    height: 1.2,
                  ),
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    const Icon(Icons.location_on_outlined, size: 14, color: IrisTheme.textMuted),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        alert.location,
                        style: const TextStyle(fontSize: 12, color: IrisTheme.textSecondary, fontWeight: FontWeight.w600),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: IrisTheme.surfaceMuted,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(Icons.shield_outlined, size: 16, color: IrisTheme.primaryBlue),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          alert.instruction,
                          style: const TextStyle(
                            fontSize: 12,
                            color: IrisTheme.textPrimary,
                            height: 1.35,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    const Icon(Icons.people_outline, size: 14, color: IrisTheme.textMuted),
                    const SizedBox(width: 4),
                    Text(
                      '~${alert.affectedPopulation} citizens in hazard envelope',
                      style: const TextStyle(fontSize: 11, color: IrisTheme.textMuted),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNDMAGuidelinesCard() {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: IrisTheme.surfaceCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: IrisTheme.borderLight),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Row(
            children: [
              Icon(Icons.menu_book_rounded, color: IrisTheme.primaryBlue, size: 20),
              SizedBox(width: 8),
              Text(
                'NDMA Flash Flood Protocols',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: IrisTheme.textPrimary,
                ),
              ),
            ],
          ),
          SizedBox(height: 10),
          Text('• DO disconnect electrical mains before leaving your residence.', style: TextStyle(fontSize: 12, color: IrisTheme.textSecondary, height: 1.4)),
          Text('• DO move to higher ground / 1st floor immediately.', style: TextStyle(fontSize: 12, color: IrisTheme.textSecondary, height: 1.4)),
          Text('• DO NOT attempt to drive or walk through moving water deeper than 15cm.', style: TextStyle(fontSize: 12, color: IrisTheme.dangerRed, height: 1.4, fontWeight: FontWeight.w600)),
          Text('• DO NOT drink untreated tap water after inundation.', style: TextStyle(fontSize: 12, color: IrisTheme.dangerRed, height: 1.4, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}
