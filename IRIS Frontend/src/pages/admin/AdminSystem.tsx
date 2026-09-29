import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Switch,
  FormControlLabel,
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
  Settings as SystemIcon,
  CloudQueue as CloudIcon,
  Memory as EdgeIcon,
  WifiTethering as LoRaIcon,
  Storage as DbIcon,
  PhoneInTalk as TwilioIcon,
  Security as SecurityIcon,
  Refresh as RefreshIcon,
  CheckCircle as OkIcon,
  WarningAmber as WarningIcon,
  SystemUpdateAlt as FotaIcon
} from '@mui/icons-material';

export const AdminSystem: React.FC = () => {
  const [edgeInferenceEnabled, setEdgeInferenceEnabled] = useState(true);
  const [offlineSyncEnabled, setOfflineSyncEnabled] = useState(true);
  const [satelliteBackup, setSatelliteBackup] = useState(true);
  const [fotaStatus, setFotaStatus] = useState<'idle' | 'updating' | 'done'>('idle');

  const handleTriggerFota = () => {
    setFotaStatus('updating');
    setTimeout(() => {
      setFotaStatus('done');
      setTimeout(() => setFotaStatus('idle'), 3000);
    }, 2500);
  };

  const architectureNodes = [
    {
      layer: 'Edge Sensing Layer',
      name: 'Distributed Smart Sensor Nodes (ESP32-S3 + MEMS)',
      status: 'OPERATIONAL',
      nodesCount: '48 Active / 2 Standby',
      latency: '14 ms',
      connectivity: 'LoRaWAN 865 MHz (India ISM Band)',
      health: 98
    },
    {
      layer: 'Edge Compute Layer',
      name: 'Localized Edge Inference Units (Hailo-8 / Raspberry Pi 5)',
      status: 'OPERATIONAL',
      nodesCount: '6 Regional Hubs',
      latency: '22 ms',
      connectivity: 'Private Mesh + 4G LTE',
      health: 96
    },
    {
      layer: 'Central Cloud EOC',
      name: 'Cloud Operations & Digital Twin Core',
      status: 'OPERATIONAL',
      nodesCount: 'Primary AWS Mumbai (ap-south-1)',
      latency: '38 ms',
      connectivity: 'High-speed Fiber Backhaul',
      health: 99
    },
    {
      layer: 'Satellite Failover',
      name: 'ISRO NavIC / GSAT-7 Fallback Telemetry Uplink',
      status: 'STANDBY (HOT)',
      nodesCount: '2 Uplink Terminals',
      latency: '420 ms',
      connectivity: 'S-Band Satellite Link',
      health: 100
    },
    {
      layer: 'Emergency Telecom',
      name: 'Twilio Voice IVR & SMS Emergency Gateway',
      status: 'ACTIVE',
      nodesCount: 'Studio Flow: FWda26b...',
      latency: '180 ms',
      connectivity: 'Global PSTN / Telecom Interconnect',
      health: 99
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Title */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <SystemIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              System Architecture & Infrastructure Health
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            SIH 2026 Problem Statement 26178: Cloud-Edge Hybrid Resilient Environmental Network
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<RefreshIcon />} size="small" onClick={() => window.location.reload()}>
          Refresh Telemetry
        </Button>
      </Box>

      {/* Overview Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={{ bgcolor: '#ffffff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  EDGE AVAILABILITY
                </Typography>
                <EdgeIcon color="success" fontSize="small" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
                99.8%
              </Typography>
              <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                ● Local inference online (0 packets dropped)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={{ bgcolor: '#ffffff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  TWILIO GATEWAY
                </Typography>
                <TwilioIcon color="primary" fontSize="small" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
                READY
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Studio Flow: <span style={{ fontFamily: 'monospace' }}>FWda26b...</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={{ bgcolor: '#ffffff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  DATABASE CLUSTER
                </Typography>
                <DbIcon color="info" fontSize="small" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
                MongoDB
              </Typography>
              <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                ● Atlas Cluster0 Connected + Memory Cache
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={{ bgcolor: '#ffffff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  DATA INTEGRITY
                </Typography>
                <SecurityIcon color="warning" fontSize="small" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
                SHA-256
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Cryptographic hardware signing enabled
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Architecture Table */}
      <Paper variant="outlined" sx={{ p: 2.5, bgcolor: '#ffffff', mb: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Multi-Tier Hybrid Architecture Topology
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Architectural Tier</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Component Specification</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Connectivity Medium</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Latency</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Health / Integrity</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {architectureNodes.map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.82rem' }}>
                    {row.layer}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {row.name}
                    <Typography variant="caption" display="block" color="text.secondary">
                      {row.nodesCount}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{row.connectivity}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{row.latency}</TableCell>
                  <TableCell sx={{ width: 140 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={row.health}
                        color={row.health > 90 ? 'success' : 'warning'}
                        sx={{ flex: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {row.health}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={row.status}
                      color={row.status === 'OPERATIONAL' || row.status === 'ACTIVE' ? 'success' : 'primary'}
                      icon={<OkIcon sx={{ fontSize: '14px !important' }} />}
                      sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Operational Controls & FOTA */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2.5, bgcolor: '#ffffff', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Hybrid Resiliency & Offline-First Controls
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={edgeInferenceEnabled}
                    onChange={(e) => setEdgeInferenceEnabled(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Local / On-Device AI Inference
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Sensor nodes run TinyML models for sub-second flash flood and landslide slip thresholding without waiting for cloud round-trip.
                    </Typography>
                  </Box>
                }
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={offlineSyncEnabled}
                    onChange={(e) => setOfflineSyncEnabled(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Peer-to-Peer LoRaWAN Mesh Fallback
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Automatically routes citizen SOS reports through hop-by-hop LoRa nodes if cellular towers are flooded or lost.
                    </Typography>
                  </Box>
                }
              />
              <Divider />
              <FormControlLabel
                control={
                  <Switch
                    checked={satelliteBackup}
                    onChange={(e) => setSatelliteBackup(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ISRO NavIC Satellite Uplink Standby
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Direct satellite broadcast enabled for national red-alert conditions.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2.5, bgcolor: '#ffffff', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Firmware-Over-The-Air (FOTA) Sensor Node Fleet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Deploy signed, cryptographic AI model weights and firmware patches to all 48 smart field nodes across Uttarakhand and Himachal Pradesh.
            </Typography>

            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1.5, mb: 2, border: '1px solid #e2e8f0' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                CURRENT FIRMWARE: <strong>IRIS-v3.4.1-IndiaEdge</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                PENDING PATCH: <strong>IRIS-v3.5.0-LandslideNeuralFoS</strong> (Includes rainfall pore-pressure delta curve)
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<FotaIcon />}
              onClick={handleTriggerFota}
              disabled={fotaStatus === 'updating'}
              sx={{ fontWeight: 600, textTransform: 'none' }}
            >
              {fotaStatus === 'updating' ? 'Flashing 48 Field Nodes...' : fotaStatus === 'done' ? 'FOTA Complete (100%)' : 'Deploy FOTA Update'}
            </Button>

            {fotaStatus === 'updating' && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  Distributing cryptographic chunks over 865 MHz LoRa mesh...
                </Typography>
              </Box>
            )}

            {fotaStatus === 'done' && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Successfully upgraded 48 edge smart nodes. All nodes reporting OK.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminSystem;
