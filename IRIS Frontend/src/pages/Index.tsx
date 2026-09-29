import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  Divider,
  Stack,
  Alert
} from '@mui/material';
import {
  ShieldOutlined as ShieldIcon,
  Sensors as SensorIcon,
  Analytics as AnalyticsIcon,
  Timeline as PredictIcon,
  Campaign as WarnIcon,
  AltRoute as GuideIcon,
  EmergencyShare as RespondIcon,
  Person as UserIcon,
  AdminPanelSettings as AdminIcon,
  ArrowForward as ArrowIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon,
  PhoneInTalk as PhoneIcon,
  Public as EarthIcon,
  CloudQueue as CloudIcon,
  Warning as HazardIcon,
  WaterDrop as FloodIcon,
  Terrain as LandslideIcon,
  LocalFireDepartment as FireIcon,
  Air as PollutionIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useIrisStore } from '../store/irisStore';

export const Index: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, runFlagshipDemo } = useIrisStore();

  const handleEnterCitizen = () => {
    setRole('USER');
    navigate('/user/home');
  };

  const handleEnterAdmin = () => {
    setRole('ADMIN');
    navigate('/admin/command-center');
  };

  const handleRunFlagship = () => {
    setRole('ADMIN');
    runFlagshipDemo();
    navigate('/admin/simulation');
  };

  const pillars = [
    {
      step: '01',
      title: 'Sense',
      subtitle: 'Smart Edge Nodes',
      desc: 'Distributed solar-powered IoT sensors with LoRaWAN mesh (865 MHz) and acoustic geophones continuously monitor rainfall, pore pressure, seismic drift, and water stage.',
      icon: <SensorIcon sx={{ fontSize: 32, color: 'primary.main' }} />
    },
    {
      step: '02',
      title: 'Analyze',
      subtitle: 'On-Device Inference',
      desc: 'Local TinyML models filter sensor jitter and detect anomaly signatures at the edge within 200 milliseconds, operating without cloud dependency.',
      icon: <AnalyticsIcon sx={{ fontSize: 32, color: 'primary.main' }} />
    },
    {
      step: '03',
      title: 'Predict',
      subtitle: 'Physics-Based AI',
      desc: 'Coupled hydrodynamic and geotechnical slip stability algorithms (Factor of Safety) forecast flash floods, river damming, and slope failures up to 6 hours ahead.',
      icon: <PredictIcon sx={{ fontSize: 32, color: 'primary.main' }} />
    },
    {
      step: '04',
      title: 'Warn',
      subtitle: 'Twilio Multi-Channel',
      desc: 'Hyper-localized alerts reach authorities and citizens simultaneously via Twilio Studio Voice IVR phone calls (+12295446795), SMS broadcasts, and mobile push.',
      icon: <WarnIcon sx={{ fontSize: 32, color: 'warning.main' }} />
    },
    {
      step: '05',
      title: 'Guide',
      subtitle: 'Risk-Aware Evacuation',
      desc: 'Dynamic routing algorithms continuously calculate hazard exposure, automatically invalidating compromised corridors and guiding citizens toward safe shelters.',
      icon: <GuideIcon sx={{ fontSize: 32, color: 'success.main' }} />
    },
    {
      step: '06',
      title: 'Respond',
      subtitle: 'Unified EOC Command',
      desc: 'Real-time 3D Digital Twin, crowdsourced corroboration, resource allocation, and field team dispatch empower responders from reactive to proactive prevention.',
      icon: <RespondIcon sx={{ fontSize: 32, color: 'error.main' }} />
    }
  ];

  const hazards = [
    {
      name: 'Flash Floods & River Surges',
      desc: 'Ultrasonic river gauge monitoring, radar altimetry, and catchment precipitation integration.',
      icon: <FloodIcon color="primary" />
    },
    {
      name: 'Landslides & Slope Instability',
      desc: 'Acoustic emissions, borehole piezometer pore pressure, and 3-axis MEMS accelerometer drift.',
      icon: <LandslideIcon color="warning" />
    },
    {
      name: 'Forest Fires & Heat Stress',
      desc: 'Thermal infrared sensors, relative humidity, wind vector triangulation, and smoke aerosol detection.',
      icon: <FireIcon color="error" />
    },
    {
      name: 'Severe Air & Chemical Pollution',
      desc: 'Particulate matter (PM2.5/PM10), VOC emissions, AQI index forecasting, and industrial spill tracking.',
      icon: <PollutionIcon color="info" />
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', color: '#0f172a' }}>
      {/* Top Navigation Bar */}
      <Box
        sx={{
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          zIndex: 1100,
          py: 1.5,
          px: { xs: 2, md: 4 }
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo & Subtitle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src="/iris-logo.png"
              alt="I R I S"
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #0284c7',
                boxShadow: '0 2px 10px rgba(2, 132, 199, 0.3)'
              }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1, letterSpacing: '0.15em', color: '#0f172a' }}>
                I R I S
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.72rem' }}>
                SIH 2026 • Problem Statement 26178
              </Typography>
            </Box>
          </Box>

          {/* Navigation Actions */}
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Button
              variant="text"
              size="small"
              onClick={handleEnterCitizen}
              startIcon={<UserIcon />}
              sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}
            >
              Citizen View
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleEnterAdmin}
              startIcon={<AdminIcon />}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              EOC Commander
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/login')}
              sx={{ textTransform: 'none', fontWeight: 600, display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 }, bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
            {/* SIH Badge */}
            <Chip
              label="SMART INDIA HACKATHON 2026 — PROBLEM STATEMENT 26178"
              color="primary"
              size="small"
              sx={{ fontWeight: 700, mb: 3, letterSpacing: 0.5, px: 1, py: 0.5 }}
            />

            {/* Main Headline */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.3rem', sm: '3.2rem', md: '3.8rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#0f172a',
                mb: 2.5
              }}
            >
              Resilient AI-Powered{' '}
              <span style={{ color: '#0f4c81' }}>Environmental Monitoring</span> Network
            </Typography>

            {/* Core Motto */}
            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                py: 1,
                px: 2.5,
                borderRadius: 50,
                bgcolor: '#ffffff',
                borderColor: '#cbd5e1',
                mb: 3
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 0.5 }}>
                Sense &bull; Analyze &bull; Predict &bull; Warn &bull; Guide &bull; Respond
              </Typography>
            </Paper>

            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.15rem', lineHeight: 1.7, mb: 4.5 }}>
              A cloud-edge hybrid defense system shifting India from reactive disaster relief to proactive risk prevention.
              Continuous sensor telemetry, on-device AI inference, 3D digital twin simulation, automated Twilio voice/SMS alerts,
              and risk-aware evacuation routing.
            </Typography>

            {/* Launch Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mb: 4, justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleEnterCitizen}
                startIcon={<UserIcon />}
                endIcon={<ArrowIcon />}
                sx={{
                  py: 1.6,
                  px: 3.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(15, 76, 129, 0.3)'
                }}
              >
                Launch Citizen Portal
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleEnterAdmin}
                startIcon={<AdminIcon />}
                sx={{
                  py: 1.6,
                  px: 3.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 2,
                  bgcolor: '#ffffff',
                  borderColor: '#cbd5e1',
                  color: '#0f172a',
                  '&:hover': { bgcolor: '#f1f5f9', borderColor: '#94a3b8' }
                }}
              >
                Launch EOC Command Center
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleRunFlagship}
                startIcon={<PlayIcon />}
                sx={{
                  py: 1.6,
                  px: 3.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 2
                }}
              >
                Run Flagship Cascade Demo
              </Button>
            </Stack>

            {/* Telemetry Status Bar */}
            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: '#ffffff',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-around',
                gap: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon color="success" fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  48 Active Edge Nodes
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckIcon color="success" fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Sub-second Edge Inference
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="primary" fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Twilio IVR Gateway Ready
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EarthIcon color="info" fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ISRO NavIC Compatible
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Flagship Simulation Highlight Banner */}
      <Box sx={{ bgcolor: '#0f172a', color: '#ffffff', py: 6, px: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Chip
                label="FLAGSHIP TECHNICAL DEMO"
                color="secondary"
                size="small"
                sx={{ fontWeight: 700, mb: 1.5 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.02em' }}>
                Multi-Hazard Cascading Simulation Engine
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', lineHeight: 1.7, mb: 2.5 }}>
                Witness real-time cascading disaster modeling: <strong>Extreme Rainfall (160mm/h)</strong> triggers a{' '}
                <strong>Landslide Mass Slip</strong>, damming the river into a <strong>Flash Flood Surge</strong>.
                Watch IRIS automatically spawn virtual sensors, elevate regional risk, invalidate compromised Corridor Alpha,
                and recalculate safe evacuation routes to Corridor Beta in real time.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PlayIcon />}
                onClick={handleRunFlagship}
                sx={{ fontWeight: 700, textTransform: 'none', px: 3, py: 1.2 }}
              >
                Experience Live Simulation (T+00 to T+60)
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper
                variant="outlined"
                sx={{
                  bgcolor: '#1e293b',
                  borderColor: '#334155',
                  p: 3,
                  borderRadius: 2,
                  color: '#ffffff'
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#38bdf8', mb: 2 }}>
                  5-STAGE CASCADE TIMELINE
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip label="T+00" size="small" sx={{ bgcolor: '#334155', color: '#ffffff', fontWeight: 700 }} />
                    <Typography variant="body2">Catchment Cloudburst (165 mm/hr)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip label="T+15" size="small" sx={{ bgcolor: '#334155', color: '#ffffff', fontWeight: 700 }} />
                    <Typography variant="body2">Slope Geophone Spike & Shear Failure</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip label="T+30" size="small" sx={{ bgcolor: '#334155', color: '#ffffff', fontWeight: 700 }} />
                    <Typography variant="body2">River Damming & Debris Lake Formed</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip label="T+45" size="small" sx={{ bgcolor: '#ef4444', color: '#ffffff', fontWeight: 700 }} />
                    <Typography variant="body2">Hydrologic Surge Inundates Highway Alpha</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip label="T+60" size="small" sx={{ bgcolor: '#10b981', color: '#ffffff', fontWeight: 700 }} />
                    <Typography variant="body2">Automatic Dynamic Re-routing to Corridor Beta</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* The 6 Pillars: Sense -> Analyze -> Predict -> Warn -> Guide -> Respond */}
      <Box sx={{ py: 10, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Operational Architecture
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: '#0f172a' }}>
              The 6 Core Operational Pillars
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5 }}>
              How IRIS delivers end-to-end resilience from edge physics to community evacuation
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {pillars.map((p, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    borderColor: '#e2e8f0',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    {p.icon}
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#cbd5e1' }}>
                      {p.step}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 0.5 }}>
                    {p.title}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main', mb: 1.5, display: 'block' }}>
                    {p.subtitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {p.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Multi-Hazard Coverage */}
      <Box sx={{ py: 8, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 5 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Hazard Scope
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: '#0f172a' }}>
              Tailored for India's Diverse Vulnerabilities
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Comprehensive multi-hazard detection aligned with NDMA guidelines
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {hazards.map((h, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Paper variant="outlined" sx={{ p: 2.5, height: '100%', bgcolor: '#ffffff', borderRadius: 2 }}>
                  <Box sx={{ mb: 1.5 }}>{h.icon}</Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
                    {h.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {h.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 5, bgcolor: '#ffffff', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            <strong>IRIS</strong> — Intelligent Resilient Infrastructure & Safety &bull; Built for Smart India Hackathon 2026 (PS 26178)
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            National Disaster Management Authority (NDMA) & CPCB Compliant Architecture
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;
