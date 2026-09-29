import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Button, 
  Avatar, 
  Divider, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import { 
  ThumbUp as LikeIcon, 
  Verified as VerifiedIcon, 
  Add as AddIcon, 
  LocationOn as LocationIcon, 
  AccessTime as TimeIcon,
  Sensors as SensorIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useIrisStore } from '../../store/irisStore';

export const UserCommunity: React.FC = () => {
  const navigate = useNavigate();
  const { communityReports } = useIrisStore();

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            IRIS Community Intelligence
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Verified crowdsourced environmental observations corroborated with nearby IoT sensor telemetry and satellite passes.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/user/report')}
          sx={{ bgcolor: '#0284c7', fontWeight: 700 }}
        >
          Submit Observation
        </Button>
      </Box>

      {/* Feed Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {communityReports.map((report) => (
          <Card key={report.id} sx={{ borderRadius: 2.5 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: '#0284c7', fontSize: '0.85rem', fontWeight: 700 }}>
                    {report.reporterName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      {report.reporterName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      {report.location.address} • {report.timestamp}
                    </Typography>
                  </Box>
                </Box>

                <Chip 
                  label={report.category} 
                  size="small" 
                  sx={{ fontSize: '0.65rem', fontWeight: 700, bgcolor: '#f1f5f9', color: '#475569' }} 
                />
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                {report.subCategory}
              </Typography>
              <Typography variant="body2" sx={{ color: '#334155', mb: 2, lineHeight: 1.5 }}>
                {report.description}
              </Typography>

              {/* Corroboration Badge & Telemetry link */}
              {report.corroborated && (
                <Box sx={{ p: 1.5, mb: 2, bgcolor: '#f0fdf4', borderRadius: 1.5, border: '1px solid #bbf7d0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.3 }}>
                    <VerifiedIcon sx={{ color: '#16a34a', fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      CORROBORATED ENVIRONMENTAL REPORT
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#166534', display: 'block' }}>
                    {report.corroborationDetails}
                  </Typography>
                  {report.nearbySensors && (
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.8 }}>
                      {report.nearbySensors.map(s => (
                        <Chip key={s} icon={<SensorIcon sx={{ fontSize: 12 }} />} label={`Telemetry Node: ${s}`} size="small" sx={{ fontSize: '0.62rem', height: 18 }} />
                      ))}
                    </Box>
                  )}
                </Box>
              )}

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button size="small" startIcon={<LikeIcon />} sx={{ color: '#64748b', fontWeight: 600 }}>
                  Confirm / Endorse ({report.likes})
                </Button>
                <Chip 
                  label={`STATUS: ${report.status}`} 
                  size="small" 
                  sx={{ 
                    height: 20, 
                    fontSize: '0.65rem', 
                    fontWeight: 700,
                    bgcolor: report.status === 'Resolved' ? '#f0fdf4' : '#fffbeb',
                    color: report.status === 'Resolved' ? '#16a34a' : '#d97706'
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
