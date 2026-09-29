import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  ShieldOutlined as ShieldIcon,
  ArrowForward as ArrowIcon,
  LockOutlined as LockIcon,
  PersonOutlined as UserIcon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, login } = useIrisStore();

  const [identifier, setIdentifier] = useState('citizen@geosense.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnifiedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please provide your login credentials.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      const lower = identifier.toLowerCase();
      // Auto-detect role from credentials
      const isAdmin = lower.includes('admin') || lower.includes('commander') || lower.includes('eoc') || password === 'admin2026';
      const role = isAdmin ? 'ADMIN' : 'USER';

      login(identifier, isAdmin ? 'admin' : 'user');
      setRole(role);
      setLoading(false);

      if (isAdmin) {
        navigate('/admin/command-center');
      } else {
        navigate('/user/home');
      }
    }, 400);
  };

  const handleFillDemo = (type: 'citizen' | 'admin') => {
    if (type === 'admin') {
      setIdentifier('commander@eoc.gov.in');
      setPassword('admin2026');
    } else {
      setIdentifier('citizen@geosense.in');
      setPassword('password123');
    }
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
          maxWidth: 440,
          width: '100%',
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          bgcolor: '#ffffff',
          borderColor: '#e2e8f0',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)'
        }}
      >
        {/* Brand Header */}
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
            Intelligent Resilient Infrastructure & Safety
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            SIH 2026 &bull; Sign in to your account
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Single Unified Login Form */}
        <Box component="form" onSubmit={handleUnifiedSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Email Address or Mobile Number"
            fullWidth
            size="medium"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <UserIcon color="action" fontSize="small" />
                  </InputAdornment>
                )
              }
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            size="medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            endIcon={<ArrowIcon />}
            sx={{
              py: 1.3,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: '#0b3961' }
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </Box>

        

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            New citizen?{' '}
            <Link to="/register" style={{ color: '#0f4c81', fontWeight: 600, textDecoration: 'none' }}>
              Register for alerts
            </Link>
          </Typography>
          <Box sx={{ mt: 1.5 }}>
            <Link to="/" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>
              ← Return to IRIS Portal
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

