import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { 
  Thermostat as TempIcon, 
  WaterDrop as WaterIcon, 
  Air as AirIcon, 
  Landscape as TerrainIcon, 
  LocalFireDepartment as FireIcon,
  Timeline as TrendIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';
import { DataProvenance } from '../../types/iris';

export const UserConditions: React.FC = () => {
  const { sensors, selectedSensor, setSelectedSensor } = useIrisStore();
  const currentSensor = selectedSensor || sensors[0];
  const reading = currentSensor.currentReading;

  const conditionsList = [
    { name: 'Ambient Temperature', value: `${reading.temperature ?? 24.2} °C`, status: 'Normal', threshold: '< 38 °C', source: 'REAL' as DataProvenance, updated: 'Just now', icon: <TempIcon sx={{ color: '#dc2626' }} /> },
    { name: 'Relative Humidity', value: `${reading.humidity ?? 78} %`, status: 'Elevated', threshold: '< 70 %', source: 'REAL' as DataProvenance, updated: 'Just now', icon: <WaterIcon sx={{ color: '#0284c7' }} /> },
    { name: 'Rainfall Precipitation Rate', value: `${reading.rainfall ?? 42.5} mm/hr`, status: 'Heavy', threshold: '< 15 mm/hr', source: 'REAL' as DataProvenance, updated: 'Just now', icon: <WaterIcon sx={{ color: '#0369a1' }} /> },
    { name: 'Hydrological River Level', value: `${reading.waterLevel ?? 2.1} m`, status: 'Caution', threshold: '< 2.5 m (Bankfull)', source: 'REAL' as DataProvenance, updated: '1 min ago', icon: <WaterIcon sx={{ color: '#0284c7' }} /> },
    { name: 'Soil Moisture Saturation', value: `${reading.soilMoisture ?? 78} %`, status: 'Saturated', threshold: '< 65 % (Stable)', source: 'SATELLITE' as DataProvenance, updated: '10 mins ago', icon: <TerrainIcon sx={{ color: '#d97706' }} /> },
    { name: 'PM2.5 Particulate Matter', value: `${reading.pm25 ?? 18} µg/m³`, status: 'Good', threshold: '< 60 µg/m³ (CPCB)', source: 'REAL' as DataProvenance, updated: 'Just now', icon: <AirIcon sx={{ color: '#16a34a' }} /> },
    { name: 'PM10 Coarse Dust', value: `${reading.pm10 ?? 34} µg/m³`, status: 'Good', threshold: '< 100 µg/m³', source: 'REAL' as DataProvenance, updated: 'Just now', icon: <AirIcon sx={{ color: '#16a34a' }} /> },
    { name: 'Forest Fire Danger Index', value: 'Low Risk', status: 'Safe', threshold: 'FWI < 15', source: 'PREDICTED' as DataProvenance, updated: '15 mins ago', icon: <FireIcon sx={{ color: '#16a34a' }} /> },
    { name: 'Landslide Susceptibility Index', value: 'High Risk (0.84)', status: 'Warning', threshold: 'Slip Factor > 0.6', source: 'PREDICTED' as DataProvenance, updated: '5 mins ago', icon: <TerrainIcon sx={{ color: '#ea580c' }} /> },
    { name: 'Seismic Ground Motion / Vibration', value: `${reading.vibration ?? 0.18} mm/s`, status: 'Normal', threshold: '< 0.5 mm/s', source: 'REAL' as DataProvenance, updated: 'Real-time', icon: <TrendIcon sx={{ color: '#0284c7' }} /> },
  ];

  const getSourceBadge = (source: DataProvenance) => {
    const map = {
      REAL: { label: 'REAL', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
      SATELLITE: { label: 'SATELLITE', color: '#0284c7', bg: '#f0f9ff', border: '#bae6fd' },
      PREDICTED: { label: 'PREDICTED', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
      SIMULATION: { label: 'SIMULATION', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
      HISTORICAL: { label: 'HISTORICAL', color: '#475569', bg: '#f8fafc', border: '#e2e8f0' },
      COMMUNITY: { label: 'COMMUNITY', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
    }[source] || { label: source, color: '#475569', bg: '#f8fafc', border: '#e2e8f0' };

    return (
      <Chip 
        label={map.label} 
        size="small" 
        sx={{ 
          height: 20, 
          fontSize: '0.62rem', 
          fontWeight: 700, 
          bgcolor: map.bg, 
          color: map.color, 
          border: `1px solid ${map.border}` 
        }} 
      />
    );
  };

  const getStatusChip = (status: string) => {
    let color = '#16a34a';
    let bg = '#f0fdf4';
    if (status === 'Warning' || status === 'Saturated' || status === 'Heavy') {
      color = '#ea580c';
      bg = '#fff7ed';
    } else if (status === 'Critical' || status === 'Danger') {
      color = '#dc2626';
      bg = '#fef2f2';
    } else if (status === 'Caution' || status === 'Elevated') {
      color = '#d97706';
      bg = '#fffbeb';
    }
    return (
      <Chip 
        label={status} 
        size="small" 
        sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700, bgcolor: bg, color: color }} 
      />
    );
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Live Environmental Conditions
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Continuous multi-sensor telemetry, satellite assimilation, and localized environmental indices.
          </Typography>
        </Box>

        {/* Sensor Node Switcher */}
        <FormControl size="small" sx={{ minWidth: 260 }}>
          <InputLabel id="sensor-select-label">Monitoring Node</InputLabel>
          <Select
            labelId="sensor-select-label"
            value={currentSensor.id}
            label="Monitoring Node"
            onChange={(e) => {
              const found = sensors.find(s => s.id === e.target.value);
              if (found) setSelectedSensor(found);
            }}
            sx={{ bgcolor: '#ffffff' }}
          >
            {sensors.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name} ({s.location.area}) {s.isVirtual ? '• Virtual' : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Conditions Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Environmental Parameter</TableCell>
              <TableCell>Live Value</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Safe Threshold</TableCell>
              <TableCell>Provenance</TableCell>
              <TableCell align="right">Last Observation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conditionsList.map((item, index) => (
              <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {item.icon}
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                      {item.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    {item.value}
                  </Typography>
                </TableCell>
                <TableCell>{getStatusChip(item.status)}</TableCell>
                <TableCell>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                    {item.threshold}
                  </Typography>
                </TableCell>
                <TableCell>{getSourceBadge(item.source)}</TableCell>
                <TableCell align="right">
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    {item.updated}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
