import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/hazard_models.dart';
import '../services/api_service.dart';
import '../services/location_service.dart';
import '../theme/iris_theme.dart';

class CommunityScreen extends StatefulWidget {
  const CommunityScreen({super.key});

  @override
  State<CommunityScreen> createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen> {
  final ApiService _apiService = ApiService();
  final LocationService _locationService = LocationService();
  final List<CommunityReport> _reports = [
    CommunityReport(
      id: 'REP-001',
      title: 'Water overtopping Pamba bridge approach',
      hazardType: 'Flood Inundation',
      description: 'Water has risen about 2 feet over the road near the bridge approach. Cars cannot pass. Only high-axle trucks getting through.',
      location: 'Bridge Approach, Pamba Ward 4',
      timestamp: DateTime.now().subtract(const Duration(minutes: 24)),
      upvotes: 38,
      isVerified: true,
      reporterName: 'K. Rajeev (Ward Volunteer)',
    ),
    CommunityReport(
      id: 'REP-002',
      title: 'Minor landslide debris blocking single lane',
      hazardType: 'Landslide',
      description: 'Boulders and mud rolled onto the left lane coming down the pass. Passable with extreme caution.',
      location: 'NH-183 Milepost 42',
      timestamp: DateTime.now().subtract(const Duration(hours: 1, minutes: 10)),
      upvotes: 19,
      isVerified: true,
      reporterName: 'Anita Menon',
    ),
    CommunityReport(
      id: 'REP-003',
      title: 'High tension electricity wire snapped',
      hazardType: 'Power Hazard',
      description: 'Live wire in waterlogged paddy corner. Electricity board informed, avoid walking in adjacent field.',
      location: 'East Field Junction',
      timestamp: DateTime.now().subtract(const Duration(hours: 2)),
      upvotes: 45,
      isVerified: true,
      reporterName: 'Community Alert Group',
    ),
  ];

  void _showReportDialog() {
    final titleController = TextEditingController();
    final descController = TextEditingController();
    final locController = TextEditingController(
      text: _locationService.currentPosition != null
          ? 'GPS: ${_locationService.latitude.toStringAsFixed(4)}° N, ${_locationService.longitude.toStringAsFixed(4)}° E'
          : '',
    );
    String hazardType = 'Flood Inundation';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: IrisTheme.backgroundWhite,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                top: 20,
                bottom: MediaQuery.of(context).viewInsets.bottom + 24,
              ),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Report Hazard Incident',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: IrisTheme.textPrimary),
                        ),
                        IconButton(
                          icon: const Icon(Icons.close, size: 20),
                          onPressed: () => Navigator.pop(ctx),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    const Text('Incident Type', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: IrisTheme.textSecondary)),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<String>(
                      initialValue: hazardType,
                      decoration: const InputDecoration(contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 10)),
                      items: const [
                        DropdownMenuItem(value: 'Flood Inundation', child: Text('Flood Inundation')),
                        DropdownMenuItem(value: 'Landslide', child: Text('Landslide / Slope Mud')),
                        DropdownMenuItem(value: 'Tree Fall / Road Block', child: Text('Tree Fall / Road Block')),
                        DropdownMenuItem(value: 'Power Hazard', child: Text('Power Line Down')),
                        DropdownMenuItem(value: 'Bridge Cutoff', child: Text('Bridge Cutoff')),
                      ],
                      onChanged: (val) {
                        if (val != null) setModalState(() => hazardType = val);
                      },
                    ),
                    const SizedBox(height: 12),
                    const Text('Brief Headline', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: IrisTheme.textSecondary)),
                    const SizedBox(height: 6),
                    TextField(
                      controller: titleController,
                      decoration: const InputDecoration(hintText: 'e.g. Water reached shop entrances'),
                    ),
                    const SizedBox(height: 12),
                    const Text('Location', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: IrisTheme.textSecondary)),
                    const SizedBox(height: 6),
                    TextField(
                      controller: locController,
                      decoration: InputDecoration(
                        hintText: 'Landmark, ward number or GPS',
                        suffixIcon: IconButton(
                          icon: const Icon(Icons.my_location, size: 18, color: IrisTheme.primaryBlue),
                          tooltip: 'Fetch Live GPS',
                          onPressed: () async {
                            final pos = await _locationService.refreshLocation();
                            if (pos != null) {
                              locController.text = 'GPS: ${pos.latitude.toStringAsFixed(4)}° N, ${pos.longitude.toStringAsFixed(4)}° E';
                            }
                          },
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text('Description', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: IrisTheme.textSecondary)),
                    const SizedBox(height: 6),
                    TextField(
                      controller: descController,
                      maxLines: 3,
                      decoration: const InputDecoration(hintText: 'Describe severity, water depth, or blocked vehicles...'),
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () async {
                          if (titleController.text.trim().isEmpty) return;

                          final newRep = CommunityReport(
                            id: 'REP-${DateTime.now().millisecondsSinceEpoch}',
                            title: titleController.text.trim(),
                            hazardType: hazardType,
                            description: descController.text.trim(),
                            location: locController.text.trim().isNotEmpty ? locController.text.trim() : 'Local Ward',
                            timestamp: DateTime.now(),
                            upvotes: 1,
                            isVerified: false,
                            reporterName: 'You (Citizen Report)',
                          );

                          await _apiService.submitCommunityReport(newRep);

                          if (mounted) {
                            setState(() {
                              _reports.insert(0, newRep);
                            });
                          }

                          if (ctx.mounted) {
                            Navigator.pop(ctx);
                          }

                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Report submitted! Authority node notified.'),
                                backgroundColor: IrisTheme.safeGreen,
                              ),
                            );
                          }
                        },
                        child: const Text('SUBMIT HAZARD REPORT'),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: IrisTheme.backgroundWhite,
      appBar: AppBar(
        title: const Text('Community Incident Intel'),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showReportDialog,
        backgroundColor: IrisTheme.primaryBlue,
        icon: const Icon(Icons.add_a_photo_outlined, color: Colors.white, size: 20),
        label: const Text('Report Hazard', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.only(left: 16, right: 16, top: 12, bottom: 80),
        itemCount: _reports.length,
        itemBuilder: (context, index) {
          final rep = _reports[index];
          return _buildReportCard(rep);
        },
      ),
    );
  }

  Widget _buildReportCard(CommunityReport rep) {
    final timeStr = DateFormat('hh:mm a').format(rep.timestamp);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
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
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: IrisTheme.primaryBlue.withOpacity(0.08),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  rep.hazardType,
                  style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: IrisTheme.primaryBlue),
                ),
              ),
              const SizedBox(width: 8),
              if (rep.isVerified)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: IrisTheme.safeGreenBg,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Row(
                    children: const [
                      Icon(Icons.verified, size: 11, color: IrisTheme.safeGreen),
                      SizedBox(width: 3),
                      Text('Authority Verified', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: IrisTheme.safeGreen)),
                    ],
                  ),
                ),
              const Spacer(),
              Text(timeStr, style: const TextStyle(fontSize: 11, color: IrisTheme.textMuted)),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            rep.title,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: IrisTheme.textPrimary),
          ),
          const SizedBox(height: 4),
          Row(
            children: [
              const Icon(Icons.location_on, size: 12, color: IrisTheme.textMuted),
              const SizedBox(width: 4),
              Text(rep.location, style: const TextStyle(fontSize: 11, color: IrisTheme.textSecondary, fontWeight: FontWeight.w500)),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            rep.description,
            style: const TextStyle(fontSize: 12, color: IrisTheme.textSecondary, height: 1.35),
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Reported by ${rep.reporterName}',
                style: const TextStyle(fontSize: 11, fontStyle: FontStyle.italic, color: IrisTheme.textMuted),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: IrisTheme.surfaceMuted,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.thumb_up_alt_outlined, size: 13, color: IrisTheme.textSecondary),
                    const SizedBox(width: 4),
                    Text('${rep.upvotes}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: IrisTheme.textSecondary)),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
