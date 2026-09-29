import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Slider, 
  TextField, 
  MenuItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Divider, 
  Alert 
} from '@mui/material';
import { 
  PlayArrow as PlayIcon, 
  Pause as PauseIcon, 
  RestartAlt as ResetIcon, 
  Science as SimIcon, 
  Sensors as SensorIcon, 
  WarningAmber as WarningIcon, 
  CompareArrows as CompareIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';

export const AdminSimulation: React.FC = () => {
  const { 
    simulation, 
    startSimulation, 
    pauseSimulation, 
    resetSimulation, 
    advanceSimulationStep, 
    setSimulationSpeed, 
    runFlagshipDemo 
  } = useIrisStore();

  const [rainfallInput, setRainfallInput] = useState(simulation.parameters.rainfallMmHr);
  const [selectedHazard, setSelectedHazard] = useState('cascading_multi_hazard');
  const [activeTab, setActiveTab] = useState<'CONSOLE' | 'WHAT_IF' | 'BEFORE_AFTER'>('CONSOLE');

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
              Disaster Simulation & Virtual Catchment Center
            </Typography>
            <Chip 
              label={simulation.active ? 'SIMULATION RUNNING' : 'SIMULATION STANDBY'} 
              size="small" 
              sx={{ 
                fontWeight: 800,
                bgcolor: simulation.active ? '#fee2e2' : '#f1f5f9',
                color: simulation.active ? '#dc2626' : '#475569'
              }} 
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Synthesize extreme meteorological and geological events. Generates synchronized virtual sensor nodes to evaluate early warning and evacuation resilience.
          </Typography>
        </Box>

        {/* Flagship Runner */}
        <Button
          variant="contained"
          color="error"
          size="large"
          startIcon={<PlayIcon />}
          onClick={runFlagshipDemo}
          sx={{ fontWeight: 800, bgcolor: '#dc2626', '&:hover': { bgcolor: '#b91c1c' } }}
        >
          RUN 1-CLICK DEMO SCENARIO
        </Button>
      </Box>

      {/* Mode Navigation Tabs */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Button 
          variant={activeTab === 'CONSOLE' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('CONSOLE')}
          sx={{ fontWeight: 700 }}
        >
          Simulation Console
        </Button>
        <Button 
          variant={activeTab === 'WHAT_IF' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('WHAT_IF')}
          sx={{ fontWeight: 700 }}
        >
          What-If Scenario Comparison
        </Button>
        <Button 
          variant={activeTab === 'BEFORE_AFTER' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('BEFORE_AFTER')}
          sx={{ fontWeight: 700 }}
        >
          Before / After Split Assessment
        </Button>
      </Box>

      {activeTab === 'CONSOLE' && (
        <Grid container spacing={3}>
          {/* Left Column: Timeline & Live Event Progression */}
          <Grid item xs={12} lg={8}>
            {/* Timeline Stepper Controls */}
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                    Simulation Time Progression
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {[1, 2, 5, 10].map((spd) => (
                      <Button
                        key={spd}
                        size="small"
                        variant={simulation.speedMultiplier === spd ? 'contained' : 'outlined'}
                        onClick={() => setSimulationSpeed(spd)}
                        sx={{ minWidth: 42, height: 26, fontSize: '0.7rem', fontWeight: 700 }}
                      >
                        {spd}x
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Step Pills */}
                <Grid container spacing={1.5} sx={{ mb: 3 }}>
                  {['T+00 (Baseline)', 'T+15 (Rain Surge)', 'T+30 (Landslide)', 'T+45 (Flash Flood)', 'T+60 (Impact)'].map((stepLabel, idx) => {
                    const isPassed = simulation.currentStep >= idx;
                    const isCurrent = simulation.currentStep === idx;
                    return (
                      <Grid item xs={12} sm={2.4} key={idx}>
                        <Box
                          onClick={() => advanceSimulationStep(idx)}
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            cursor: 'pointer',
                            textAlign: 'center',
                            border: isCurrent ? '2px solid #0284c7' : '1px solid #e2e8f0',
                            bgcolor: isCurrent ? '#f0f9ff' : isPassed ? '#f8fafc' : '#ffffff',
                            color: isCurrent ? '#0284c7' : '#0f172a'
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 800, display: 'block' }}>
                            STAGE {idx}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                            {stepLabel}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Play / Advance Controls */}
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    startIcon={simulation.active ? <PauseIcon /> : <PlayIcon />}
                    onClick={() => simulation.active ? pauseSimulation() : startSimulation()}
                    sx={{ bgcolor: '#0284c7', fontWeight: 700 }}
                  >
                    {simulation.active ? 'Pause Scenario' : 'Play Timeline'}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<ResetIcon />}
                    onClick={resetSimulation}
                    sx={{ borderColor: '#cbd5e1', fontWeight: 700, color: '#334155' }}
                  >
                    Reset Baseline
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => advanceSimulationStep()}
                    disabled={simulation.currentStep >= simulation.totalSteps}
                    sx={{ fontWeight: 700 }}
                  >
                    Next Step (+15m) →
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Event Log & Physics Narrative */}
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                  Simulation Event Narrative Log
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: 260, overflowY: 'auto' }}>
                  {simulation.eventLog.map((log, idx) => (
                    <Box 
                      key={idx} 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        border: '1px solid #e2e8f0', 
                        bgcolor: log.severity === 'CRITICAL' ? '#fef2f2' : log.severity === 'HIGH' ? '#fff7ed' : '#f8fafc',
                        borderLeft: `5px solid ${log.severity === 'CRITICAL' ? '#dc2626' : log.severity === 'HIGH' ? '#ea580c' : '#0284c7'}`
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Chip 
                          label={log.timeLabel} 
                          size="small" 
                          sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, bgcolor: '#0f172a', color: '#fff' }} 
                        />
                        <Chip 
                          label={`SEVERITY: ${log.severity}`} 
                          size="small" 
                          sx={{ height: 18, fontSize: '0.62rem', fontWeight: 700 }} 
                        />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                        {log.message}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Virtual Sensor Telemetry Table */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                      Active Virtual Catchment Sensors
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      Synthesized sensor feeds injected directly into the IRIS Risk Engine.
                    </Typography>
                  </Box>
                  <Chip label="PROVENANCE: SIMULATION" size="small" sx={{ bgcolor: '#f5f3ff', color: '#7c3aed', fontWeight: 800 }} />
                </Box>

                {simulation.virtualSensors.length === 0 ? (
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    Advance the timeline to T+15 or T+30 to trigger virtual sensor spawning.
                  </Alert>
                ) : (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Virtual Node ID</TableCell>
                          <TableCell>Catchment Sector</TableCell>
                          <TableCell>Rainfall (mm/h)</TableCell>
                          <TableCell>Soil Saturation</TableCell>
                          <TableCell>Water / Tilt</TableCell>
                          <TableCell>Risk State</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {simulation.virtualSensors.map((vs) => (
                          <TableRow key={vs.id} hover>
                            <TableCell sx={{ fontWeight: 800, color: '#7c3aed' }}>{vs.id}</TableCell>
                            <TableCell>{vs.location.area}</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>{vs.currentReading.rainfall ?? '--'}</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#dc2626' }}>{vs.currentReading.soilMoisture ?? '--'}%</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>
                              {vs.currentReading.tilt ? `${vs.currentReading.tilt}° Tilt` : `${vs.currentReading.waterLevel}m Depth`}
                            </TableCell>
                            <TableCell>
                              <Chip label="CRITICAL ALERT" size="small" sx={{ height: 18, fontSize: '0.62rem', bgcolor: '#fee2e2', color: '#dc2626', fontWeight: 800 }} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column: Scenario Configurator & Impact Summary */}
          <Grid item xs={12} lg={4}>
            {/* Scenario Builder Card */}
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                  Scenario Parameter Controls
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Primary Hazard Model"
                    value={selectedHazard}
                    onChange={(e) => setSelectedHazard(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="cascading_multi_hazard">Cascading: Rain → Landslide → Flood</MenuItem>
                    <MenuItem value="flash_flood">Flash Flood & River Swell</MenuItem>
                    <MenuItem value="landslide">Slope Instability & Debris Flow</MenuItem>
                    <MenuItem value="forest_fire">Forest Fire & Smoke Inversion</MenuItem>
                    <MenuItem value="chemical_leak">Industrial Chemical Vapor Dispersion</MenuItem>
                  </TextField>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>
                      Rainfall Intensity ({rainfallInput} mm/hr)
                    </Typography>
                    <Slider
                      value={rainfallInput}
                      min={10}
                      max={150}
                      onChange={(_, val) => setRainfallInput(val as number)}
                      sx={{ color: '#0284c7' }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>
                      Soil Moisture Saturation ({simulation.parameters.soilSaturationPercent}%)
                    </Typography>
                    <Slider
                      value={simulation.parameters.soilSaturationPercent}
                      min={20}
                      max={100}
                      disabled
                      sx={{ color: '#ea580c' }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Impact Metric Cards */}
            <Card sx={{ bgcolor: '#f8fafc', border: '1px solid #cbd5e1' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                  Dynamic Hazard Impact Engine
                </Typography>

                <Grid container spacing={1.5}>
                  <Grid item xs={6}>
                    <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>Inundation Area</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#0284c7' }}>
                        {simulation.impactMetrics.affectedAreaSqKm} km²
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>Buildings Exposed</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        {simulation.impactMetrics.buildingsExposed}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>Severed Roads</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#dc2626' }}>
                        {simulation.impactMetrics.roadsBlockedCount}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ p: 1.5, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>Pop. at Risk</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#ea580c' }}>
                        {simulation.impactMetrics.populationAtRisk}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 'WHAT_IF' && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            What-If Scenario Evaluation (Scenario A vs. Scenario B)
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
            Compare disaster impact envelopes under differing meteorological and engineering assumptions.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2.5, bgcolor: '#f0f9ff', borderRadius: 2, border: '1px solid #bae6fd' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0369a1', mb: 1 }}>
                  Scenario A: Baseline 50 mm/hr Cloudburst
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Flood Extent: 4.8 km²</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Severed Roads: 1 corridor (Highway 17)</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Shelter Demand: 650 beds (Within single shelter capacity)</Typography>
                <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 700 }}>Manageable with localized field teams.</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2.5, bgcolor: '#fef2f2', borderRadius: 2, border: '1px solid #fecaca' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#b91c1c', mb: 1 }}>
                  Scenario B: Catastrophic 110 mm/hr Compound Cloudburst
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Flood Extent: 22.4 km² (+360%)</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Severed Roads: 3 corridors (Requires Bypass Expressway)</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Shelter Demand: 2,150 beds (Requires multi-hub activation)</Typography>
                <Typography variant="caption" sx={{ color: '#dc2626', fontWeight: 700 }}>Critical: Immediate inter-agency NDRF mobilization required.</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      {activeTab === 'BEFORE_AFTER' && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            Before / After Environmental Assessment
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#16a34a', mb: 1 }}>BEFORE DISASTER</Typography>
                <Typography variant="body2">• River Level: 1.2m (Normal discharge)</Typography>
                <Typography variant="body2">• Slope Stability: 92% (Zero ground displacement)</Typography>
                <Typography variant="body2">• All arterial corridors clear for transit</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: '#fef2f2', borderRadius: 2, border: '1px solid #fecaca' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#dc2626', mb: 1 }}>AFTER SIMULATED CASCADING IMPACT</Typography>
                <Typography variant="body2">• River Level: 3.8m (Exceeding critical threshold)</Typography>
                <Typography variant="body2">• Slope Stability: 15% (12,000 m³ debris collapse)</Typography>
                <Typography variant="body2">• Highway 17 severed; traffic rerouted to Ridge Bypass</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
    </Box>
  );
};
