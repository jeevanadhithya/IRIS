import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { irisTheme } from './theme/irisMaterialTheme';
import { IrisAppShell } from './components/layout/IrisAppShell';
import { io } from 'socket.io-client';
import { useIrisStore } from './store/irisStore';

// Auth & Public Pages
import { Index } from './pages/Index';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import NotFound from './pages/NotFound';

// Citizen User Pages
import { UserHome } from './pages/user/UserHome';
import { UserConditions } from './pages/user/UserConditions';
import { UserAlerts } from './pages/user/UserAlerts';
import { UserSafeRoute } from './pages/user/UserSafeRoute';
import { UserShelters } from './pages/user/UserShelters';
import { UserReport } from './pages/user/UserReport';
import { UserMyReports } from './pages/user/UserMyReports';
import { UserCommunity } from './pages/user/UserCommunity';
import { UserNeedHelp } from './pages/user/UserNeedHelp';
import { UserMap } from './pages/user/UserMap';
import { UserSafetyGuides } from './pages/user/UserSafetyGuides';
import { UserProfile } from './pages/user/UserProfile';

// Admin EOC Pages
import { AdminCommandCenter } from './pages/admin/AdminCommandCenter';
import { AdminDigitalTwin } from './pages/admin/AdminDigitalTwin';
import { AdminSimulation } from './pages/admin/AdminSimulation';
import { AdminEvacuation } from './pages/admin/AdminEvacuation';
import { AdminLiveMonitoring } from './pages/admin/AdminLiveMonitoring';
import { AdminAlerts } from './pages/admin/AdminAlerts';
import { AdminShelters } from './pages/admin/AdminShelters';
import { AdminIncidents } from './pages/admin/AdminIncidents';
import { AdminCommunity } from './pages/admin/AdminCommunity';
import { AdminEmergencyOperations } from './pages/admin/AdminEmergencyOperations';
import { AdminSensors } from './pages/admin/AdminSensors';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminPredictions } from './pages/admin/AdminPredictions';
import { AdminAiAssistant } from './pages/admin/AdminAiAssistant';
import { AdminSystem } from './pages/admin/AdminSystem';

export const App: React.FC = () => {
  const { addIncident } = useIrisStore();

  useEffect(() => {
    const socket = io('https://iris-backend-sih.vercel.app', { transports: ['websocket', 'polling'] });
    socket.on('sos_triggered', (alert: any) => {
      addIncident({
        title: `SOS Alert: ${alert.place || 'Citizen Dispatch'}`,
        category: 'EMERGENCY_SOS' as any,
        location: { 
          latitude: alert.latitude || 30.52, 
          longitude: alert.longitude || 79.07, 
          address: alert.place || 'Unknown Location' 
        },
        severity: 'CRITICAL',
        description: alert.message || 'Emergency assistance requested via citizen safety app.',
        status: 'Reported',
        peopleCount: 1,
        medicalUrgency: true,
        source: 'COMMUNITY',
        reporter: { name: 'Citizen via App', phone: 'SYSTEM' }
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={irisTheme}>
      <CssBaseline />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public / Auth routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Citizen User Experience */}
          <Route
            path="/user/*"
            element={
              <IrisAppShell>
                <Routes>
                  <Route path="home" element={<UserHome />} />
                  <Route path="conditions" element={<UserConditions />} />
                  <Route path="alerts" element={<UserAlerts />} />
                  <Route path="safe-route" element={<UserSafeRoute />} />
                  <Route path="shelters" element={<UserShelters />} />
                  <Route path="report" element={<UserReport />} />
                  <Route path="my-reports" element={<UserMyReports />} />
                  <Route path="community" element={<UserCommunity />} />
                  <Route path="need-help" element={<UserNeedHelp />} />
                  <Route path="map" element={<UserMap />} />
                  <Route path="safety-guides" element={<UserSafetyGuides />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="*" element={<Navigate to="/user/home" replace />} />
                </Routes>
              </IrisAppShell>
            }
          />

          {/* Admin Emergency Operations Center (EOC) */}
          <Route
            path="/admin/*"
            element={
              <IrisAppShell>
                <Routes>
                  <Route path="command-center" element={<AdminCommandCenter />} />
                  <Route path="digital-twin" element={<AdminDigitalTwin />} />
                  <Route path="simulation" element={<AdminSimulation />} />
                  <Route path="evacuation" element={<AdminEvacuation />} />
                  <Route path="live-monitoring" element={<AdminLiveMonitoring />} />
                  <Route path="alerts" element={<AdminAlerts />} />
                  <Route path="shelters" element={<AdminShelters />} />
                  <Route path="incidents" element={<AdminIncidents />} />
                  <Route path="community" element={<AdminCommunity />} />
                  <Route path="emergency-operations" element={<AdminEmergencyOperations />} />
                  <Route path="sensors" element={<AdminSensors />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="predictions" element={<AdminPredictions />} />
                  <Route path="ai-assistant" element={<AdminAiAssistant />} />
                  <Route path="system" element={<AdminSystem />} />
                  <Route path="*" element={<Navigate to="/admin/command-center" replace />} />
                </Routes>
              </IrisAppShell>
            }
          />

          {/* Backward compatibility aliases */}
          <Route path="/dashboard" element={<Navigate to="/admin/command-center" replace />} />
          <Route path="/predictions" element={<Navigate to="/admin/predictions" replace />} />
          <Route path="/analytics" element={<Navigate to="/admin/analytics" replace />} />
          <Route path="/alerts" element={<Navigate to="/admin/alerts" replace />} />
          <Route path="/detections" element={<Navigate to="/admin/live-monitoring" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
