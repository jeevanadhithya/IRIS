import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Grid, 
  Tabs, 
  Tab, 
  Divider, 
  Alert, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import { 
  WarningAmber as WarningIcon, 
  Navigation as NavigationIcon, 
  House as ShelterIcon, 
  Share as ShareIcon, 
  LocationOn as LocationIcon, 
  AccessTime as TimeIcon,
  CheckCircleOutline as CheckIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';

export const UserAlerts: React.FC = () => {
  const navigate = useNavigate();
  const { overallRiskLevel, riskAssessments, simulation } = useIrisStore();
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const alerts = [
    {
      id: 'ALT-2026-091',
      hazard: 'FLASH FLOOD & RIVER SURGE',
      severity: 'CRITICAL',
      location: 'Cauvery River Basin - Sector 3 Lowlands',
      distanceKm: 2.1,
      time: '8 mins ago',
      explanation: 'Continuous 85mm/hr torrential rain has caused localized damming. Rapid water level rise of 1.4m exceeds riverbank threshold.',
      recommendedAction: 'Evacuate immediately to designated relief shelters on high ground. Avoid all river cross-bunds and bridges.',
      source: simulation.active ? 'SIMULATION' : 'REAL'
    },
    {
      id: 'ALT-2026-092',
      hazard: 'LANDSLIDE & DEBRIS FLOW WARNING',
      severity: 'HIGH',
      location: 'Ooty-Coonoor Ghat Corridor (KM 14 to 19)',
      distanceKm: 4.8,
      time: '24 mins ago',
      explanation: 'Geotechnical inclinometers indicate 3.4° ground tilt with soil saturation at 88%. Road fractures detected across State Highway 17.',
      recommendedAction: 'Highway 17 closed to vehicular traffic. Use Corridor Beta via Ridge Bypass.',
      source: 'REAL'
    },
    {
      id: 'ALT-2026-093',
      hazard: 'INDUSTRIAL CHEMICAL & AIR TOXICITY',
      severity: 'MODERATE',
      location: 'Manali Industrial Belt Downwind Zone',
      distanceKm: 18.5,
      time: '1 hour ago',
      explanation: 'VOC gas concentrations elevated to 14 ppm alongside PM2.5 spike to 88 µg/m³ due to atmospheric thermal inversion.',
      recommendedAction: 'Residents within 3 km downwind should keep windows closed, wear N95 filtration masks, and avoid strenuous outdoor activity.',
      source: 'REAL'
    }
  ];

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity === filterSeverity;
  });

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Active Safety Alerts & Warnings
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Official early warnings, localized hazard explanations, and actionable protection directives.
        </Typography>
      </Box>

      {/* Critical Banner if High/Critical */}
      {(overallRiskLevel === 'HIGH' || overallRiskLevel === 'CRITICAL') && (
        <Alert 
          severity="error" 
          variant="filled"
          sx={{ mb: 3, borderRadius: 2.5, fontWeight: 600, bgcolor: '#dc2626' }}
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/user/safe-route')} sx={{ fontWeight: 700 }}>
              OPEN SAFE ROUTE
            </Button>
          }
        >
          CRITICAL HAZARD ADVISORY IN YOUR REGION: Multiple severe environmental risks active within a 5 km radius.
        </Alert>
      )}

      {/* Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#e2e8f0', mb: 3 }}>
        <Tabs 
          value={filterSeverity} 
          onChange={(_, val) => setFilterSeverity(val)} 
          textColor="primary"
          indicatorColor="primary"
          sx={{ minHeight: 42 }}
        >
          <Tab value="ALL" label="All Alerts (3)" sx={{ fontWeight: 700, fontSize: '0.8rem' }} />
          <Tab value="CRITICAL" label="Critical (1)" sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#dc2626' }} />
          <Tab value="HIGH" label="High Priority (1)" sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#ea580c' }} />
          <Tab value="MODERATE" label="Moderate (1)" sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#d97706' }} />
        </Tabs>
      </Box>

      {/* Alerts Feed */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {filteredAlerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isHigh = alert.severity === 'HIGH';
          const badgeColor = isCritical ? '#dc2626' : isHigh ? '#ea580c' : '#d97706';
          const badgeBg = isCritical ? '#fef2f2' : isHigh ? '#fff7ed' : '#fffbeb';
          const badgeBorder = isCritical ? '#fecaca' : isHigh ? '#fed7aa' : '#fde68a';

          return (
            <Card 
              key={alert.id}
              sx={{ 
                border: `1.5px solid ${isCritical ? '#fca5a5' : '#e2e8f0'}`,
                borderLeft: `6px solid ${badgeColor}`,
                borderRadius: 2.5
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip 
                      label={alert.severity} 
                      size="small" 
                      sx={{ 
                        bgcolor: badgeBg, 
                        color: badgeColor, 
                        fontWeight: 800, 
                        border: `1px solid ${badgeBorder}`,
                        fontSize: '0.7rem'
                      }} 
                    />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>
                      {alert.hazard}
                    </Typography>
                  </Box>

                  <Chip 
                    label={`SOURCE: ${alert.source}`} 
                    size="small" 
                    sx={{ fontSize: '0.62rem', fontWeight: 700, bgcolor: '#f1f5f9', color: '#475569' }} 
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#64748b', fontSize: '0.8rem', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{alert.location} ({alert.distanceKm} km from you)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <TimeIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption">{alert.time}</Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ color: '#334155', mb: 2, lineHeight: 1.5 }}>
                  {alert.explanation}
                </Typography>

                <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 1.5, border: '1px solid #e2e8f0', mb: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                    DIRECTIVE & RECOMMENDED ACTION:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                    {alert.recommendedAction}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button 
                      variant="contained" 
                      size="small" 
                      startIcon={<NavigationIcon />}
                      onClick={() => navigate('/user/safe-route')}
                      sx={{ bgcolor: '#0284c7', fontWeight: 700 }}
                    >
                      Safe Evacuation Route
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      startIcon={<ShelterIcon />}
                      onClick={() => navigate('/user/shelters')}
                      sx={{ borderColor: '#cbd5e1', color: '#0f172a', fontWeight: 600 }}
                    >
                      Nearest Shelters
                    </Button>
                  </Box>

                  <Tooltip title="Share verified safety broadcast with family">
                    <Button size="small" startIcon={<ShareIcon />} sx={{ color: '#64748b' }}>
                      Share
                    </Button>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
