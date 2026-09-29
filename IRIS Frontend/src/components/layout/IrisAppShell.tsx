import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Chip, 
  Button, 
  Divider, 
  Avatar, 
  Menu, 
  MenuItem, 
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Dashboard as DashboardIcon, 
  Public as PublicIcon, 
  Sensors as SensorsIcon, 
  NotificationsActive as AlertIcon, 
  Science as SimIcon, 
  DirectionsRun as EvacIcon, 
  House as ShelterIcon, 
  WarningAmber as IncidentIcon, 
  BarChart as AnalyticsIcon, 
  Psychology as AiIcon, 
  People as CommunityIcon, 
  Hub as NetworkIcon, 
  HealthAndSafety as HealthIcon, 
  Home as HomeIcon, 
  Thermostat as ThermostatIcon, 
  Map as MapIcon, 
  ReportProblem as ReportIcon, 
  Assignment as MyReportsIcon, 
  MenuBook as GuideIcon, 
  AccountCircle, 
  Emergency as EmergencyIcon,
  PlayArrow as PlayIcon,
  PhoneInTalk as PhoneIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';

interface IrisAppShellProps {
  children: React.ReactNode;
}

export const IrisAppShell: React.FC<IrisAppShellProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, logout, simulation, runFlagshipDemo, overallRiskLevel } = useIrisStore();
  const isAdmin = currentUser.role === 'admin';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  // Admin Navigation Items
  const adminNav = [
    { label: 'Command Center', path: '/admin/command-center', icon: <DashboardIcon fontSize="small" /> },
    { label: '3D Digital Twin', path: '/admin/digital-twin', icon: <PublicIcon fontSize="small" />, chip: '3D' },
    { label: 'Simulation Center', path: '/admin/simulation', icon: <SimIcon fontSize="small" />, chip: 'AI' },
    { label: '3D Evacuation', path: '/admin/evacuation', icon: <EvacIcon fontSize="small" /> },
    { label: 'Live Monitoring', path: '/admin/live-monitoring', icon: <SensorsIcon fontSize="small" /> },
    { label: 'Alert Center', path: '/admin/alerts', icon: <AlertIcon fontSize="small" /> },
    { label: 'Shelter Hub', path: '/admin/shelters', icon: <ShelterIcon fontSize="small" /> },
    { label: 'Incident Desk', path: '/admin/incidents', icon: <IncidentIcon fontSize="small" /> },
    { label: 'Community Review', path: '/admin/community', icon: <CommunityIcon fontSize="small" /> },
    { label: 'Sensor Network', path: '/admin/sensors', icon: <NetworkIcon fontSize="small" /> },
    { label: 'Analytics & Trends', path: '/admin/analytics', icon: <AnalyticsIcon fontSize="small" /> },
    { label: 'AI Intelligence', path: '/admin/ai-assistant', icon: <AiIcon fontSize="small" /> },
    { label: 'System Health', path: '/admin/system', icon: <HealthIcon fontSize="small" /> },
  ];

  // Citizen User Navigation Items
  const userNav = [
    { label: 'Safety Home', path: '/user/home', icon: <HomeIcon fontSize="small" /> },
    { label: 'Live Conditions', path: '/user/conditions', icon: <ThermostatIcon fontSize="small" /> },
    { label: 'Active Alerts', path: '/user/alerts', icon: <AlertIcon fontSize="small" /> },
    { label: 'Hazard Map', path: '/user/map', icon: <MapIcon fontSize="small" /> },
    { label: 'Safe Evacuation', path: '/user/safe-route', icon: <EvacIcon fontSize="small" /> },
    { label: 'Find Shelters', path: '/user/shelters', icon: <ShelterIcon fontSize="small" /> },
    { label: 'Report Incident', path: '/user/report', icon: <ReportIcon fontSize="small" /> },
    { label: 'My Reports', path: '/user/my-reports', icon: <MyReportsIcon fontSize="small" /> },
    { label: 'Community Feed', path: '/user/community', icon: <CommunityIcon fontSize="small" /> },
    { label: 'Safety Protocols', path: '/user/safety-guides', icon: <GuideIcon fontSize="small" /> },
    { label: 'Emergency Help', path: '/user/need-help', icon: <EmergencyIcon fontSize="small" />, chip: 'SOS' },
  ];

  const currentNav = isAdmin ? adminNav : userNav;
  const drawerWidth = 260;

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
        <Box 
          component="img"
          src="/iris-logo.png"
          alt="I R I S"
          sx={{ 
            width: 44, 
            height: 44, 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '2px solid #0284c7',
            boxShadow: '0 2px 8px rgba(2, 132, 199, 0.35)'
          }}
        />
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1, letterSpacing: '0.18em', color: '#0f172a' }}>
            I R I S
          </Typography>
          <Typography variant="caption" sx={{ color: '#0284c7', fontSize: '0.68rem', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Environmental AI Network
          </Typography>
        </Box>
      </Box>

      {/* Role & Quick Switch Banner */}
      <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', textTransform: 'uppercase', fontSize: '0.65rem' }}>
            PORTAL ROLE
          </Typography>
          <Chip 
            size="small" 
            label={isAdmin ? 'ADMINISTRATOR' : 'CITIZEN'} 
            color={isAdmin ? 'primary' : 'success'}
            sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }}
          />
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5, color: '#0f172a', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {currentUser.name}
        </Typography>
      </Box>

      {/* Flagship Demo Trigger for Admins */}
      {isAdmin && (
        <Box sx={{ p: 1.5 }}>
          <Button 
            fullWidth 
            variant="contained" 
            color="error" 
            size="small"
            startIcon={<PlayIcon />}
            onClick={() => {
              runFlagshipDemo();
              navigate('/admin/simulation');
            }}
            sx={{ 
              fontWeight: 700, 
              fontSize: '0.75rem',
              py: 0.8,
              bgcolor: '#dc2626',
              '&:hover': { bgcolor: '#b91c1c' }
            }}
          >
            RUN DISASTER SCENARIO
          </Button>
        </Box>
      )}

      {/* Navigation List */}
      <List sx={{ px: 1, py: 1, flex: 1, overflowY: 'auto' }}>
        {currentNav.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 1.5,
                  py: 0.75,
                  px: 1.5,
                  bgcolor: isActive ? 'rgba(2, 132, 199, 0.08)' : 'transparent',
                  color: isActive ? '#0284c7' : '#334155',
                  border: isActive ? '1px solid rgba(2, 132, 199, 0.2)' : '1px solid transparent',
                  '&:hover': {
                    bgcolor: 'rgba(2, 132, 199, 0.04)',
                    color: '#0284c7'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: isActive ? '#0284c7' : '#64748b' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  slotProps={{ 
                    primary: {
                      fontSize: '0.825rem', 
                      fontWeight: isActive ? 700 : 500 
                    }
                  }} 
                />
                {item.chip && (
                  <Chip 
                    label={item.chip} 
                    size="small" 
                    sx={{ 
                      height: 18, 
                      fontSize: '0.62rem', 
                      fontWeight: 700,
                      bgcolor: item.chip === 'SOS' ? '#fee2e2' : '#e0f2fe',
                      color: item.chip === 'SOS' ? '#dc2626' : '#0369a1'
                    }} 
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Footer Info */}
      <Box sx={{ p: 2, bgcolor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.68rem', display: 'block' }}>
          SIH 2026 — PS 26178
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 600 }}>
          IRIS Resilience Engine v2.4
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Top Navbar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (th) => th.zIndex.drawer + 1,
          bgcolor: '#ffffff',
          color: '#0f172a',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 }, px: { xs: 1.5, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Box 
              sx={{ display: 'flex', alignItems: 'center', gap: 1.2, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <Box 
                component="img"
                src="/iris-logo.png"
                alt="I R I S"
                sx={{ 
                  width: 36, 
                  height: 36, 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '2px solid #0284c7',
                  boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)'
                }}
              />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a', lineHeight: 1.1, fontSize: '1.15rem', letterSpacing: '0.15em' }}>
                  I R I S
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 600 }}>
                  Intelligent Resilient Infrastructure & Safety
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Center Badges: Provenance & Status */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <Tooltip title="Current System Environment Mode">
              <Chip 
                label={simulation.active ? 'MODE: SIMULATION ACTIVE' : 'MODE: LIVE MONITORING'} 
                size="small"
                sx={{ 
                  fontWeight: 700,
                  bgcolor: simulation.active ? '#fee2e2' : '#f0fdf4',
                  color: simulation.active ? '#dc2626' : '#16a34a',
                  border: `1px solid ${simulation.active ? '#fca5a5' : '#86efac'}`
                }}
              />
            </Tooltip>

            <Tooltip title="Regional Hazard Index">
              <Chip 
                label={`REGIONAL RISK: ${overallRiskLevel}`} 
                size="small"
                sx={{ 
                  fontWeight: 700,
                  bgcolor: overallRiskLevel === 'HIGH' || overallRiskLevel === 'CRITICAL' ? '#fef2f2' : '#fefce8',
                  color: overallRiskLevel === 'HIGH' || overallRiskLevel === 'CRITICAL' ? '#dc2626' : '#ca8a04',
                  border: `1px solid ${overallRiskLevel === 'HIGH' ? '#fca5a5' : '#fef08a'}`
                }}
              />
            </Tooltip>
          </Box>

          {/* Right Controls: Role Switcher, Hotline, User Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Quick Role Toggle button for demonstration */}
            <Tooltip title="Switch between Citizen User and Administrator Operations">
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  const newRole = isAdmin ? 'user' : 'admin';
                  useIrisStore.getState().login(newRole === 'admin' ? 'admin@iris.gov.in' : 'citizen@iris.gov.in', newRole);
                  navigate(newRole === 'admin' ? '/admin/command-center' : '/user/home');
                }}
                sx={{ 
                  borderColor: '#cbd5e1', 
                  color: '#334155', 
                  fontSize: '0.75rem',
                  py: 0.5,
                  px: 1.2
                }}
              >
                Switch to {isAdmin ? 'Citizen View' : 'Admin EOC'}
              </Button>
            </Tooltip>

            {/* Quick Hotline Call */}
            <Tooltip title="Toll-Free Emergency Dispatch Hotline (112)">
              <IconButton 
                sx={{ bgcolor: '#fef2f2', color: '#dc2626', border: '1px solid #fee2e2' }}
                onClick={() => window.open('tel:112')}
              >
                <PhoneIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Profile Avatar */}
            <IconButton onClick={handleProfileMenuOpen} size="small" sx={{ ml: 0.5 }}>
              <Avatar sx={{ width: 34, height: 34, bgcolor: isAdmin ? '#0284c7' : '#16a34a', fontSize: '0.85rem', fontWeight: 700 }}>
                {currentUser.name.charAt(0)}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { mt: 1.2, minWidth: 200, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                  {currentUser.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  {currentUser.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={() => { handleMenuClose(); navigate(isAdmin ? '/admin/command-center' : '/user/profile'); }}>
                Profile & Settings
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); navigate(isAdmin ? '/admin/alerts' : '/user/alerts'); }}>
                Notification Preferences
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: '#dc2626', fontWeight: 600 }}>
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer for Desktop & Mobile */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="iris navigation"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #e2e8f0' },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #e2e8f0', top: 64, height: 'calc(100% - 64px)' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8 },
          minHeight: 'calc(100vh - 64px)',
          bgcolor: '#f8fafc'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
