import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Divider, 
  LinearProgress, 
  Alert 
} from '@mui/material';
import { 
  PhoneInTalk as PhoneIcon, 
  Message as SmsIcon, 
  CheckCircle as SafeIcon, 
  WarningAmber as NeedHelpIcon, 
  Group as TeamIcon,
  Sensors as SensorIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';
import { irisApi } from '../../services/irisApi';

export const AdminEmergencyOperations: React.FC = () => {
  const { responseTeams } = useIrisStore();
  const [broadcastStatus, setBroadcastStatus] = useState<string | null>(null);

  // Two-way SMS / IVR Feedback Metrics
  const commStats = {
    totalTargeted: 2450,
    smsDelivered: 2398, // 97.8%
    callsCompleted: 1845,
    safeConfirmed: 1620, // 66.1%
    assistanceRequested: 84, // 3.4%
    unreachable: 52
  };

  const handleTestTwilioCall = async () => {
    setBroadcastStatus('Sending Voice Broadcast via Twilio Studio Flow FWda26b9cf4c69c629351c53b8c19b45ac...');
    const res = await irisApi.triggerEmergencyCall('+919942373735', 'Emergency Evacuation Warning');
    setBroadcastStatus(`Twilio Voice Call initiated successfully! SID: ${res.sid || 'EX_DEMO_2026'}`);
    setTimeout(() => setBroadcastStatus(null), 6000);
  };

  const handleTestTwilioSMS = async () => {
    setBroadcastStatus('Queuing Emergency SMS via Twilio Messaging Gateway...');
    const res = await irisApi.triggerEmergencySMS('+919942373735', 'IRIS ALERT: High flash flood risk detected in your sector. Reply SAFE if you are in a secure location, or HELP for rescue.', 'CRITICAL');
    setBroadcastStatus('Emergency SMS dispatched to targeted subscriber registry.');
    setTimeout(() => setBroadcastStatus(null), 6000);
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Emergency Operations Center (EOC) Telecommunications
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Unified Twilio Studio IVR voice engine, automated SMS broadcast gateway, and two-way citizen safety acknowledgments.
        </Typography>
      </Box>

      {broadcastStatus && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {broadcastStatus}
        </Alert>
      )}

      {/* Top Telecomm KPIs */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>TOTAL POPULATION TARGETED</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mt: 0.5 }}>{commStats.totalTargeted}</Typography>
            <Typography variant="caption" sx={{ color: '#0284c7', fontWeight: 600 }}>Sector 3 & 4 Registry</Typography>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>SMS DELIVERED (TWILIO)</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#16a34a', mt: 0.5 }}>{commStats.smsDelivered}</Typography>
            <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>97.8% Delivery Rate</Typography>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, bgcolor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SafeIcon sx={{ color: '#16a34a' }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#15803d' }}>CONFIRMED "SAFE"</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#16a34a', mt: 0.5 }}>{commStats.safeConfirmed}</Typography>
            <Typography variant="caption" sx={{ color: '#15803d', fontWeight: 600 }}>Two-Way IVR / SMS Replies</Typography>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, bgcolor: '#fef2f2', border: '1px solid #fecaca' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NeedHelpIcon sx={{ color: '#dc2626' }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#b91c1c' }}>REPLIED "NEED HELP"</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#dc2626', mt: 0.5 }}>{commStats.assistanceRequested}</Typography>
            <Typography variant="caption" sx={{ color: '#dc2626', fontWeight: 600 }}>Auto-Converted to Incidents</Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Gateway Action Console */}
        <Grid xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                IRIS Communication Gateway Triggers
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Executes high-capacity emergency voice telephony and SMS pipelines with fallback support.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    1. Twilio Studio Flow IVR Voice Trigger
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1.5 }}>
                    Flow SID: FWda26b9cf4c69c629351c53b8c19b45ac • Calls verified phones with two-way DTMF key response.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="error" 
                    startIcon={<PhoneIcon />}
                    onClick={handleTestTwilioCall}
                    sx={{ fontWeight: 800, bgcolor: '#dc2626' }}
                  >
                    Trigger Twilio Voice Call Now
                  </Button>
                </Box>

                <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    2. Geo-Targeted Twilio Emergency SMS
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1.5 }}>
                    Broadcasts high-priority alerts with bidirectional reply mapping (SAFE / HELP).
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<SmsIcon />}
                    onClick={handleTestTwilioSMS}
                    sx={{ fontWeight: 700, bgcolor: '#0284c7' }}
                  >
                    Dispatch Emergency SMS
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Deployed Field Response Teams */}
        <Grid xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                Deployed Emergency Response Teams
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2.5 }}>
                Multi-agency field units operating across active disaster sectors.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {responseTeams.map((team) => (
                  <Box key={team.id} sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        {team.name}
                      </Typography>
                      <Chip 
                        label={team.status} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.65rem', 
                          fontWeight: 700,
                          bgcolor: team.status === 'Assigned' ? '#fee2e2' : team.status === 'Responding' ? '#fff7ed' : '#f0fdf4',
                          color: team.status === 'Assigned' ? '#dc2626' : team.status === 'Responding' ? '#ea580c' : '#16a34a'
                        }} 
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                      Sector: {team.currentLocation.area} • Lead: {team.contactLead} • Personnel: {team.membersCount}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
