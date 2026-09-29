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
  LinearProgress, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField 
} from '@mui/material';
import { 
  House as ShelterIcon, 
  Add as AddIcon, 
  Edit as EditIcon, 
  MedicalServices as MedicalIcon, 
  Restaurant as FoodIcon, 
  WaterDrop as WaterIcon 
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';

export const AdminShelters: React.FC = () => {
  const { shelters, updateShelterOccupancy } = useIrisStore();
  const [selectedShelterId, setSelectedShelterId] = useState<string | null>(null);
  const [occupancyDelta, setOccupancyDelta] = useState(25);

  const handleUpdate = () => {
    if (selectedShelterId) {
      updateShelterOccupancy(selectedShelterId, occupancyDelta);
      setSelectedShelterId(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Shelter Network & Logistics Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Monitor and coordinate disaster relief hubs, real-time bed capacity, and essential life-support supplies.
          </Typography>
        </Box>
      </Box>

      <Card>
        <CardContent sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Shelter Name & Location</TableCell>
                  <TableCell>Capacity Intake</TableCell>
                  <TableCell>Beds Available</TableCell>
                  <TableCell>Supplies Readiness</TableCell>
                  <TableCell>Contact Lead</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Manage Intake</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shelters.map((shelter) => {
                  const rate = Math.round((shelter.occupancy / shelter.capacity) * 100);
                  const isFull = shelter.status === 'Full';
                  const isNearlyFull = shelter.status === 'Nearly Full';

                  return (
                    <TableRow key={shelter.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                          {shelter.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {shelter.location.address}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: 160 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>
                            {shelter.occupancy} / {shelter.capacity}
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: isFull ? '#dc2626' : '#16a34a' }}>
                            {rate}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={rate} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            bgcolor: '#f1f5f9',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: isFull ? '#dc2626' : isNearlyFull ? '#ea580c' : '#16a34a'
                            }
                          }} 
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: isFull ? '#dc2626' : '#0f172a' }}>
                        {shelter.capacity - shelter.occupancy} beds
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {shelter.medicalAvailable && <Chip icon={<MedicalIcon sx={{ fontSize: 12 }} />} label="Medical" size="small" sx={{ fontSize: '0.62rem', height: 18 }} />}
                          {shelter.foodAvailable && <Chip icon={<FoodIcon sx={{ fontSize: 12 }} />} label="Food" size="small" sx={{ fontSize: '0.62rem', height: 18 }} />}
                          {shelter.waterAvailable && <Chip icon={<WaterIcon sx={{ fontSize: 12 }} />} label="Water" size="small" sx={{ fontSize: '0.62rem', height: 18 }} />}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#475569', fontSize: '0.8rem' }}>
                        {shelter.contactNumber}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={shelter.status} 
                          size="small" 
                          sx={{ 
                            height: 20, 
                            fontSize: '0.65rem', 
                            fontWeight: 700,
                            bgcolor: isFull ? '#fee2e2' : isNearlyFull ? '#fffbeb' : '#f0fdf4',
                            color: isFull ? '#dc2626' : isNearlyFull ? '#d97706' : '#16a34a'
                          }} 
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button 
                          size="small" 
                          variant="outlined" 
                          onClick={() => setSelectedShelterId(shelter.id)}
                          sx={{ fontSize: '0.72rem', py: 0.4 }}
                        >
                          Update Intake
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Intake Dialog */}
      <Dialog open={Boolean(selectedShelterId)} onClose={() => setSelectedShelterId(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Update Shelter Evacuee Intake</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
            Adjust the occupancy count based on ground gate arrival records:
          </Typography>
          <TextField
            fullWidth
            type="number"
            label="Evacuee Delta (+ for Arrivals, - for Departures)"
            value={occupancyDelta}
            onChange={(e) => setOccupancyDelta(parseInt(e.target.value) || 0)}
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSelectedShelterId(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate} sx={{ bgcolor: '#0284c7', fontWeight: 700 }}>
            Update Occupancy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
