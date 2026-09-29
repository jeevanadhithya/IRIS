import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  MenuItem,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  ShieldOutlined as ShieldIcon,
  Visibility,
  VisibilityOff,
  PhoneIphone as PhoneIcon,
  LocationOn as LocationIcon,
  CheckCircle as SuccessIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useIrisStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: 'Uttarakhand',
    district: 'Rudraprayag / Chamoli',
    specialNeeds: 'None',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const indianStates = [
    'Uttarakhand',
    'Himachal Pradesh',
    'Jammu & Kashmir',
    'Assam',
    'Sikkim',
    'Arunachal Pradesh',
    'Kerala',
    'Tamil Nadu',
    'Odisha',
    'Maharashtra'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.password) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.phone.length < 10) {
      setError('Please provide a valid 10-digit mobile number for Twilio emergency SMS/IVR alerts.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      // Per system spec: Self-registration is strictly for USER (Citizen) role
      setRole('USER');
      navigate('/user/home');
    }, 1200);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        py: 4
      }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          maxWidth: 520,
          width: '100%',
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          bgcolor: '#ffffff',
          borderColor: '#e2e8f0',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            component="img"
            src="/iris-logo.png"
            alt="I R I S"
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              objectFit: 'cover',
              mb: 1.5,
              border: '2.5px solid #0284c7',
              boxShadow: '0 4px 16px rgba(2, 132, 199, 0.25)'
            }}
          />
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: '0.15em' }}>
            I R I S
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1, textTransform: 'uppercase' }}>
            Citizen Safety Registration &bull; Early Warning Network
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Register your mobile number to receive automated Twilio IVR voice calls and geo-targeted safe evacuation routes during disasters.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" icon={<SuccessIcon />} sx={{ mb: 2.5, borderRadius: 2 }}>
            Citizen profile registered successfully! Logging into Citizen Portal...
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Full Name"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ramesh Sharma"
          />

          <TextField
            label="Mobile Number (for Emergency Alerts)"
            fullWidth
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            helperText="Twilio IVR automated phone calls will be dispatched to this number during red alerts"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon fontSize="small" color="action" />
                  </InputAdornment>
                )
              }
            }}
          />

          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@example.com"
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              select
              label="State / Region"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon fontSize="small" color="action" />
                    </InputAdornment>
                  )
                }
              }}
            >
              {indianStates.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="District / Ward"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            />
          </Box>

          <TextField
            select
            label="Household Vulnerability / Medical Needs"
            value={formData.specialNeeds}
            onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
            helperText="Helps EOC prioritize evacuation teams to your sector"
          >
            <MenuItem value="None">None (Standard evacuation)</MenuItem>
            <MenuItem value="Elderly members at home">Elderly members at home</MenuItem>
            <MenuItem value="Infant / Pregnant family member">Infant / Pregnant family member</MenuItem>
            <MenuItem value="Mobility impaired / Wheelchair required">Mobility impaired / Wheelchair required</MenuItem>
            <MenuItem value="Medical equipment / Oxygen dependency">Medical equipment / Oxygen dependency</MenuItem>
          </TextField>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              label="Create Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <TextField
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={success}
            endIcon={<ArrowIcon />}
            sx={{
              mt: 1.5,
              py: 1.3,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Create Citizen Account & Enable Protection
          </Button>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already registered?{' '}
            <Link to="/login" style={{ color: '#0f4c81', fontWeight: 600, textDecoration: 'none' }}>
              Sign in here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
