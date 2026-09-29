import React from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Divider, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Alert 
} from '@mui/material';
import { 
  Navigation as NavigationIcon, 
  Block as BlockIcon, 
  Refresh as RecalculateIcon, 
  DirectionsCar as CarIcon, 
  CheckCircle as SafeIcon,
  WarningAmber as WarningIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';

export const AdminEvacuation: React.FC = () => {
  const { routes, activeRouteId, setActiveRouteId, recalculateRoutesDueToHazard, shelters } = useIrisStore();

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Evacuation Planning & Route Recalculation
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Dynamic risk-weighted routing algorithm. Evaluates real-time flood exposure, slope slip zones, and road closures.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="warning"
          startIcon={<RecalculateIcon />}
          onClick={recalculateRoutesDueToHazard}
          sx={{ fontWeight: 800, bgcolor: '#ea580c', '&:hover': { bgcolor: '#c2410c' } }}
        >
          SIMULATE HAZARD OBSTRUCTION & RECALCULATE
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column: Route Management Table */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                Active Regional Evacuation Corridors
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Corridor Name</TableCell>
                      <TableCell>Destination</TableCell>
                      <TableCell>Distance</TableCell>
                      <TableCell>Travel Time</TableCell>
                      <TableCell>Flood Risk</TableCell>
                      <TableCell>Landslide Risk</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {routes.map((r) => {
                      const isBlocked = r.status === 'BLOCKED' || r.roadBlockage;
                      return (
                        <TableRow 
                          key={r.id} 
                          hover 
                          selected={r.id === activeRouteId}
                          onClick={() => !isBlocked && setActiveRouteId(r.id)}
                          sx={{ cursor: isBlocked ? 'not-allowed' : 'pointer' }}
                        >
                          <TableCell sx={{ fontWeight: 700, color: isBlocked ? '#dc2626' : '#0f172a' }}>
                            {r.name}
                          </TableCell>
                          <TableCell sx={{ color: '#64748b' }}>{r.destination}</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>{r.distanceKm} km</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>~{r.estimatedTimeMin} min</TableCell>
                          <TableCell>
                            <Chip 
                              label={r.floodExposure} 
                              size="small" 
                              sx={{ 
                                height: 20, 
                                fontSize: '0.65rem',
                                bgcolor: r.floodExposure === 'Low' ? '#f0fdf4' : '#fff7ed',
                                color: r.floodExposure === 'Low' ? '#16a34a' : '#ea580c'
                              }} 
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={r.landslideExposure} 
                              size="small" 
                              sx={{ 
                                height: 20, 
                                fontSize: '0.65rem',
                                bgcolor: r.landslideExposure === 'Low' ? '#f0fdf4' : '#fef2f2',
                                color: r.landslideExposure === 'Low' ? '#16a34a' : '#dc2626'
                              }} 
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={r.status} 
                              size="small" 
                              sx={{ 
                                height: 20, 
                                fontSize: '0.65rem', 
                                fontWeight: 800,
                                bgcolor: isBlocked ? '#fee2e2' : r.status === 'RECOMMENDED' ? '#e0f2fe' : '#f0fdf4',
                                color: isBlocked ? '#dc2626' : r.status === 'RECOMMENDED' ? '#0369a1' : '#16a34a'
                              }} 
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Tradeoff Explanation */}
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                Route Optimization Trade-off Architecture
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                Unlike naive shortest-path algorithms, IRIS uses a non-linear Risk-Exposure Cost Function:
              </Typography>
              <Box sx={{ p: 1.5, my: 1.5, bgcolor: '#f8fafc', borderRadius: 1.5, border: '1px solid #e2e8f0', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                Cost = Distance + w₁·(FloodDepth²) + w₂·(SlopeInstability) + w₃·(RoadFissures)
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                When hazard thresholds are exceeded on Corridor Alpha, the weight spikes to infinity, instantly routing evacuees onto Corridor Beta.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Dynamic GIS Trajectory View */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                Geospatial Corridor Visualization
              </Typography>

              <Box sx={{ width: '100%', height: 380, bgcolor: '#f1f5f9', borderRadius: 2, border: '1px solid #cbd5e1', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 500 380">
                  {/* Contour Curves */}
                  <path d="M 0 100 Q 250 80 500 120" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                  <path d="M 0 240 Q 250 200 500 260" fill="none" stroke="#e2e8f0" strokeWidth="2" />

                  {/* Blocked Route Alpha (Red Dashed) */}
                  <path d="M 60 320 Q 180 220 280 180 T 440 60" fill="none" stroke="#dc2626" strokeWidth="4" strokeDasharray="6 4" opacity="0.6" />

                  {/* Active Bypass Corridor Beta (Green Thick) */}
                  <path d="M 60 320 Q 220 360 360 330 T 440 60" fill="none" stroke="#16a34a" strokeWidth="6" strokeDasharray="8 4" />

                  {/* Blockage Obstacle */}
                  <g transform="translate(280, 180)">
                    <circle cx="0" cy="0" r="14" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
                    <text x="-6" y="5" fill="#dc2626" fontSize="16" fontWeight="900">✕</text>
                    <text x="-40" y="24" fill="#dc2626" fontSize="10" fontWeight="800">SLIP CLOSURE</text>
                  </g>

                  {/* Origin */}
                  <circle cx="60" cy="320" r="10" fill="#0284c7" stroke="#fff" strokeWidth="2" />
                  <text x="30" y="345" fill="#0f172a" fontSize="11" fontWeight="800">CITIZEN SECTOR</text>

                  {/* Destination Shelter */}
                  <circle cx="440" cy="60" r="12" fill="#16a34a" stroke="#fff" strokeWidth="2.5" />
                  <text x="370" y="45" fill="#15803d" fontSize="11" fontWeight="800">SHELTER 02</text>
                </svg>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
