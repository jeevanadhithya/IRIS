import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Divider, 
  Button,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  Add as AddIcon, 
  LocationOn as LocationIcon, 
  AccessTime as TimeIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';

export const UserMyReports: React.FC = () => {
  const navigate = useNavigate();
  const { communityReports, currentUser } = useIrisStore();

  const myReports = communityReports.filter(r => r.reporterName === currentUser.name || r.reporterName === 'Karthik S.');
  const steps = ['Submitted', 'Verified', 'Assigned', 'In Progress', 'Resolved'];

  const getActiveStep = (status: string) => {
    return Math.max(0, steps.indexOf(status));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            My Hazard Reports
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Live status of your submitted environmental and emergency observations.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/user/report')}
          sx={{ bgcolor: '#0284c7', fontWeight: 700 }}
        >
          New Report
        </Button>
      </Box>

      {myReports.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            You haven't submitted any incident reports yet.
          </Typography>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {myReports.map((report) => (
            <Card key={report.id} sx={{ borderRadius: 2.5 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label={report.category} size="small" sx={{ fontSize: '0.65rem', fontWeight: 700, bgcolor: '#f1f5f9' }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>
                        {report.subCategory} ({report.id})
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationIcon sx={{ fontSize: 15, color: '#64748b' }} />
                        <Typography variant="caption" sx={{ color: '#64748b' }}>{report.location.address}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TimeIcon sx={{ fontSize: 15, color: '#64748b' }} />
                        <Typography variant="caption" sx={{ color: '#64748b' }}>{report.timestamp}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Chip 
                    label={report.status} 
                    size="small" 
                    sx={{ 
                      fontWeight: 800,
                      bgcolor: report.status === 'Resolved' ? '#f0fdf4' : '#fffbeb',
                      color: report.status === 'Resolved' ? '#16a34a' : '#d97706',
                      border: `1px solid ${report.status === 'Resolved' ? '#bbf7d0' : '#fde68a'}`
                    }} 
                  />
                </Box>

                <Typography variant="body2" sx={{ color: '#334155', mb: 2 }}>
                  {report.description}
                </Typography>

                {report.corroborated && (
                  <Box sx={{ p: 1.2, mb: 2, bgcolor: '#f0fdf4', borderRadius: 1.5, border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VerifiedIcon sx={{ color: '#16a34a', fontSize: 18 }} />
                    <Typography variant="caption" sx={{ color: '#15803d', fontWeight: 600 }}>
                      {report.corroborationDetails}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 1.5 }} />

                {/* Status Stepper */}
                <Box sx={{ mt: 1.5 }}>
                  <Stepper activeStep={getActiveStep(report.status)} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};
