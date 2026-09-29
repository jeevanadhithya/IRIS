import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Tabs, 
  Tab, 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Chip 
} from '@mui/material';
import { 
  WaterDrop as FloodIcon, 
  Terrain as LandslideIcon, 
  LocalFireDepartment as FireIcon, 
  Air as PollutionIcon, 
  Thermostat as HeatIcon, 
  CheckCircle as DoIcon, 
  Cancel as DontIcon,
  Shield as ProtocolIcon
} from '@mui/icons-material';

export const UserSafetyGuides: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const guides = [
    {
      title: 'Flash Flood & River Inundation Protocol',
      icon: <FloodIcon />,
      overview: 'Flash floods develop rapidly with little warning. Water flowing at just 15 cm depth can knock down adults, and 30 cm can float vehicles.',
      dos: [
        'Move immediately to designated multi-story concrete structures or higher elevation ground.',
        'Disconnect primary electrical circuit breakers and LPG gas cylinders before evacuating.',
        'Follow designated IRIS evacuation corridors—never attempt shortcut stream crossings.',
        'Keep emergency grab-bag ready with essential documents in waterproof pouches.'
      ],
      donts: [
        'Do NOT walk, swim, or drive through moving floodwaters of any depth.',
        'Do NOT touch electrical wires, fallen utility cables, or submerged appliances.',
        'Do NOT return to homes until local civil defense authorities declare the all-clear.'
      ]
    },
    {
      title: 'Landslide & Slope Cleavage Protocol',
      icon: <LandslideIcon />,
      overview: 'Heavy rainfall saturates hill slopes, triggering sudden debris flows. Watch for tilted trees, cracked masonry, and sudden changes in stream turbidity.',
      dos: [
        'Evacuate hillside dwellings immediately upon receiving IRIS High Soil Moisture / Tilt advisories.',
        'Stay awake and alert during intense, continuous nighttime cloudbursts.',
        'Curl into a tight ball and protect your head if escape is no longer possible.'
      ],
      donts: [
        'Do NOT stay in low-lying valleys, hollows, or direct channels below steep hillsides.',
        'Do NOT delay evacuation to collect heavy personal belongings.',
        'Do NOT cross road sections showing fresh transverse surface fissures.'
      ]
    },
    {
      title: 'Forest Fire & Wildfire Protocol',
      icon: <FireIcon />,
      overview: 'Wildfires travel at extreme speeds downwind. Radiant heat and smoke inhalation represent the primary life-safety hazards.',
      dos: [
        'Evacuate early along designated paved highways perpendicular to the fire perimeter.',
        'Close all residential windows, doors, and vents to block flying embers.',
        'Wear 100% natural wool or cotton clothing, sturdy boots, and wet handkerchiefs or N95 masks.'
      ],
      donts: [
        'Do NOT attempt to outrun a fire uphill; fire travels significantly faster up slopes.',
        'Do NOT seek shelter in flammable timber structures or underbrush.',
        'Do NOT leave garden hoses running unattended if water pressure is needed by fire engines.'
      ]
    },
    {
      title: 'Toxic Air Pollution & Chemical Inversion Protocol',
      icon: <PollutionIcon />,
      overview: 'Extreme particulate accumulation (PM2.5 > 150 µg/m³) or industrial gas releases require immediate respiratory isolation.',
      dos: [
        'Stay indoors with all windows and ventilation sealed in "Ghost Shelter" mode.',
        'Use HEPA air purifiers or wet towel drafts under exterior doors.',
        'Wear certified N95 or N99 particulate respirators whenever venturing outside.'
      ],
      donts: [
        'Do NOT engage in outdoor physical exercise or jogging during pollution spikes.',
        'Do NOT burn biomass, trash, or incense inside homes during high AQI alerts.',
        'Do NOT smoke or use gas stoves without adequate kitchen hood extraction.'
      ]
    }
  ];

  const currentGuide = guides[activeTab];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Standard Disaster Safety Protocols
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Actionable life-safety guidelines validated by National Disaster Management Authorities (NDMA).
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#e2e8f0', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, val) => setActiveTab(val)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<FloodIcon />} iconPosition="start" label="Flash Floods" sx={{ fontWeight: 700 }} />
          <Tab icon={<LandslideIcon />} iconPosition="start" label="Landslides" sx={{ fontWeight: 700 }} />
          <Tab icon={<FireIcon />} iconPosition="start" label="Wildfires" sx={{ fontWeight: 700 }} />
          <Tab icon={<PollutionIcon />} iconPosition="start" label="Air Pollution / Gas" sx={{ fontWeight: 700 }} />
        </Tabs>
      </Box>

      {/* Guide Content Card */}
      <Card sx={{ borderRadius: 2.5 }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: '#e0f2fe', color: '#0284c7' }}>
              {currentGuide.icon}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
              {currentGuide.title}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ color: '#475569', mb: 3, lineHeight: 1.6 }}>
            {currentGuide.overview}
          </Typography>

          <Grid container spacing={3}>
            {/* DO's */}
            <Grid xs={12} md={6}>
              <Card sx={{ bgcolor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 2 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#15803d', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DoIcon sx={{ color: '#16a34a' }} /> WHAT YOU MUST DO:
                  </Typography>
                  <List dense disablePadding>
                    {currentGuide.dos.map((item, i) => (
                      <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start', mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 26, mt: 0.3 }}>
                          <DoIcon sx={{ color: '#16a34a', fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* DONT's */}
            <Grid xs={12} md={6}>
              <Card sx={{ bgcolor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 2 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#b91c1c', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DontIcon sx={{ color: '#dc2626' }} /> WHAT YOU MUST NEVER DO:
                  </Typography>
                  <List dense disablePadding>
                    {currentGuide.donts.map((item, i) => (
                      <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start', mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 26, mt: 0.3 }}>
                          <DontIcon sx={{ color: '#dc2626', fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
