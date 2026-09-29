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
  MenuItem, 
  TextField, 
  Divider 
} from '@mui/material';
import { 
  Assignment as IncidentIcon, 
  Send as DispatchIcon, 
  CheckCircle as ResolvedIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';
import { Incident } from '../../types/iris';

export const AdminIncidents: React.FC = () => {
  const { incidents, responseTeams, assignTeamToIncident, updateIncidentStatus } = useIrisStore();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [selectedTeam, setSelectedTeam] = useState(responseTeams[0]?.name || '');

  const handleDispatch = () => {
    if (selectedIncident) {
      const team = responseTeams.find(t => t.name === selectedTeam);
      if (team) {
        assignTeamToIncident(team.id, selectedIncident.id);
      } else {
        updateIncidentStatus(selectedIncident.id, 'Assigned', selectedTeam);
      }
      setSelectedIncident(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Incident Operations & Response Dispatch Desk
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Unified queue handling citizen emergency SOS requests, corroborated field hazards, and automated sensor breaches.
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Incident ID</TableCell>
                  <TableCell>Title / Hazard</TableCell>
                  <TableCell>Sector / Location</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Assigned Unit</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Command Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow key={incident.id} hover>
                    <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>{incident.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        {incident.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        Reported by: {incident.reporter.name} ({incident.timestamp})
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: '#475569' }}>{incident.location.address}</TableCell>
                    <TableCell>
                      <Chip label={incident.source} size="small" sx={{ fontSize: '0.62rem', fontWeight: 700 }} />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={incident.severity} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.65rem', 
                          fontWeight: 800,
                          bgcolor: incident.severity === 'CRITICAL' ? '#fee2e2' : '#fff7ed',
                          color: incident.severity === 'CRITICAL' ? '#dc2626' : '#ea580c'
                        }} 
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#0284c7' }}>
                      {incident.assignedTeam || 'Pending Dispatch'}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={incident.status} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.65rem', 
                          fontWeight: 700,
                          bgcolor: incident.status === 'Resolved' ? '#f0fdf4' : '#fffbeb',
                          color: incident.status === 'Resolved' ? '#16a34a' : '#d97706'
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      {incident.status !== 'Resolved' ? (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <Button 
                            size="small" 
                            variant="contained" 
                            onClick={() => setSelectedIncident(incident)}
                            sx={{ fontSize: '0.72rem', py: 0.4, bgcolor: '#0284c7' }}
                          >
                            Dispatch Unit
                          </Button>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="success"
                            onClick={() => updateIncidentStatus(incident.id, 'Resolved')}
                            sx={{ fontSize: '0.72rem', py: 0.4 }}
                          >
                            Resolve
                          </Button>
                        </Box>
                      ) : (
                        <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 700 }}>Resolved</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dispatch Team Modal */}
      <Dialog open={Boolean(selectedIncident)} onClose={() => setSelectedIncident(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Dispatch Response Unit to Incident</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Typography variant="body2" sx={{ color: '#475569' }}>
            Incident: <strong>{selectedIncident?.title}</strong> ({selectedIncident?.id})
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            Location: {selectedIncident?.location.address}
          </Typography>

          <TextField
            select
            fullWidth
            label="Select Assigned Emergency Response Team"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            size="small"
          >
            {responseTeams.map((team) => (
              <MenuItem key={team.id} value={team.name}>
                {team.name} ({team.type}) • Status: {team.status} ({team.membersCount} members)
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSelectedIncident(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleDispatch} sx={{ bgcolor: '#0284c7', fontWeight: 800 }}>
            Confirm & Dispatch Unit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
