import { createTheme } from '@mui/material/styles';

export const irisTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0284c7', // Professional Ocean Blue / Environmental Intelligence
      light: '#38bdf8',
      dark: '#0369a1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#475569', // Slate Gray
      light: '#64748b',
      dark: '#334155',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc2626', // Critical / Danger
      light: '#ef4444',
      dark: '#b91c1c',
    },
    warning: {
      main: '#ea580c', // Warning Orange
      light: '#f97316',
      dark: '#c2410c',
    },
    info: {
      main: '#0284c7', // Information
      light: '#0ea5e9',
      dark: '#0369a1',
    },
    success: {
      main: '#16a34a', // Safe / Normal Green
      light: '#22c55e',
      dark: '#15803d',
    },
    background: {
      default: '#f8fafc', // Crisp clean Off-white / Slate-50
      paper: '#ffffff', // Pure White
    },
    text: {
      primary: '#0f172a', // Deep Charcoal Slate
      secondary: '#475569', // Muted Slate
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      color: '#0f172a',
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#0f172a',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.35rem',
      fontWeight: 600,
      color: '#0f172a',
    },
    h4: {
      fontSize: '1.15rem',
      fontWeight: 600,
      color: '#0f172a',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#0f172a',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#334155',
    },
    body1: {
      fontSize: '0.875rem',
      color: '#1e293b',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.8125rem',
      color: '#64748b',
      lineHeight: 1.45,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 8, // Crisp, clean professional radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          padding: '6px 16px',
          '&:hover': {
            boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          backgroundColor: '#0284c7',
          '&:hover': {
            backgroundColor: '#0369a1',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: 10,
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
          borderRadius: 6,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f1f5f9',
          '& .MuiTableCell-head': {
            fontWeight: 700,
            color: '#334155',
            fontSize: '0.78rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #f1f5f9',
          padding: '10px 14px',
        },
      },
    },
  },
});
