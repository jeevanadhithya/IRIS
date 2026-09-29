import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  Divider, 
  MenuItem, 
  Alert,
  Avatar
} from '@mui/material';
import { 
  Save as SaveIcon, 
  AccountCircle, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  NotificationsActive as AlertPrefIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';

export const UserProfile: React.FC = () => {
  const { currentUser, updateUserPreferences } = useIrisStore();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '+91 99423 73735');
  const [emergencyContact, setEmergencyContact] = useState(currentUser.emergencyContact || '+91 98840 12345');
  const [language, setLanguage] = useState(currentUser.language || 'en');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [channels, setChannels] = useState({
    sms: currentUser.alertPreferences?.sms ?? true,
    voice: currentUser.alertPreferences?.voice ?? true,
    app: currentUser.alertPreferences?.app ?? true
  });

  const [hazards, setHazards] = useState({
    flood: currentUser.alertPreferences?.flood ?? true,
    landslide: currentUser.alertPreferences?.landslide ?? true,
    fire: currentUser.alertPreferences?.fire ?? true,
    pollution: currentUser.alertPreferences?.pollution ?? true,
    heat: currentUser.alertPreferences?.heat ?? true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserPreferences({
      ...channels,
      ...hazards
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          User Profile & Emergency Preferences
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Manage your personal safety preferences, emergency contacts, and multi-channel alert delivery settings.
        </Typography>
      </Box>

      {savedSuccess && (
        <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
          Preferences updated and saved successfully!
        </Alert>
      )}

      <Card sx={{ borderRadius: 2.5 }}>
        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSave}>
            {/* Profile Avatar Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ width: 56, height: 56, bgcolor: '#0284c7', fontSize: '1.4rem', fontWeight: 700 }}>
                {name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  {name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Portal Role: Citizen / Community User • ID: {currentUser.id}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
              1. CONTACT & LOCATION TELEMETRY
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                  required
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                  required
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Emergency Mobile Phone (SMS / IVR)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  size="small"
                  helperText="Used for automated high-priority voice and SMS alerts"
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Emergency Next-of-Kin Contact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Portal Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  size="small"
                >
                  <MenuItem value="en">English (Official)</MenuItem>
                  <MenuItem value="ta">தமிழ் (Tamil)</MenuItem>
                  <MenuItem value="hi">हिंदी (Hindi)</MenuItem>
                  <MenuItem value="ml">മലയാളം (Malayalam)</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
              2. EMERGENCY COMMUNICATION CHANNELS
            </Typography>

            <FormGroup row sx={{ mb: 3, gap: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={channels.app} onChange={(e) => setChannels({ ...channels, app: e.target.checked })} />}
                label={<Typography variant="body2" sx={{ fontWeight: 600 }}>In-App Push Warnings</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={channels.sms} onChange={(e) => setChannels({ ...channels, sms: e.target.checked })} />}
                label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Emergency SMS (Twilio)</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={channels.voice} onChange={(e) => setChannels({ ...channels, voice: e.target.checked })} />}
                label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Automated Voice IVR Calls (Critical only)</Typography>}
              />
            </FormGroup>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
              3. HAZARD ADVISORY SUBSCRIPTIONS
            </Typography>

            <FormGroup row sx={{ mb: 3, gap: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={hazards.flood} onChange={(e) => setHazards({ ...hazards, flood: e.target.checked })} />}
                label={<Typography variant="body2">Floods</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={hazards.landslide} onChange={(e) => setHazards({ ...hazards, landslide: e.target.checked })} />}
                label={<Typography variant="body2">Landslides</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={hazards.fire} onChange={(e) => setHazards({ ...hazards, fire: e.target.checked })} />}
                label={<Typography variant="body2">Wildfires</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={hazards.pollution} onChange={(e) => setHazards({ ...hazards, pollution: e.target.checked })} />}
                label={<Typography variant="body2">Air Pollution</Typography>}
              />
              <FormControlLabel
                control={<Checkbox checked={hazards.heat} onChange={(e) => setHazards({ ...hazards, heat: e.target.checked })} />}
                label={<Typography variant="body2">Extreme Heat</Typography>}
              />
            </FormGroup>

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              sx={{ bgcolor: '#0284c7', fontWeight: 700, px: 4 }}
            >
              Save Safety Preferences
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
