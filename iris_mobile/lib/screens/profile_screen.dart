import 'package:flutter/material.dart';
import '../theme/iris_theme.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _offlineCacheEnabled = true;
  bool _pushNotifications = true;
  String _selectedLanguage = 'English';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: IrisTheme.backgroundWhite,
      appBar: AppBar(
        title: const Text('Citizen Profile & Safety ID'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // User Header Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: IrisTheme.surfaceCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: IrisTheme.borderLight),
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 28,
                    backgroundColor: IrisTheme.primaryBlue.withOpacity(0.12),
                    child: const Text('JD', style: TextStyle(color: IrisTheme.primaryBlue, fontWeight: FontWeight.w800, fontSize: 18)),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Jeeva & Family', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: IrisTheme.textPrimary)),
                        SizedBox(height: 2),
                        Text('+91 98765 43210 • Ward 4, Kallada', style: TextStyle(fontSize: 12, color: IrisTheme.textSecondary)),
                        SizedBox(height: 4),
                        Text('Emergency ID: IRIS-CITIZEN-9421', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: IrisTheme.primaryBlue)),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Emergency Medical ICE Profile
            _buildSectionHeader('Emergency Medical & ICE Information'),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: IrisTheme.surfaceCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: IrisTheme.borderLight),
              ),
              child: Column(
                children: [
                  _buildProfileRow('Blood Group', 'O Positive (O+)'),
                  const Divider(),
                  _buildProfileRow('Allergies / Critical Meds', 'Asthma Inhaler Required'),
                  const Divider(),
                  _buildProfileRow('Primary ICE Contact', 'Dr. Radhakrishnan (+91 94470 12345)'),
                  const Divider(),
                  _buildProfileRow('Family Evacuation Point', 'St. Mary High School Complex'),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Network & Offline Cache
            _buildSectionHeader('Resilience & Mesh Settings'),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: IrisTheme.surfaceCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: IrisTheme.borderLight),
              ),
              child: Column(
                children: [
                  SwitchListTile.adaptive(
                    contentPadding: EdgeInsets.zero,
                    title: const Text('Offline Safe Route Maps', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
                    subtitle: const Text('Cache shelter corridors for zero-internet connectivity', style: TextStyle(fontSize: 11, color: IrisTheme.textMuted)),
                    value: _offlineCacheEnabled,
                    activeColor: IrisTheme.primaryBlue,
                    onChanged: (val) => setState(() => _offlineCacheEnabled = val),
                  ),
                  const Divider(),
                  SwitchListTile.adaptive(
                    contentPadding: EdgeInsets.zero,
                    title: const Text('Critical Siren / Cell Broadcast Alerts', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
                    subtitle: const Text('Override silent mode during severe flood or landslide flash warnings', style: TextStyle(fontSize: 11, color: IrisTheme.textMuted)),
                    value: _pushNotifications,
                    activeColor: IrisTheme.primaryBlue,
                    onChanged: (val) => setState(() => _pushNotifications = val),
                  ),
                  const Divider(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Language / ഭാഷ / भाषा', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700)),
                      DropdownButton<String>(
                        value: _selectedLanguage,
                        underline: const SizedBox(),
                        items: const [
                          DropdownMenuItem(value: 'English', child: Text('English', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                          DropdownMenuItem(value: 'Malayalam', child: Text('മലയാളം', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                          DropdownMenuItem(value: 'Hindi', child: Text('हिन्दी', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                          DropdownMenuItem(value: 'Tamil', child: Text('தமிழ்', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                        ],
                        onChanged: (val) {
                          if (val != null) setState(() => _selectedLanguage = val);
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // SIH 26178 Compliance Card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: IrisTheme.surfaceMuted,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: IrisTheme.borderLight),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Smart India Hackathon 2026 • Problem Statement 26178',
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: IrisTheme.primaryBlue),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'AI-powered environmental monitoring network with localized intelligence, IoT early warning, and cloud-edge resilience.',
                    style: TextStyle(fontSize: 11, color: IrisTheme.textSecondary, height: 1.3),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Text(
      title,
      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: IrisTheme.textPrimary, letterSpacing: -0.2),
    );
  }

  Widget _buildProfileRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 12, color: IrisTheme.textMuted)),
          Text(value, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: IrisTheme.textPrimary)),
        ],
      ),
    );
  }
}
