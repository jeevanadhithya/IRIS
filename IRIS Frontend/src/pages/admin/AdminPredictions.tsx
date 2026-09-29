import React from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  LinearProgress, 
  Divider 
} from '@mui/material';
import { 
  Psychology as AiIcon, 
  WaterDrop as FloodIcon, 
  Terrain as LandslideIcon, 
  LocalFireDepartment as FireIcon, 
  Air as PollutionIcon,
  TrendingUp as TrendUpIcon,
  TrendingDown as TrendDownIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';

export const AdminPredictions: React.FC = () => {
  const { riskAssessments } = useIrisStore();

  const predictionsList = [
    {
      hazard: 'Flash Flood & Inundation Surge',
      probability: 78,
      severity: 'CRITICAL',
      trend: 'up',
      timeframe: 'Next 3 to 6 Hours',
      targetArea: 'Cauvery River Lowlands, Tiruchirappalli',
      factors: [
        'Cloudburst rainfall intensity at 85 mm/hr',
        'Upper catchment dam release rate increasing by 20%',
        'Soil moisture above 88% preventing natural percolation'
      ],
      confidence: 94
    },
    {
      hazard: 'Hillside Slope Failure / Landslide',
      probability: 84,
      severity: 'HIGH',
      trend: 'up',
      timeframe: 'Next 4 to 8 Hours',
      targetArea: 'Nilgiris Upper Ghat Pass, State Highway 17',
      factors: [
        'MEMS inclinometer detecting 3.4° tilt acceleration',
        'Sentinel-2 SAR backscatter showing high surface saturation',
        'Vegetation root shear strength degraded along slope cut'
      ],
      confidence: 91
    },
    {
      hazard: 'Industrial Chemical VOC Dispersion',
      probability: 58,
      severity: 'MODERATE',
      trend: 'stable',
      timeframe: 'Next 12 Hours',
      targetArea: 'Manali Industrial Zone, North Chennai',
      factors: [
        'Low ambient wind speed (6 km/h) causing stagnation',
        'Surface temperature inversion trapping particulates',
        'Refinery VOC emission rate at 14 ppm'
      ],
      confidence: 88
    },
    {
      hazard: 'Forest Fire Ignition Susceptibility',
      probability: 22,
      severity: 'LOW',
      trend: 'down',
      timeframe: 'Monitoring (Next 48 Hours)',
      targetArea: 'Mudumalai Forest Reserve Foothills',
      factors: [
        'High atmospheric humidity (78%) mitigating dry fuel ignite',
        'Continuous precipitation reducing drought code index',
        'Thermal satellite infrared showing zero hot spot anomalies'
      ],
      confidence: 96
    }
  ];

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Multi-Hazard Predictive Risk Intelligence
          </Typography>
          <Chip label="PROVENANCE: PREDICTED" size="small" sx={{ bgcolor: '#ede9fe', color: '#7c3aed', fontWeight: 800 }} />
        </Box>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Coupled hydrological, geotechnical, and atmospheric risk forecasts calculated using physics-based solvers and Gemini intelligence.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {predictionsList.map((pred, idx) => {
          const isCritical = pred.severity === 'CRITICAL';
          const isHigh = pred.severity === 'HIGH';
          const badgeColor = isCritical ? '#dc2626' : isHigh ? '#ea580c' : '#16a34a';

          return (
            <Grid item xs={12} md={6} key={idx}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderLeft: `5px solid ${badgeColor}` }}>
                <CardContent sx={{ p: 3, flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        {pred.hazard}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                        Target: {pred.targetArea}
                      </Typography>
                    </Box>

                    <Chip 
                      label={pred.severity} 
                      size="small" 
                      sx={{ 
                        fontWeight: 800, 
                        fontSize: '0.65rem',
                        bgcolor: isCritical ? '#fee2e2' : isHigh ? '#fff7ed' : '#f0fdf4',
                        color: badgeColor
                      }} 
                    />
                  </Box>

                  {/* Probability Gauge */}
                  <Box sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>
                        Predicted Probability: {pred.probability}%
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0284c7' }}>
                        Confidence: {pred.confidence}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={pred.probability} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4, 
                        bgcolor: '#f1f5f9',
                        '& .MuiLinearProgress-bar': { bgcolor: badgeColor }
                      }} 
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip 
                      label={`Forecast Window: ${pred.timeframe}`} 
                      size="small" 
                      sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#f8fafc', fontWeight: 600 }} 
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {pred.trend === 'up' ? <TrendUpIcon sx={{ color: '#dc2626', fontSize: 16 }} /> : <TrendDownIcon sx={{ color: '#16a34a', fontSize: 16 }} />}
                      <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>Trend: {pred.trend}</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#334155', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                    PRIMARY CONTRIBUTING FACTORS:
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                    {pred.factors.map((factor, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ArrowIcon sx={{ fontSize: 12, color: '#0284c7' }} />
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.8rem' }}>
                          {factor}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
