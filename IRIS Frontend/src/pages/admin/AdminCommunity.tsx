import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton 
} from '@mui/material';
import { 
  Verified as VerifyIcon, 
  Check as AcceptIcon, 
  Close as RejectIcon,
  Sensors as SensorIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';

export const AdminCommunity: React.FC = () => {
  const { communityReports, verifyCommunityReport } = useIrisStore();

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Community Intelligence Verification Desk
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Corroborate citizen crowdsourced observations against nearby IoT sensors, hydrological stations, and satellite passes.
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report ID</TableCell>
                  <TableCell>Reporter & Sector</TableCell>
                  <TableCell>Hazard Category</TableCell>
                  <TableCell>Observation Details</TableCell>
                  <TableCell>Sensor Corroboration</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Verification Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {communityReports.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell sx={{ fontWeight: 800, color: '#0f172a' }}>{report.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        {report.reporterName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {report.location.address}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={report.subCategory} size="small" sx={{ fontSize: '0.65rem', fontWeight: 700 }} />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 320, color: '#334155', fontSize: '0.825rem' }}>
                      {report.description}
                    </TableCell>
                    <TableCell>
                      {report.corroborated ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#16a34a' }}>
                          <VerifyIcon sx={{ fontSize: 16 }} />
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>Corroborated</Typography>
                        </Box>
                      ) : (
                        <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600 }}>Uncorroborated</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={report.status} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.65rem',
                          bgcolor: report.status === 'Verified' ? '#f0fdf4' : '#fffbeb',
                          color: report.status === 'Verified' ? '#16a34a' : '#d97706'
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      {report.status !== 'Verified' && (
                        <Button 
                          size="small" 
                          variant="contained" 
                          startIcon={<VerifyIcon />}
                          onClick={() => verifyCommunityReport(report.id, true, 'Corroborated by EOC Admin.')}
                          sx={{ fontSize: '0.72rem', py: 0.4, bgcolor: '#16a34a', '&:hover': { bgcolor: '#15803d' } }}
                        >
                          Verify & Corroborate
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};
