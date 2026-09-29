import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  TextField, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel, 
  Checkbox, 
  Alert,
  Chip
} from '@mui/material';
import { 
  Emergency as EmergencyIcon, 
  Send as SendIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';

export const UserNeedHelp: React.FC = () => {
  const navigate = useNavigate();
  const { addIncident, currentUser } = useIrisStore();

  const [emergencyType, setEmergencyType] = useState('TRAPPED');
  const [peopleCount, setPeopleCount] = useState('2');
  const [medicalUrgency, setMedicalUrgency] = useState(false);
  const [locationName, setLocationName] = useState(currentUser.location?.address || 'Sector 4, Nilgiris District');
  const [description, setDescription] = useState('');
  const [submittedIncidentId, setSubmittedIncidentId] = useState<string | null>(null);

  const emergencyOptions = [
    { value: 'TRAPPED', label: 'Trapped / Need Immediate Rescue', severity: 'CRITICAL' },
    { value: 'MEDICAL', label: 'Severe Medical Emergency', severity: 'CRITICAL' },
    { value: 'FLOOD', label: 'Rising Floodwaters Inundating Home', severity: 'HIGH' },
    { value: 'LANDSLIDE', label: 'Landslide / Structural Collapse', severity: 'CRITICAL' },
    { value: 'FIRE', label: 'Fire / Heavy Smoke Encirclement', severity: 'HIGH' },
    { value: 'ACCIDENT', label: 'Vehicle Accident / Road Entrapment', severity: 'HIGH' },
    { value: 'POLLUTION', label: 'Toxic Chemical Gas Leak / Inhalation', severity: 'HIGH' },
    { value: 'OTHER', label: 'Other Life-Safety Threat', severity: 'MODERATE' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedOption = emergencyOptions.find(o => o.value === emergencyType);

    const incidentId = addIncident({
      title: `SOS DISPATCH: ${selectedOption?.label || emergencyType}`,
      category: emergencyType as any,
      location: {
        latitude: currentUser.location?.latitude || 11.4102,
        longitude: currentUser.location?.longitude || 76.6950,
        address: locationName
      },
      description: `[SOS REQUEST] People Count: ${peopleCount}. Medical Urgency: ${medicalUrgency ? 'YES' : 'NO'}. Details: ${description || 'Emergency assistance requested via citizen safety app.'}`,
      peopleCount: parseInt(peopleCount) || 1,
      medicalUrgency,
      severity: (selectedOption?.severity as any) || 'CRITICAL',
      status: 'Submitted',
      source: 'EMERGENCY_SOS',
      reporter: {
        name: currentUser.name,
        phone: currentUser.phone,
        userId: currentUser.id
      }
    });

    // Also send to backend so mobile app and other web clients get real-time sync
    fetch('http://localhost:3009/api/sos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `[SOS REQUEST] People Count: ${peopleCount}. Details: ${description || 'Emergency assistance requested via citizen safety app.'}`,
        location: {
          lat: currentUser.location?.latitude || 11.4102,
          lng: currentUser.location?.longitude || 76.6950,
        },
        place: locationName,
        extraDetails: { severity: selectedOption?.severity || 'CRITICAL' }
      })
    }).catch(err => console.error('Failed to send SOS to backend:', err));

    setSubmittedIncidentId(incidentId);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#dc2626' }}>
          Emergency Dispatch & Assistance
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Direct life-safety signal transmission to the IRIS Disaster Response Operations Center.
        </Typography>
      </Box>

      {/* Direct Hotline Alert */}
      <Alert 
        severity="error" 
        variant="filled"
        sx={{ mb: 3, borderRadius: 2.5, bgcolor: '#dc2626', fontWeight: 600 }}
        action={
          <Button color="inherit" size="small" onClick={() => window.open('tel:112')} sx={{ fontWeight: 800, bgcolor: 'rgba(255,255,255,0.2)' }}>
            CALL 112 NOW
          </Button>
        }
      >
        FOR IMMEDIATE LIFE-THREATENING EMERGENCIES: Call National Emergency Services directly at 112.
      </Alert>

      {submittedIncidentId ? (
        <Card sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '2px solid #bbf7d0', bgcolor: '#f0fdf4' }}>
          <SuccessIcon sx={{ fontSize: 64, color: '#16a34a', mb: 1.5 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
            Emergency Signal Received by Command Center
          </Typography>
          <Typography variant="body1" sx={{ color: '#334155', mb: 2 }}>
            Emergency Incident Tracking ID: <strong>{submittedIncidentId}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', maxWidth: 500, mx: 'auto', mb: 3 }}>
            Nearest response teams have been notified of your GPS coordinates. Stay calm, move to elevated solid ground if safe, and keep your phone line open.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" onClick={() => navigate('/user/safe-route')} sx={{ bgcolor: '#0284c7', fontWeight: 700 }}>
              View Nearest Escape Route
            </Button>
            <Button variant="outlined" onClick={() => navigate('/user/home')}>
              Return to Home
            </Button>
          </Box>
        </Card>
      ) : (
        <Card sx={{ borderRadius: 2.5 }}>
          <CardContent sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 1.5 }}>
                1. SELECT PRIMARY EMERGENCY NATURE:
              </Typography>

              <Grid container spacing={1.5} sx={{ mb: 3 }}>
                {emergencyOptions.map((opt) => (
                  <Grid item xs={12} sm={6} key={opt.value}>
                    <Box
                      onClick={() => setEmergencyType(opt.value)}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        cursor: 'pointer',
                        border: emergencyType === opt.value ? '2px solid #dc2626' : '1px solid #e2e8f0',
                        bgcolor: emergencyType === opt.value ? '#fef2f2' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: emergencyType === opt.value ? 700 : 500, color: '#0f172a' }}>
                        {opt.label}
                      </Typography>
                      <Radio checked={emergencyType === opt.value} sx={{ color: '#dc2626', '&.Mui-checked': { color: '#dc2626' } }} />
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 1.5 }}>
                2. SITUATIONAL DETAILS & LOCATION:
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Current Sector / Address"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    size="small"
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Number of Persons with You"
                    type="number"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={medicalUrgency} 
                        onChange={(e) => setMedicalUrgency(e.target.checked)} 
                        sx={{ color: '#dc2626', '&.Mui-checked': { color: '#dc2626' } }} 
                      />
                    }
                    label={<Typography variant="body2" sx={{ fontWeight: 700, color: '#dc2626' }}>Critical Medical Assistance Required (Injury / Severe Bleeding / Inability to Walk)</Typography>}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Additional Details (Floor number, landmarks, water depth)"
                    placeholder="E.g., On 2nd floor roof, water rising on ground floor, 1 elderly family member."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<EmergencyIcon />}
                    sx={{ bgcolor: '#dc2626', '&:hover': { bgcolor: '#b91c1c' }, fontWeight: 800, py: 1.5, fontSize: '1rem' }}
                  >
                    DISPATCH EMERGENCY ASSISTANCE REQUEST
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
