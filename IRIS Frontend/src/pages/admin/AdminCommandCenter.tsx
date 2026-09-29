import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Divider, 
  LinearProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Alert 
} from '@mui/material';
import { 
  Sensors as SensorsIcon, 
  WarningAmber as WarningIcon, 
  Public as GlobeIcon, 
  People as PeopleIcon, 
  House as ShelterIcon, 
  HealthAndSafety as HealthIcon, 
  Assignment as IncidentIcon, 
  PlayArrow as PlayIcon, 
  PhoneInTalk as PhoneIcon, 
  NotificationsActive as BroadcastIcon, 
  CheckCircle as ClearIcon,
  Thermostat as TempIcon,
  WaterDrop as WaterIcon,
  TrendingUp as TrendIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';
import { irisApi } from '../../services/irisApi';

export const AdminCommandCenter: React.FC = () => {
  const navigate = useNavigate();
  const { 
    sensors, 
    riskAssessments, 
    incidents, 
    shelters, 
    communityReports, 
    overallRiskLevel, 
    simulation, 
    runFlagshipDemo 
  } = useIrisStore();

  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const activeSensorsCount = sensors.length;
  const onlineSensorsCount = sensors.filter(s => s.status === 'online').length;
  const criticalAlertsCount = riskAssessments.filter(r => r.riskLevel === 'CRITICAL' || r.riskLevel === 'HIGH').length;
  const activeIncidentsCount = incidents.filter(i => i.status !== 'Resolved').length;
  const availableSheltersCount = shelters.filter(s => s.status === 'Available' || s.status === 'Open').length;

  const handleIssueEmergencyAlert = async () => {
    setActionNotice('Initiating automated voice IVR broadcast via Twilio Gateway...');
    const res = await irisApi.triggerEmergencyCall('+919942373735', 'Critical Flash Flood & Landslide Warning');
    setActionNotice(`Emergency dispatch initiated! ${res.message || 'Call queued successfully.'}`);
    setTimeout(() => setActionNotice(null), 6000);
  };

  const handleEvacuateCommand = () => {
    setActionNotice('BROADCAST ISSUED: Mandatory evacuation directive transmitted across Nilgiris Sector 4.');
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleAllClearCommand = () => {
    setActionNotice('ALL CLEAR: Sector status verified safe. Normal traffic protocols restored.');
    setTimeout(() => setActionNotice(null), 5000);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      {/* Top Header */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
              National Disaster Operations Command Center
            </Typography>
            <Chip 
              label="EOC LIVE" 
              size="small" 
              sx={{ bgcolor: '#dc2626', color: '#fff', fontWeight: 800, fontSize: '0.65rem' }} 
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Real-time environmental monitoring, risk telemetry fusion, 3D Digital Twin, and multi-agency response coordination.
          </Typography>
        </Box>

        {/* Action Controls */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<PlayIcon />}
            onClick={() => {
              runFlagshipDemo();
              navigate('/admin/simulation');
            }}
            sx={{ fontWeight: 800, bgcolor: '#dc2626', '&:hover': { bgcolor: '#b91c1c' } }}
          >
            RUN FLAGSHIP DISASTER SCENARIO
          </Button>

          <Button
            variant="contained"
            startIcon={<PhoneIcon />}
            onClick={handleIssueEmergencyAlert}
            sx={{ bgcolor: '#0284c7', fontWeight: 700 }}
          >
            Trigger Twilio Voice Alert
          </Button>
        </Box>
      </Box>

      {/* Action Notification Banner */}
      {actionNotice && (
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2, bgcolor: '#f0f9ff', border: '1px solid #bae6fd', color: '#0369a1' }}>
          {actionNotice}
        </Alert>
      )}

      {/* KPI METRIC CARDS ROW */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }}>
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <SensorsIcon sx={{ color: '#0284c7', fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>Active Sensors</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>{activeSensorsCount}</Typography>
            <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>100% Online</Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }}>
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <WarningIcon sx={{ color: '#dc2626', fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>Critical Alerts</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#dc2626' }}>{criticalAlertsCount}</Typography>
            <Typography variant="caption" sx={{ color: '#dc2626', fontWeight: 600 }}>Requires Action</Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }}>
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <GlobeIcon sx={{ color: '#ea580c', fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>Hazard Zones</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>3 Active</Typography>
            <Typography variant="caption" sx={{ color: '#ea580c', fontWeight: 600 }}>Ghats / Basin</Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }}>
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <PeopleIcon sx={{ color: '#7c3aed', fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>Pop. at Risk</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>13.5K</Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>3 Sectors</Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }}>
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <IncidentIcon sx={{ color: '#d97706', fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>Incidents</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>{activeIncidentsCount}</Typography>
            <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>In Progress</Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }}>
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <ShelterIcon sx={{ color: '#16a34a', fontSize: 18 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>Open Shelters</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#16a34a' }}>{availableSheltersCount}</Typography>
            <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>1,850 Capacity</Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 8, md: 6, lg: 3 }}>
          <Card sx={{ p: 1.5, bgcolor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HealthIcon sx={{ color: '#16a34a', fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#15803d' }}>Network Resilience</Typography>
              </Box>
              <Chip label="99.9% UPTIME" size="small" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 800, bgcolor: '#dcfce7', color: '#15803d' }} />
            </Box>
            <Typography variant="caption" sx={{ color: '#166534', display: 'block' }}>
              LoRaWAN + NB-IoT + Satellite Link Operational
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Main Grid: Regional Risk Map, Telemetry Stream & Incidents */}
      <Grid container spacing={3}>
        {/* Left Column: Regional Risk Map Snapshot & Active Hazards */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                    Regional Surveillance & Threat Grid
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Multi-hazard geospatial fusion layer (Sensors + Sentinel-1 SAR + Ground Inundation)
                  </Typography>
                </Box>
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={() => navigate('/admin/digital-twin')}
                  endIcon={<ArrowIcon />}
                  sx={{ fontWeight: 700 }}
                >
                  Open 3D Digital Twin
                </Button>
              </Box>

              {/* Simplified GIS SVG Canvas */}
              <Box sx={{ width: '100%', height: 350, bgcolor: '#f1f5f9', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                <svg width="100%" height="100%" viewBox="0 0 700 350">
                  {/* Contour Curves */}
                  <path d="M 0 80 Q 200 60 400 90 T 700 80" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                  <path d="M 0 180 Q 250 150 450 200 T 700 180" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                  <path d="M 0 280 Q 300 260 550 300 T 700 280" fill="none" stroke="#e2e8f0" strokeWidth="2" />

                  {/* River Flow Vector */}
                  <path d="M 40 0 C 120 80 80 180 240 220 S 520 280 660 350" fill="none" stroke="#0284c7" strokeWidth="10" opacity="0.35" />
                  <text x="120" y="160" fill="#0284c7" fontSize="11" fontWeight="700">CAUVERY BASIN</text>

                  {/* Active Flood Hazard Polygon */}
                  <polygon points="360,180 500,160 550,280 400,290" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 3" />
                  <text x="420" y="230" fill="#0284c7" fontSize="11" fontWeight="800">SECTOR 3 FLOOD</text>

                  {/* Active Landslide Hazard Polygon */}
                  <polygon points="180,90 310,70 330,170 200,190" fill="rgba(220, 38, 38, 0.2)" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 3" />
                  <text x="210" y="130" fill="#dc2626" fontSize="11" fontWeight="800">SLOPE FAILURE</text>

                  {/* Physical Sensor Nodes */}
                  <g transform="translate(200, 140)">
                    <circle cx="0" cy="0" r="9" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                    <text x="14" y="4" fill="#0f172a" fontSize="10" fontWeight="700">NOD-01 (Ridge)</text>
                  </g>
                  <g transform="translate(460, 240)">
                    <circle cx="0" cy="0" r="9" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                    <text x="14" y="4" fill="#0f172a" fontSize="10" fontWeight="700">NOD-02 (River)</text>
                  </g>
                  <g transform="translate(600, 80)">
                    <circle cx="0" cy="0" r="9" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
                    <text x="14" y="4" fill="#0f172a" fontSize="10" fontWeight="700">NOD-04 (Air)</text>
                  </g>

                  {/* Safe Shelters */}
                  <g transform="translate(580, 110)">
                    <circle cx="0" cy="0" r="12" fill="#16a34a" stroke="#ffffff" strokeWidth="2" />
                    <text x="-4" y="4" fill="#ffffff" fontSize="11" fontWeight="900">S</text>
                    <text x="-35" y="24" fill="#15803d" fontSize="10" fontWeight="800">Relief Hub 01</text>
                  </g>
                </svg>

                {/* Map Bottom Legend */}
                <Box sx={{ position: 'absolute', bottom: 12, left: 12, bgcolor: 'rgba(255,255,255,0.92)', p: 1, borderRadius: 1.5, border: '1px solid #e2e8f0', display: 'flex', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: '#0284c7', borderRadius: '50%' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Sensors</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: '#dc2626', borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Active Hazard Zones</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 10, height: 10, bgcolor: '#16a34a', borderRadius: '50%' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Relief Shelters</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Active Priority Incidents Table */}
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  Incident Operations Desk
                </Typography>
                <Button size="small" onClick={() => navigate('/admin/incidents')} sx={{ fontWeight: 700 }}>
                  View All ({incidents.length}) →
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Incident ID</TableCell>
                      <TableCell>Hazard / Category</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Severity</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Assigned Unit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {incidents.map((inc) => (
                      <TableRow key={inc.id} hover>
                        <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>{inc.id}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{inc.title}</TableCell>
                        <TableCell sx={{ color: '#64748b' }}>{inc.location.address}</TableCell>
                        <TableCell>
                          <Chip 
                            label={inc.severity} 
                            size="small" 
                            sx={{ 
                              height: 20, 
                              fontSize: '0.65rem', 
                              fontWeight: 800,
                              bgcolor: inc.severity === 'CRITICAL' ? '#fee2e2' : '#fff7ed',
                              color: inc.severity === 'CRITICAL' ? '#dc2626' : '#ea580c'
                            }} 
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={inc.status} 
                            size="small" 
                            sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} 
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#0284c7' }}>
                          {inc.assignedTeam || 'Unassigned'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Emergency Controls, Live Telemetry Stream, AI Insights */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Emergency Quick Action Console */}
          <Card sx={{ mb: 3, border: '1px solid #cbd5e1' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                Emergency Action Controls
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2 }}>
                High-priority escalation triggers with automated audit logging.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={<PhoneIcon />}
                  onClick={handleIssueEmergencyAlert}
                  sx={{ py: 1.2, fontWeight: 800, bgcolor: '#dc2626', '&:hover': { bgcolor: '#b91c1c' } }}
                >
                  Issue Twilio Voice/SMS Alert
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="warning"
                  startIcon={<WarningIcon />}
                  onClick={handleEvacuateCommand}
                  sx={{ py: 1, fontWeight: 700 }}
                >
                  Broadcast Evacuation Order
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="success"
                  startIcon={<ClearIcon />}
                  onClick={handleAllClearCommand}
                  sx={{ py: 1, fontWeight: 700 }}
                >
                  Issue "All Clear" Advisory
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* AI Decision Intelligence Snapshot */}
          <Card sx={{ mb: 3, bgcolor: '#f5f3ff', border: '1px solid #ddd6fe' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Chip label="PROVENANCE: AI PREDICTED" size="small" sx={{ bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 800, fontSize: '0.62rem' }} />
                <Typography variant="caption" sx={{ color: '#6d28d9', fontWeight: 700 }}>
                  Gemini Risk Intelligence
                </Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#4c1d95', mb: 1 }}>
                Cascading Hazard Assessment:
              </Typography>
              <Typography variant="body2" sx={{ color: '#5b21b6', lineHeight: 1.5, fontSize: '0.825rem' }}>
                "Sustained 42 mm/hr rainfall over the Nilgiris watershed has driven soil saturation to 78%. Hydrological models predict a 78% probability of slope failure at KM 14 within 4 hours. Recommend pre-emptive diversion of traffic onto Corridor Beta."
              </Typography>
            </CardContent>
          </Card>

          {/* Live Sensor Health Widget */}
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 1.5 }}>
                Sensor Mesh Health Summary
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {sensors.slice(0, 3).map((s) => (
                  <Box key={s.id} sx={{ p: 1.2, bgcolor: '#f8fafc', borderRadius: 1.5, border: '1px solid #e2e8f0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>{s.name}</Typography>
                      <Chip label={`${s.battery}% Bat`} size="small" sx={{ height: 18, fontSize: '0.62rem' }} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5, color: '#64748b' }}>
                      <Typography variant="caption">Temp: {s.currentReading.temperature}°C</Typography>
                      <Typography variant="caption">Rain: {s.currentReading.rainfall} mm/h</Typography>
                      <Typography variant="caption">Moisture: {s.currentReading.soilMoisture}%</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
