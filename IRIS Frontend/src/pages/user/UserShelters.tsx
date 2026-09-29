import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  LinearProgress, 
  TextField, 
  InputAdornment, 
  Divider 
} from '@mui/material';
import { 
  House as ShelterIcon, 
  Search as SearchIcon, 
  Navigation as NavigationIcon, 
  Phone as PhoneIcon, 
  MedicalServices as MedicalIcon, 
  Restaurant as FoodIcon, 
  WaterDrop as WaterIcon, 
  Accessible as WheelchairIcon,
  CheckCircle as AvailableIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';

export const UserShelters: React.FC = () => {
  const navigate = useNavigate();
  const { shelters, setActiveRouteId } = useIrisStore();
  const [search, setSearch] = useState('');

  const filteredShelters = shelters.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.location.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Designated Relief & Evacuation Shelters
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Verified government disaster relief shelters, real-time bed capacity, potable water, medical readiness, and supplies.
        </Typography>
      </Box>

      {/* Search Input */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search shelter by name or locality..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: '#ffffff' }}
        />
      </Box>

      {/* Shelters Grid */}
      <Grid container spacing={2.5}>
        {filteredShelters.map((shelter) => {
          const occupancyRate = Math.round((shelter.occupancy / shelter.capacity) * 100);
          const isFull = shelter.status === 'Full';
          const isNearlyFull = shelter.status === 'Nearly Full';

          return (
            <Grid item xs={12} md={6} key={shelter.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ p: 2.5, flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.05rem' }}>
                        {shelter.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {shelter.location.address}
                      </Typography>
                    </Box>

                    <Chip 
                      label={shelter.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 700,
                        bgcolor: isFull ? '#fee2e2' : isNearlyFull ? '#fffbeb' : '#f0fdf4',
                        color: isFull ? '#dc2626' : isNearlyFull ? '#d97706' : '#16a34a',
                        border: `1px solid ${isFull ? '#fecaca' : isNearlyFull ? '#fde68a' : '#bbf7d0'}`
                      }} 
                    />
                  </Box>

                  {/* Distance */}
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={`${shelter.distanceKm} km from your GPS location`} 
                      size="small" 
                      sx={{ fontSize: '0.68rem', height: 20, bgcolor: '#f1f5f9', fontWeight: 600 }} 
                    />
                  </Box>

                  {/* Occupancy Progress */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569' }}>Occupancy Intake</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        {shelter.occupancy} / {shelter.capacity} beds ({occupancyRate}%)
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={occupancyRate} 
                      sx={{ 
                        height: 7, 
                        borderRadius: 4, 
                        bgcolor: '#f1f5f9',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: isFull ? '#dc2626' : isNearlyFull ? '#ea580c' : '#16a34a'
                        }
                      }} 
                    />
                  </Box>

                  {/* Amenities */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
                    {shelter.medicalAvailable && (
                      <Chip icon={<MedicalIcon sx={{ fontSize: 14 }} />} label="Medical Unit" size="small" sx={{ fontSize: '0.65rem' }} />
                    )}
                    {shelter.foodAvailable && (
                      <Chip icon={<FoodIcon sx={{ fontSize: 14 }} />} label="Community Kitchen" size="small" sx={{ fontSize: '0.65rem' }} />
                    )}
                    {shelter.waterAvailable && (
                      <Chip icon={<WaterIcon sx={{ fontSize: 14 }} />} label="Potable Water" size="small" sx={{ fontSize: '0.65rem' }} />
                    )}
                    {shelter.accessibility && (
                      <Chip icon={<WheelchairIcon sx={{ fontSize: 14 }} />} label="Wheelchair Accessible" size="small" sx={{ fontSize: '0.65rem' }} />
                    )}
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Actions */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button 
                      variant="contained" 
                      size="small" 
                      startIcon={<NavigationIcon />}
                      disabled={isFull}
                      onClick={() => {
                        navigate('/user/safe-route');
                      }}
                      sx={{ bgcolor: '#0284c7', fontWeight: 700 }}
                    >
                      Evacuate to Shelter
                    </Button>

                    <Button 
                      variant="outlined" 
                      size="small" 
                      startIcon={<PhoneIcon />}
                      onClick={() => window.open(`tel:${shelter.contactNumber}`)}
                      sx={{ borderColor: '#cbd5e1', color: '#334155' }}
                    >
                      Call Desk
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
