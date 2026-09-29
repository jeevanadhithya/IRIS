import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  IconButton,
  Button,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Tooltip,
  Alert
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as UserIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  ElectricBolt as BoltIcon,
  Warning as WarningIcon,
  Route as RouteIcon,
  HomeWork as ShelterIcon,
  Campaign as BroadcastIcon,
  Science as ScienceIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';
import { useIrisStore } from '../../store/irisStore';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    actionType: 'recalculate_route' | 'flagship_demo' | 'broadcast' | 'evacuate';
  };
}

export const AdminAiAssistant: React.FC = () => {
  const {
    sensors,
    shelters,
    incidents,
    activeScenario,
    riskAssessments,
    routes,
    recalculateSafeRoutes,
    runFlagshipDemo,
    dispatchAlert
  } = useIrisStore();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const highestRisk = riskAssessments[0] || { hazard: 'Multi-hazard', level: 'HIGH', score: 78, recommendedAction: 'Monitor continuously' };
  const totalShelterCap = shelters.reduce((acc, s) => acc + s.capacity, 0);
  const totalShelterOcc = shelters.reduce((acc, s) => acc + s.occupancy, 0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Greetings Commander. I am **IRIS Neural Tactical Copilot**, running physics-informed hybrid edge-cloud inference for SIH 2026 Problem Statement 26178.\n\n**Current System Context:**\n- Monitored Sensors: ${sensors.length} nodes active (Edge vibration, piezometer, rainfall)\n- Highest Threat: **${highestRisk.hazard}** (${highestRisk.level} Risk, Score ${highestRisk.score}/100)\n- Active Incidents: ${incidents.length} pending dispatch\n- Shelter Capacity: ${totalShelterOcc}/${totalShelterCap} occupied\n\nHow can I assist your Emergency Operations team today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    {
      title: 'Landslide Slope Stability',
      prompt: 'Assess factor of safety (FoS) and failure probability for Slope K-12 under 140mm/h rainfall.',
      icon: <WarningIcon fontSize="small" color="error" />
    },
    {
      title: 'Evacuation Route Analysis',
      prompt: 'Evaluate Corridor Alpha vs Beta for Sector 4 evacuation. Which corridor minimizes flash flood exposure?',
      icon: <RouteIcon fontSize="small" color="primary" />
    },
    {
      title: 'Twilio Broadcast Script',
      prompt: 'Draft an urgent dual-language (Hindi + English) IVR voice script for downstream flash flood alert.',
      icon: <BroadcastIcon fontSize="small" color="warning" />
    },
    {
      title: 'Run Flash Flood Flagship Demo',
      prompt: 'Trigger the flagship disaster simulation cascade: Extreme Rainfall → Landslide → River Damming → Evacuation Invalidation.',
      icon: <ScienceIcon fontSize="small" color="secondary" />
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (userText?: string) => {
    const query = userText || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput('');
    setLoading(true);

    // Contextual AI reasoning simulation
    setTimeout(() => {
      let reply = '';
      let suggestedAction: ChatMessage['suggestedAction'] = undefined;

      const lower = query.toLowerCase();
      if (lower.includes('landslide') || lower.includes('slope') || lower.includes('fos')) {
        reply = `### 🏔️ Physics-Based Slope Stability Assessment (Slope K-12)
- **Soil Saturation:** 94.2% (Piezometric pore pressure = 24.8 kPa)
- **Slope Angle:** 38.5° | Cohesion: 18.2 kN/m² | Friction Angle: 29°
- **Calculated Factor of Safety (FoS):** **0.87** (CRITICAL: FoS < 1.0 indicates imminent slope failure)
- **Trigger Window:** Estimated mass movement within **12 to 24 minutes** if precip exceeds 120mm/h.
- **Recommended Action:** Evacuate KM 42–46 of Arterial Highway 7. Re-route all transit towards Ridge Expressway Corridor Beta.`;
        suggestedAction = {
          label: 'Recalculate Safe Evacuation Corridors',
          actionType: 'recalculate_route'
        };
      } else if (lower.includes('route') || lower.includes('corridor') || lower.includes('evacuat')) {
        reply = `### 🛣️ Evacuation Corridor Risk Matrix
- **Corridor Alpha (Valley River Road):**
  - Hazard Intersect: High river level (+3.4m surge) & Landslide Slip at KM 44.
  - Vulnerability Score: **88/100 (EXTREME RISK)**. Status: **COMPROMISED**.
- **Corridor Beta (Ridge Bypass Expressway):**
  - Elevation: +180m above high water datum.
  - Stability Factor: Stable granite bedrock foundation.
  - Vulnerability Score: **14/100 (OPTIMAL)**. Status: **CLEAR**.
- **Action:** Recommend immediate broadcast directing civilian vehicles exclusively to Corridor Beta.`;
        suggestedAction = {
          label: 'Switch Active Civilian Route to Beta',
          actionType: 'recalculate_route'
        };
      } else if (lower.includes('twilio') || lower.includes('script') || lower.includes('ivr') || lower.includes('broadcast')) {
        reply = `### 📞 Twilio Voice IVR & SMS Emergency Dispatch Script
**English Broadcast:**
*"EMERGENCY ALERT from IRIS State Disaster Management Authority. Severe flash flood and landslide warning issued for Mandakini Valley. Evacuate immediately via Corridor Beta (Ridge Bypass). Do NOT use River Highway Alpha. Press 1 if you are safe. Press 2 if you need emergency rescue."*

**हिंदी प्रसारण (Hindi Broadcast):**
*"आईरिस राज्य आपदा प्रबंधन प्राधिकरण से आपातकालीन चेतावनी। मंदाकिनी घाटी के लिए भारी बाढ़ और भूस्खलन की चेतावनी। कृपया तुरंत कॉरिडोर बीटा (रिज बाईपास) से सुरक्षित स्थान पर पहुंचे। रिवर हाईवे अल्फा का उपयोग न करें। सुरक्षित होने पर 1 दबाएं, बचाव दल के लिए 2 दबाएं।"*`;
        suggestedAction = {
          label: 'Deploy Alert via Twilio Gateway',
          actionType: 'broadcast'
        };
      } else if (lower.includes('flagship') || lower.includes('simulation') || lower.includes('cascade')) {
        reply = `### ⚡ Flagship Multi-Hazard Simulation Initiated
Initiating 5-stage cascading disaster sequence:
1. **Cloudburst Event:** 165 mm/hr localized rainfall in catchment zone.
2. **Slope Geophone Spike:** Acoustic vibration > 850 Hz triggers landslide slip.
3. **River Damming:** 42,000 m³ debris block river choke point, forming temporary barrier lake.
4. **Dynamic Breach:** Hydrologic surge inundates Corridor Alpha at KM 44.
5. **IRIS Edge Recalculation:** Route invalidation pushed to all citizen devices, guiding citizens safely to Corridor Beta.`;
        suggestedAction = {
          label: 'Execute Flagship Simulation Now',
          actionType: 'flagship_demo'
        };
      } else {
        reply = `### 🛡️ Situation Report & IRIS Assessment
- **Monitored Environmental Indices:** Ambient PM2.5, Seismic drift, River stage, and Rainfall gauges are synchronized with Cloud Central.
- **Localized Anomaly Score:** 0.74 (Elevated probability of cascading flood event).
- **Resource Readiness:** NDMA Quick Response Teams (Bravo-2, Delta-4) are staged at Sector Headquarters.
- **Guidance:** Maintain live edge telemetry ingest. Ensure all citizen mobile apps receive push notifications within 3.2 seconds of edge threshold breach.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction
        }
      ]);
      setLoading(false);
    }, 900);
  };

  const handleExecuteAction = (action?: ChatMessage['suggestedAction']) => {
    if (!action) return;
    if (action.actionType === 'recalculate_route') {
      recalculateSafeRoutes();
      alert('Safe evacuation route recalculated! Corridor Beta is designated primary.');
    } else if (action.actionType === 'flagship_demo') {
      runFlagshipDemo();
    } else if (action.actionType === 'broadcast') {
      dispatchAlert({
        title: 'Emergency Flash Flood Warning',
        severity: 'CRITICAL',
        hazardType: 'FLOOD',
        region: 'Mandakini Valley',
        actionGuidance: 'Evacuate via Ridge Bypass Corridor Beta immediately'
      });
      alert('Twilio Broadcast triggered to all registered numbers in Mandakini Valley.');
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 42, height: 42 }}>
            <BotIcon />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              IRIS Neural Tactical Copilot
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Physics-informed disaster AI for early warning, hazard simulation, and tactical decision support
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Chat Area */}
        <Grid xs={12} lg={8}>
          <Paper
            variant="outlined"
            sx={{
              height: 'calc(100vh - 230px)',
              minHeight: 580,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: '#ffffff',
              borderRadius: 2
            }}
          >
            {/* Messages Scroll Area */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {messages.map((m) => (
                <Box
                  key={m.id}
                  sx={{
                    display: 'flex',
                    flexDirection: m.sender === 'user' ? 'row-reverse' : 'row',
                    gap: 1.5,
                    alignItems: 'flex-start'
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: m.sender === 'user' ? 'primary.main' : '#0f172a',
                      width: 36,
                      height: 36
                    }}
                  >
                    {m.sender === 'user' ? <UserIcon fontSize="small" /> : <BotIcon fontSize="small" />}
                  </Avatar>

                  <Box sx={{ maxWidth: '82%' }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: m.sender === 'user' ? 'primary.main' : '#f8fafc',
                        color: m.sender === 'user' ? '#ffffff' : 'text.primary',
                        border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.93rem',
                        lineHeight: 1.6
                      }}
                    >
                      {m.text}

                      {/* Suggested Action Button inside AI response */}
                      {m.suggestedAction && (
                        <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #e2e8f0' }}>
                          <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<BoltIcon />}
                            onClick={() => handleExecuteAction(m.suggestedAction)}
                            sx={{ fontWeight: 600, textTransform: 'none' }}
                          >
                            Execute: {m.suggestedAction.label}
                          </Button>
                        </Box>
                      )}
                    </Paper>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                        gap: 1,
                        mt: 0.5,
                        px: 0.5
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {m.timestamp}
                      </Typography>
                      {m.sender === 'ai' && (
                        <Tooltip title={copiedId === m.id ? 'Copied!' : 'Copy report'}>
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(m.id, m.text)}
                            sx={{ color: copiedId === m.id ? 'success.main' : 'text.secondary', p: 0.2 }}
                          >
                            {copiedId === m.id ? <SuccessIcon fontSize="inherit" /> : <CopyIcon fontSize="inherit" />}
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}

              {loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: '#0f172a', width: 36, height: 36 }}>
                    <BotIcon fontSize="small" />
                  </Avatar>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5
                    }}
                  >
                    <CircularProgress size={18} />
                    <Typography variant="body2" color="text.secondary">
                      Synthesizing environmental intelligence & physics models...
                    </Typography>
                  </Paper>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>

            <Divider />

            {/* Input Form */}
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              sx={{ p: 2, bgcolor: '#ffffff', display: 'flex', gap: 1.5 }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Ask IRIS Tactical Copilot (e.g., 'Analyze slope K-12', 'Generate Twilio alert', 'Recalculate route')..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={!input.trim() || loading}
                endIcon={<SendIcon />}
                sx={{ px: 3, fontWeight: 600, textTransform: 'none' }}
              >
                Send
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Tactical Sidebar */}
        <Grid xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Quick Tactical Inquiries */}
            <Paper variant="outlined" sx={{ p: 2.5, bgcolor: '#ffffff', borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <BoltIcon color="primary" /> Tactical Scenarios
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {quickPrompts.map((qp, idx) => (
                  <Card
                    key={idx}
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': { borderColor: 'primary.main', bgcolor: '#f0f9ff' }
                    }}
                    onClick={() => handleSend(qp.prompt)}
                  >
                    <CardContent sx={{ p: '12px !important' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        {qp.icon}
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {qp.title}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {qp.prompt}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>

            {/* Live Context Card */}
            <Paper variant="outlined" sx={{ p: 2.5, bgcolor: '#ffffff', borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                Live Ingest Feed
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <WarningIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Top Risk Level"
                    secondary={`${highestRisk.hazard} (${highestRisk.level})`}
                    primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                  />
                </ListItem>
                <Divider sx={{ my: 0.5 }} />
                <ListItem disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <ShelterIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Active Shelters"
                    secondary={`${shelters.length} facilities ready (${totalShelterCap - totalShelterOcc} beds remaining)`}
                    primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                  />
                </ListItem>
                <Divider sx={{ my: 0.5 }} />
                <ListItem disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <RouteIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Evacuation Corridors"
                    secondary={`${routes.filter((r) => r.status === 'CLEAR').length} Clear, ${routes.filter((r) => r.status === 'BLOCKED').length} Compromised`}
                    primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                  />
                </ListItem>
              </List>
            </Paper>

            {/* SIH 26178 Compliance Badge */}
            <Alert severity="info" sx={{ borderRadius: 2, '& .MuiAlert-message': { fontSize: '0.82rem' } }}>
              <strong>SIH 2026 Edge Copilot:</strong> Runs lightweight quantized LLM models on-device and at regional gateway nodes, ensuring continuous emergency reasoning even during cloud telecom blackout.
            </Alert>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminAiAssistant;
