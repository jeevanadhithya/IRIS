import React from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Divider 
} from '@mui/material';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export const AdminAnalytics: React.FC = () => {
  const monthlyIncidents = [
    { month: 'Jan', flood: 12, landslide: 5, fire: 2, pollution: 8 },
    { month: 'Feb', flood: 8, landslide: 3, fire: 4, pollution: 10 },
    { month: 'Mar', flood: 14, landslide: 6, fire: 7, pollution: 9 },
    { month: 'Apr', flood: 22, landslide: 12, fire: 12, pollution: 6 },
    { month: 'May', flood: 28, landslide: 15, fire: 18, pollution: 5 },
    { month: 'Jun', flood: 36, landslide: 22, fire: 6, pollution: 4 },
    { month: 'Jul', flood: 45, landslide: 28, fire: 3, pollution: 4 },
    { month: 'Aug', flood: 42, landslide: 25, fire: 2, pollution: 5 },
    { month: 'Sep', flood: 34, landslide: 18, fire: 4, pollution: 7 },
    { month: 'Oct', flood: 26, landslide: 12, fire: 8, pollution: 12 },
    { month: 'Nov', flood: 18, landslide: 8, fire: 6, pollution: 15 },
    { month: 'Dec', flood: 11, landslide: 4, fire: 3, pollution: 14 },
  ];

  const hazardDistribution = [
    { name: 'Flash Floods', value: 296, color: '#0284c7' },
    { name: 'Landslides', value: 158, color: '#ea580c' },
    { name: 'Air / Chemical Pollution', value: 98, color: '#7c3aed' },
    { name: 'Forest Fires', value: 75, color: '#dc2626' }
  ];

  const accuracyData = [
    { month: 'Jun', accuracy: 88 },
    { month: 'Jul', accuracy: 91 },
    { month: 'Aug', accuracy: 93 },
    { month: 'Sep', accuracy: 89 },
    { month: 'Oct', accuracy: 92 },
    { month: 'Nov', accuracy: 94 }
  ];

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
          Historical Environmental & Operational Analytics
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
          Multi-hazard frequency curves, predictive model accuracy benchmarks, and disaster distribution profiles.
        </Typography>
      </Box>

      {/* Main Area: 12-Month Hazard Trends */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                12-Month Multi-Hazard Frequency Distribution
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Annual monsoon precipitation peaks correlate with elevated flood and slope failure rates.
              </Typography>
            </Box>
            <Chip label="PROVENANCE: HISTORICAL" size="small" sx={{ fontWeight: 700, bgcolor: '#f1f5f9' }} />
          </Box>

          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyIncidents}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Legend />
                <Area type="monotone" dataKey="flood" name="Flash Floods" stroke="#0284c7" fill="rgba(2, 132, 199, 0.2)" strokeWidth={2} />
                <Area type="monotone" dataKey="landslide" name="Landslides" stroke="#ea580c" fill="rgba(234, 88, 12, 0.2)" strokeWidth={2} />
                <Area type="monotone" dataKey="fire" name="Forest Fires" stroke="#dc2626" fill="rgba(220, 38, 38, 0.2)" strokeWidth={2} />
                <Area type="monotone" dataKey="pollution" name="Air Pollution" stroke="#7c3aed" fill="rgba(124, 58, 237, 0.2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Pie Chart: Hazard Shares */}
        <Grid xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                Hazard Distribution Proportions
              </Typography>
              <Box sx={{ width: '100%', height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={hazardDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                      {hazardDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart: Predictive Accuracy */}
        <Grid xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                IRIS Predictive Engine Accuracy Trend (%)
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2 }}>
                Evaluates predicted hazard threshold arrivals against verified ground sensor telemetry.
              </Typography>

              <Box sx={{ width: '100%', height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} domain={[70, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="accuracy" name="Model Accuracy %" fill="#0284c7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
