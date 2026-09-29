import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Alert, 
  Chip,
  IconButton
} from '@mui/material';
import { 
  Send as SendIcon, 
  AddPhotoAlternate as PhotoIcon, 
  LocationOn as LocationIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';
import { RiskLevel } from '../../types/iris';

export const UserReport: React.FC = () => {
  const navigate = useNavigate();
  const { addCommunityReport, addIncident, currentUser } = useIrisStore();

  const [category, setCategory] = useState<'ENVIRONMENT' | 'INFRASTRUCTURE' | 'EMERGENCY'>('ENVIRONMENT');
  const [subCategory, setSubCategory] = useState('Flooding');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<RiskLevel>('HIGH');
  const [locationName, setLocationName] = useState(currentUser.location?.address || 'Sector 4, Nilgiris District');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const subCategories = {
    ENVIRONMENT: ['Flooding', 'Forest Fire', 'Smoke', 'Air Pollution', 'Landslide / Rockfall', 'Water Contamination', 'Fallen Trees'],
    INFRASTRUCTURE: ['Road Blockage', 'Road Fractured / Sunk', 'Bridge Damage', 'Storm Drainage Overflow', 'Power Grid Failure', 'Building Damage'],
    EMERGENCY: ['Person Trapped', 'Rescue Needed', 'Critical Medical Emergency', 'Shelter Overcrowded', 'Stranded Livestock']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    // 1. Add to community reports
    addCommunityReport({
      category,
      subCategory,
      description,
      location: {
        latitude: currentUser.location?.latitude || 11.4102,
        longitude: currentUser.location?.longitude || 76.6950,
        address: locationName
      },
      severity,
      status: 'Submitted',
      reporterName: currentUser.name
    });

    // 2. If emergency or critical/high severity, also directly dispatch an Incident to the Admin Incident Desk
    let incidentId = '';
    if (category === 'EMERGENCY' || severity === 'CRITICAL' || severity === 'HIGH') {
      incidentId = addIncident({
        title: `${subCategory}: ${locationName}`,
        category: category === 'EMERGENCY' ? 'TRAPPED' : subCategory.includes('Flood') ? 'FLOOD' : 'LANDSLIDE',
        location: {
          latitude: currentUser.location?.latitude || 11.4102,
          longitude: currentUser.location?.longitude || 76.6950,
          address: locationName
        },
        description,
        severity,
        status: 'Submitted',
        source: 'COMMUNITY',
        reporter: {
          name: currentUser.name,
          phone: currentUser.phone,
          userId: currentUser.id
        }
      });
    }

    setSubmittedId(incidentId || `REP-${Math.floor(100 + Math.random() * 900)}`);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Crowdsourced Hazard & Incident Report
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Submit real-time ground observations. IRIS automatically cross-checks your report against nearby telemetry sensors and satellite imagery.
        </Typography>
      </Box>

      {submittedId ? (
        <Card sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '1px solid #bbf7d0', bgcolor: '#f0fdf4' }}>
          <SuccessIcon sx={{ fontSize: 64, color: '#16a34a', mb: 1.5 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
            Incident Report Successfully Submitted!
          </Typography>
          <Typography variant="body1" sx={{ color: '#334155', mb: 2 }}>
            Reference Tracking ID: <strong>{submittedId}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', maxWidth: 500, mx: 'auto', mb: 3 }}>
            Your report has been broadcast to the Southern Regional Emergency Operations Center and queued for automated sensor corroboration.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" onClick={() => navigate('/user/my-reports')} sx={{ bgcolor: '#0284c7', fontWeight: 700 }}>
              Track My Reports
            </Button>
            <Button variant="outlined" onClick={() => setSubmittedId(null)}>
              Submit Another Report
            </Button>
          </Box>
        </Card>
      ) : (
        <Card sx={{ borderRadius: 2.5 }}>
          <CardContent sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                {/* Primary Category */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Incident Domain"
                    value={category}
                    onChange={(e) => {
                      const newCat = e.target.value as any;
                      setCategory(newCat);
                      setSubCategory(subCategories[newCat][0]);
                    }}
                    size="small"
                  >
                    <MenuItem value="ENVIRONMENT">Environmental Hazard</MenuItem>
                    <MenuItem value="INFRASTRUCTURE">Critical Infrastructure</MenuItem>
                    <MenuItem value="EMERGENCY">Urgent Citizen Emergency</MenuItem>
                  </TextField>
                </Grid>

                {/* Sub Category */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Hazard / Incident Type"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    size="small"
                  >
                    {subCategories[category].map((sub) => (
                      <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Severity */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Perceived Severity Level"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as RiskLevel)}
                    size="small"
                  >
                    <MenuItem value="LOW">Low (Minor Advisory)</MenuItem>
                    <MenuItem value="MODERATE">Moderate (Potential Impact)</MenuItem>
                    <MenuItem value="HIGH">High (Immediate Risk)</MenuItem>
                    <MenuItem value="CRITICAL">Critical (Life-Threatening)</MenuItem>
                  </TextField>
                </Grid>

                {/* Location */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location / Landmark"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    size="small"
                    InputProps={{
                      endAdornment: <LocationIcon sx={{ color: '#0284c7' }} />
                    }}
                  />
                </Grid>

                {/* Detailed Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Detailed Ground Description"
                    multiline
                    rows={4}
                    placeholder="Describe what you see: depth of water, width of road fracture, number of trapped citizens, visible fire line, etc."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Grid>

                {/* Photo Upload Attachment Placeholder */}
                <Grid item xs={12}>
                  <Box sx={{ p: 2, border: '2px dashed #cbd5e1', borderRadius: 2, textAlign: 'center', bgcolor: '#f8fafc' }}>
                    <PhotoIcon sx={{ fontSize: 36, color: '#94a3b8', mb: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                      Attach Ground Evidence Photo / Video
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1 }}>
                      Supports JPEG, PNG up to 5 MB for automated damage verification
                    </Typography>
                    <Button variant="outlined" size="small" component="label" sx={{ borderColor: '#cbd5e1', color: '#475569' }}>
                      Choose File
                      <input type="file" hidden accept="image/*" />
                    </Button>
                  </Box>
                </Grid>

                {/* Submit Action */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<SendIcon />}
                    sx={{ bgcolor: '#0284c7', fontWeight: 800, py: 1.2 }}
                  >
                    Submit Report to Emergency Desk
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
