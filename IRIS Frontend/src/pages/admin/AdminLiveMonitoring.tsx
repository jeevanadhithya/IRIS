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
  Tabs, 
  Tab 
} from '@mui/material';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Thermostat as TempIcon, 
  WaterDrop as WaterIcon, 
  Timeline as VibrationIcon, 
  Explore as GyroIcon, 
  Mic as AudioIcon,
  Sensors as SensorIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';

export const AdminLiveMonitoring: React.FC = () => {
  const { sensors, selectedSensor, setSelectedSensor } = useIrisStore();
  const currentSensor = selectedSensor || sensors[0];
  const [isAutoMode, setIsAutoMode] = useState(true);

  // Reused & Refactored Gyroscope Telemetry data (X, Y, Z Ground Drift)
  const gyroData = [
    { time: '10:00:00', x: 0.1, y: 0.2, z: 0.1 },
    { time: '10:00:02', x: 0.15, y: 0.22, z: 0.08 },
    { time: '10:00:04', x: 0.2, y: 0.18, z: 0.12 },
    { time: '10:00:06', x: 0.25, y: 0.28, z: 0.18 },
    { time: '10:00:08', x: 0.3, y: 0.35, z: 0.22 },
    { time: '10:00:10', x: 0.35, y: 0.42, z: 0.28 },
    { time: '10:00:12', x: 0.42, y: 0.48, z: 0.35 },
    { time: '10:00:14', x: 0.48, y: 0.52, z: 0.41 },
    { time: '10:00:16', x: 0.55, y: 0.60, z: 0.48 },
    { time: '10:00:18', x: 0.52, y: 0.58, z: 0.44 }
  ];

  // Vibration Frequency Spectrum
  const vibrationData = [
    { time: '10:00:00', value: 20 },
    { time: '10:00:02', value: 25 },
    { time: '10:00:04', value: 32 },
    { time: '10:00:06', value: 45 },
    { time: '10:00:08', value: 58 },
    { time: '10:00:10', value: 72 },
    { time: '10:00:12', value: 85 },
    { time: '10:00:14', value: 68 },
    { time: '10:00:16', value: 42 },
    { time: '10:00:18', value: 30 }
  ];

  // Acoustic / Seismic Mic Telemetry
  const micData = [
    { time: '10:00:00', value: 42 },
    { time: '10:00:02', value: 48 },
    { time: '10:00:04', value: 55 },
    { time: '10:00:06', value: 64 },
    { time: '10:00:08', value: 78 },
    { time: '10:00:10', value: 88 },
    { time: '10:00:12', value: 92 },
    { time: '10:00:14', value: 80 },
    { time: '10:00:16', value: 60 },
    { time: '10:00:18', value: 45 }
  ];

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      {/* Header & Mode Switch */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
              Real-Time Telemetry & Sensor Mesh
            </Typography>
            <Chip 
              label={isAutoMode ? 'AUTOMATIC MODE' : 'MANUAL OVERRIDE'} 
              size="small" 
              sx={{ 
                fontWeight: 800,
                bgcolor: isAutoMode ? '#f0fdf4' : '#fffbeb',
                color: isAutoMode ? '#16a34a' : '#d97706',
                border: '1px solid currentColor'
              }} 
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Continuous high-frequency telemetry streams: 3-Axis Gyroscopic tilt, ground vibration, seismic acoustics, and hydrological gauges.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={isAutoMode ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setIsAutoMode(true)}
            sx={{ fontWeight: 700 }}
          >
            Auto Threshold Trigger
          </Button>
          <Button
            variant={!isAutoMode ? 'contained' : 'outlined'}
            size="small"
            color="warning"
            onClick={() => setIsAutoMode(false)}
            sx={{ fontWeight: 700 }}
          >
            Manual Mode
          </Button>
        </Box>
      </Box>

      {/* Sensor Metric Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>TEMPERATURE</Typography>
              <TempIcon sx={{ color: '#dc2626', fontSize: 20 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
              {currentSensor.currentReading.temperature ?? 24}°C
            </Typography>
            <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>Normal Thermal Profile</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>SOIL MOISTURE</Typography>
              <WaterIcon sx={{ color: '#0284c7', fontSize: 20 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
              {currentSensor.currentReading.soilMoisture ?? 78}%
            </Typography>
            <Typography variant="caption" sx={{ color: '#dc2626', fontWeight: 600 }}>Approaching Saturation</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>WATER DISCHARGE</Typography>
              <WaterIcon sx={{ color: '#0369a1', fontSize: 20 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
              {currentSensor.currentReading.waterLevel ?? 2.1}m
            </Typography>
            <Typography variant="caption" sx={{ color: '#ea580c', fontWeight: 600 }}>+0.6m in last 60m</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>SEISMIC VIBRATION</Typography>
              <VibrationIcon sx={{ color: '#7c3aed', fontSize: 20 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
              {currentSensor.currentReading.vibration ?? 0.18} mm/s
            </Typography>
            <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>Normal Baseline</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* 3-Axis Gyroscope Chart */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                3-Axis Gyroscopic Ground Inclinometer (X, Y, Z Drift)
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Micro-electro-mechanical (MEMS) tilt sensor measuring slope displacement.
              </Typography>
            </Box>
            <Chip label="SENSOR: IRIS-NOD-01" size="small" sx={{ fontWeight: 700, bgcolor: '#f1f5f9' }} />
          </Box>

          <Box sx={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gyroData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 1]} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Legend />
                <Line type="monotone" dataKey="x" name="X Axis Tilt" stroke="#0284c7" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="y" name="Y Axis Tilt" stroke="#ea580c" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="z" name="Z Axis Displacement" stroke="#16a34a" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Dual Charts: Vibration Analysis & Acoustic Mic Sensor */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                Vibration Frequency Spectrum
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2 }}>
                High-sensitivity piezoelectric accelerometer telemetry.
              </Typography>

              <Box sx={{ width: '100%', height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vibrationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                    <Area type="monotone" dataKey="value" stroke="#0284c7" fill="rgba(2, 132, 199, 0.15)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                Sub-Surface Acoustic Shifting Sensor
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2 }}>
                Ultrasonic listening transducer detecting rock cracking and shear fracturing.
              </Typography>

              <Box sx={{ width: '100%', height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={micData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                    <Area type="monotone" dataKey="value" stroke="#d97706" fill="rgba(217, 119, 6, 0.15)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
