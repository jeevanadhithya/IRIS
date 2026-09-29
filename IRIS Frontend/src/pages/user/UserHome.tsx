import React from 'react';
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
  Alert, 
  AlertTitle 
} from '@mui/material';
import { 
  Shield as ShieldIcon, 
  WarningAmber as WarningIcon, 
  Navigation as NavigationIcon, 
  House as ShelterIcon, 
  ReportProblem as ReportIcon, 
  Emergency as EmergencyIcon, 
  Thermostat as ThermostatIcon, 
  WaterDrop as WaterIcon, 
  Air as AirIcon, 
  LocationOn as LocationIcon,
  CheckCircle as SafeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';

export const UserHome: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, overallRiskLevel, sensors, shelters, incidents, routes } = useIrisStore();

  const primarySensor = sensors[0];
  const nearestShelter = shelters[0];
  const primaryRoute = routes.find(r => r.status === 'RECOMMENDED') || routes[0];

  // Dynamic Safety Status configuration
  const safetyConfig = {
    LOW: { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', label: 'LOW RISK - AREA SECURE', desc: 'No immediate disaster threat detected within your residential sector.' },
    MODERATE: { color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: 'MODERATE RISK - MONITOR CONDITIONS', desc: 'Elevated precipitation and river swell detected. Stay alert for official advisories.' },
    HIGH: { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', label: 'HIGH RISK - PREPARE FOR EVACUATION', desc: 'Active slope instability and water buildup observed within 3.5 km. Review your safe evacuation route.' },
    CRITICAL: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'CRITICAL HAZARD - EVACUATE IMMEDIATELY', desc: 'Severe flash flood and debris obstruction confirmed. Move immediately to nearest shelter.' }
  }[overallRiskLevel] || { color: '#d97706', bg: '#fffbeb', border: '#fde68a', label: 'MODERATE RISK', desc: 'Monitor local conditions.' };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Top Banner: Location & User Greeting */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 1 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            IRIS Safety Portal
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.5 }}>
            <LocationIcon sx={{ fontSize: 16, color: '#0284c7' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
              {currentUser.location?.address || 'Sector 4, Nilgiris District, Tamil Nadu'}
            </Typography>
            <Chip label="LIVE GPS SYNC" size="small" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 700, bgcolor: '#e0f2fe', color: '#0369a1' }} />
          </Box>
        </Box>

        <Button
          variant="contained"
          color="error"
          startIcon={<EmergencyIcon />}
          onClick={() => navigate('/user/need-help')}
          sx={{ fontWeight: 700, bgcolor: '#dc2626', px: 2.5, py: 1, '&:hover': { bgcolor: '#b91c1c' } }}
        >
          I NEED HELP
        </Button>
      </Box>

      {/* CORE "AM I SAFE?" CARD */}
      <Card 
        sx={{ 
          mb: 3, 
          bgcolor: safetyConfig.bg, 
          border: `2px solid ${safetyConfig.border}`, 
          borderRadius: 3,
          p: 1
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box 
                sx={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: '50%', 
                  bgcolor: '#ffffff', 
                  border: `2px solid ${safetyConfig.color}`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: safetyConfig.color
                }}
              >
                {overallRiskLevel === 'LOW' ? <SafeIcon sx={{ fontSize: 32 }} /> : <WarningIcon sx={{ fontSize: 32 }} />}
              </Box>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.08em', color: safetyConfig.color }}>
                  CURRENT COMMUNITY SAFETY ASSESSMENT
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.2 }}>
                  {safetyConfig.label}
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', mt: 0.5, maxWidth: 650 }}>
                  {safetyConfig.desc}
                </Typography>
              </Box>
            </Box>

            <Chip 
              label={`THREAT LEVEL: ${overallRiskLevel}`} 
              sx={{ 
                bgcolor: safetyConfig.color, 
                color: '#ffffff', 
                fontWeight: 800, 
                fontSize: '0.75rem',
                py: 2
              }} 
            />
          </Box>

          <Divider sx={{ my: 2.5, borderColor: safetyConfig.border }} />

          {/* Quick Action Matrix */}
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            IMMEDIATE EMERGENCY ACTIONS
          </Typography>
          <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
            <Grid item xs={6} sm={3}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<WarningIcon />}
                onClick={() => navigate('/user/alerts')}
                sx={{ bgcolor: '#fff', borderColor: '#cbd5e1', color: '#0f172a', fontWeight: 600, py: 1 }}
              >
                View Active Alerts
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<NavigationIcon />}
                onClick={() => navigate('/user/safe-route')}
                sx={{ bgcolor: '#fff', borderColor: '#cbd5e1', color: '#0f172a', fontWeight: 600, py: 1 }}
              >
                Safe Evacuation
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<ShelterIcon />}
                onClick={() => navigate('/user/shelters')}
                sx={{ bgcolor: '#fff', borderColor: '#cbd5e1', color: '#0f172a', fontWeight: 600, py: 1 }}
              >
                Find Shelter
              </Button>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<ReportIcon />}
                onClick={() => navigate('/user/report')}
                sx={{ bgcolor: '#fff', borderColor: '#cbd5e1', color: '#0f172a', fontWeight: 600, py: 1 }}
              >
                Report Hazard
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Grid: Live Environmental Metrics & Nearest Emergency Shelter */}
      <Grid container spacing={3}>
        {/* Environmental Telemetry Snapshot */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    Local Environmental Telemetry
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Station: {primarySensor.name} ({primarySensor.location.area})
                  </Typography>
                </Box>
                <Chip label="PROVENANCE: REAL" size="small" sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontWeight: 700, border: '1px solid #bbf7d0' }} />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <ThermostatIcon sx={{ color: '#dc2626', mb: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Ambient Temp</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>{primarySensor.currentReading.temperature}°C</Typography>
                    <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>Normal</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <WaterIcon sx={{ color: '#0284c7', mb: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Rainfall Rate</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>{primarySensor.currentReading.rainfall} mm/h</Typography>
                    <Typography variant="caption" sx={{ color: '#ea580c', fontWeight: 600 }}>Heavy Rain</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <WaterIcon sx={{ color: '#d97706', mb: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Soil Moisture</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>{primarySensor.currentReading.soilMoisture}%</Typography>
                    <Typography variant="caption" sx={{ color: '#dc2626', fontWeight: 600 }}>High Saturation</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <AirIcon sx={{ color: '#7c3aed', mb: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>PM2.5 Index</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>{primarySensor.currentReading.pm25} µg</Typography>
                    <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>Good</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
                <Button size="small" onClick={() => navigate('/user/conditions')} sx={{ color: '#0284c7', fontWeight: 600 }}>
                  View All Live Conditions →
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Nearest Shelter Card */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                  Nearest Safe Shelter
                </Typography>
                <Chip label={`${nearestShelter.distanceKm} km away`} size="small" sx={{ bgcolor: '#e0f2fe', color: '#0369a1', fontWeight: 700 }} />
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                {nearestShelter.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                {nearestShelter.location.address}
              </Typography>

              {/* Capacity meter */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569' }}>Occupancy Capacity</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    {nearestShelter.occupancy} / {nearestShelter.capacity} beds ({Math.round((nearestShelter.occupancy / nearestShelter.capacity) * 100)}%)
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(nearestShelter.occupancy / nearestShelter.capacity) * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: '#16a34a' } }} 
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                <Chip size="small" label="Medical Available" sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontSize: '0.7rem', fontWeight: 600 }} />
                <Chip size="small" label="Potable Water" sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontSize: '0.7rem', fontWeight: 600 }} />
                <Chip size="small" label="Emergency Food" sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontSize: '0.7rem', fontWeight: 600 }} />
              </Box>

              <Button
                fullWidth
                variant="contained"
                startIcon={<NavigationIcon />}
                onClick={() => navigate('/user/safe-route')}
                sx={{ bgcolor: '#0284c7', fontWeight: 700 }}
              >
                Navigate via Safe Route ({primaryRoute.estimatedTimeMin} min)
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
