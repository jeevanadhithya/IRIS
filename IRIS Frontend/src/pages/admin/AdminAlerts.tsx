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
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  MenuItem, 
  Tabs, 
  Tab 
} from '@mui/material';
import { 
  NotificationsActive as AlertIcon, 
  Add as AddIcon, 
  PhoneInTalk as CallIcon, 
  Message as SmsIcon, 
  CheckCircle as ResolveIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';
import { irisApi } from '../../services/irisApi';

export const AdminAlerts: React.FC = () => {
  const { riskAssessments, simulation } = useIrisStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const [newTitle, setNewTitle] = useState('');
  const [newSeverity, setNewSeverity] = useState('HIGH');
  const [newLocation, setNewLocation] = useState('Nilgiris Sector 4');
  const [newDirective, setNewDirective] = useState('');

  const [alertsList, setAlertsList] = useState([
    {
      id: 'ALT-101',
      title: 'Flash Flood & River Inundation',
      severity: 'CRITICAL',
      location: 'Cauvery River Basin, Sector 3',
      affectedPop: '3,400 citizens',
      status: 'Active',
      time: '12 mins ago',
      source: 'SATELLITE'
    },
    {
      id: 'ALT-102',
      title: 'Landslide Slope Instability Warning',
      severity: 'HIGH',
      location: 'State Highway 17 Ghat Corridor',
      affectedPop: '1,250 citizens',
      status: 'Active',
      time: '28 mins ago',
      source: 'REAL'
    },
    {
      id: 'ALT-103',
      title: 'Toxic Industrial VOC Inversion',
      severity: 'MODERATE',
      location: 'Manali Industrial Belt Downwind',
      affectedPop: '8,900 citizens',
      status: 'Active',
      time: '1 hour ago',
      source: 'REAL'
    }
  ]);

  const handleCreateAlert = async () => {
    if (!newTitle.trim()) return;

    const created = {
      id: `ALT-${Math.floor(104 + Math.random() * 50)}`,
      title: newTitle,
      severity: newSeverity,
      location: newLocation,
      affectedPop: '2,500 citizens',
      status: 'Active',
      time: 'Just now',
      source: simulation.active ? 'SIMULATION' : 'REAL'
    };

    setAlertsList([created, ...alertsList]);
    setOpenDialog(false);
    setNewTitle('');
    setNewDirective('');

    // Trigger SMS broadcast through backend gateway
    await irisApi.triggerEmergencySMS('+919942373735', `IRIS ALERT [${newSeverity}]: ${newTitle} at ${newLocation}.`, newSeverity);
  };

  const handleResolveAlert = (id: string) => {
    setAlertsList(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Alert Operations & Geo-Targeted Broadcasting
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Publish official NDMA-compliant emergency alerts, configure multi-channel escalation rules, and monitor delivery telemetry.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: '#dc2626', fontWeight: 800, '&:hover': { bgcolor: '#b91c1c' } }}
        >
          Draft Emergency Broadcast
        </Button>
      </Box>

      {/* Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#e2e8f0', mb: 3 }}>
        <Tabs value={filterSeverity} onChange={(_, val) => setFilterSeverity(val)}>
          <Tab value="ALL" label="All Alerts" sx={{ fontWeight: 700 }} />
          <Tab value="CRITICAL" label="Critical (1)" sx={{ fontWeight: 700, color: '#dc2626' }} />
          <Tab value="HIGH" label="High (1)" sx={{ fontWeight: 700, color: '#ea580c' }} />
          <Tab value="MODERATE" label="Moderate (1)" sx={{ fontWeight: 700, color: '#d97706' }} />
        </Tabs>
      </Box>

      {/* Alerts Table */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Alert ID</TableCell>
                  <TableCell>Hazard Title</TableCell>
                  <TableCell>Target Sector / Boundary</TableCell>
                  <TableCell>Affected Population</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Provenance</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Command Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alertsList.filter(a => filterSeverity === 'ALL' || a.severity === filterSeverity).map((alert) => (
                  <TableRow key={alert.id} hover>
                    <TableCell sx={{ fontWeight: 700, color: '#0f172a' }}>{alert.id}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{alert.title}</TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{alert.location}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{alert.affectedPop}</TableCell>
                    <TableCell>
                      <Chip 
                        label={alert.severity} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.65rem', 
                          fontWeight: 800,
                          bgcolor: alert.severity === 'CRITICAL' ? '#fee2e2' : alert.severity === 'HIGH' ? '#fff7ed' : '#fffbeb',
                          color: alert.severity === 'CRITICAL' ? '#dc2626' : alert.severity === 'HIGH' ? '#ea580c' : '#d97706'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip label={alert.source} size="small" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 700 }} />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={alert.status} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontWeight: 700,
                          bgcolor: alert.status === 'Resolved' ? '#f0fdf4' : '#fff7ed',
                          color: alert.status === 'Resolved' ? '#16a34a' : '#ea580c'
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      {alert.status !== 'Resolved' ? (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          color="success" 
                          startIcon={<ResolveIcon />}
                          onClick={() => handleResolveAlert(alert.id)}
                          sx={{ fontWeight: 700 }}
                        >
                          Resolve
                        </Button>
                      ) : (
                        <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>Resolved</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create Alert Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Draft Geo-Targeted Emergency Alert</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            fullWidth
            label="Hazard Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            size="small"
            required
          />
          <TextField
            select
            fullWidth
            label="Severity Escalation"
            value={newSeverity}
            onChange={(e) => setNewSeverity(e.target.value)}
            size="small"
          >
            <MenuItem value="ADVISORY">Advisory (App Notification Only)</MenuItem>
            <MenuItem value="HIGH">High Warning (App + SMS)</MenuItem>
            <MenuItem value="CRITICAL">Critical Emergency (App + SMS + Twilio Voice IVR)</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Target Geographic Boundary / Sector"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            size="small"
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Citizen Action Directive"
            placeholder="E.g., Move immediately to higher ground. Highway 17 closed."
            value={newDirective}
            onChange={(e) => setNewDirective(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleCreateAlert} sx={{ fontWeight: 800, bgcolor: '#dc2626' }}>
            Broadcast Alert Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
