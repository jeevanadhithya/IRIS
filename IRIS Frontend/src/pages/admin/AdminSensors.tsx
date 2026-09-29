import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  MenuItem 
} from '@mui/material';
import { 
  Sensors as SensorIcon, 
  Add as AddIcon, 
  BatteryFull as BatteryIcon, 
  Wifi as SignalIcon,
  CheckCircle as OnlineIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';
import { SensorNode } from '../../types/iris';

export const AdminSensors: React.FC = () => {
  const { sensors, addSensor } = useIrisStore();
  const [openDialog, setOpenDialog] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState<SensorNode['type']>('MULTI_HAZARD');
  const [area, setArea] = useState('Nilgiris Sector 5');
  const [lat, setLat] = useState('11.4150');
  const [lng, setLng] = useState('76.7020');

  const handleAdd = () => {
    if (!name.trim()) return;

    const newSensor: SensorNode = {
      id: `IRIS-NOD-0${sensors.length + 1}`,
      name,
      type,
      location: {
        latitude: parseFloat(lat) || 11.4150,
        longitude: parseFloat(lng) || 76.7020,
        area
      },
      status: 'online',
      battery: 100,
      signalStrength: 98,
      lastSeen: 'Just now',
      currentReading: {
        nodeId: `IRIS-NOD-0${sensors.length + 1}`,
        timestamp: new Date().toISOString(),
        location: { latitude: parseFloat(lat) || 11.4150, longitude: parseFloat(lng) || 76.7020, placeName: area },
        temperature: 24.0,
        humidity: 65,
        rainfall: 0,
        source: 'physical',
        confidence: 99
      }
    };

    addSensor(newSensor);
    setOpenDialog(false);
    setName('');
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Distributed Sensor Mesh Network
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Physical edge sensing nodes (LoRaWAN / NB-IoT) and simulated virtual catchment probes.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: '#0284c7', fontWeight: 700 }}
        >
          Register Sensor Node
        </Button>
      </Box>

      <Card>
        <CardContent sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sensor ID</TableCell>
                  <TableCell>Node Name & Station</TableCell>
                  <TableCell>Sensor Class</TableCell>
                  <TableCell>Location / Area</TableCell>
                  <TableCell>Battery</TableCell>
                  <TableCell>Signal</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Source</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sensors.map((sensor) => (
                  <TableRow key={sensor.id} hover>
                    <TableCell sx={{ fontWeight: 800, color: sensor.isVirtual ? '#7c3aed' : '#0f172a' }}>
                      {sensor.id}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{sensor.name}</TableCell>
                    <TableCell>
                      <Chip label={sensor.type} size="small" sx={{ fontSize: '0.65rem', fontWeight: 700 }} />
                    </TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{sensor.location.area}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <BatteryIcon sx={{ fontSize: 16, color: '#16a34a' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{sensor.battery}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SignalIcon sx={{ fontSize: 16, color: '#0284c7' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{sensor.signalStrength}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={sensor.status.toUpperCase()} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.65rem', 
                          fontWeight: 700,
                          bgcolor: sensor.status === 'online' ? '#f0fdf4' : '#fffbeb',
                          color: sensor.status === 'online' ? '#16a34a' : '#d97706'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={sensor.isVirtual ? 'VIRTUAL' : 'PHYSICAL'} 
                        size="small" 
                        sx={{ 
                          height: 18, 
                          fontSize: '0.62rem', 
                          fontWeight: 800,
                          bgcolor: sensor.isVirtual ? '#f5f3ff' : '#f1f5f9',
                          color: sensor.isVirtual ? '#7c3aed' : '#475569'
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Sensor Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Register New Sensor Node</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            fullWidth
            label="Node Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            required
          />
          <TextField
            select
            fullWidth
            label="Sensor Class"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            size="small"
          >
            <MenuItem value="MULTI_HAZARD">Multi-Hazard Environmental Telemetry</MenuItem>
            <MenuItem value="HYDROLOGICAL">Hydrological / River Level Gauge</MenuItem>
            <MenuItem value="SEISMIC">Geotechnical Seismic Inclinometer</MenuItem>
            <MenuItem value="AIR_QUALITY">Air Quality & Chemical Particulate</MenuItem>
            <MenuItem value="THERMAL">Thermal & Wildfire Sensor</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Deployment Sector / Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            size="small"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} sx={{ bgcolor: '#0284c7', fontWeight: 700 }}>
            Register Node
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
