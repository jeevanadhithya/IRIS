import { create } from 'zustand';
import { 
  UserProfile, 
  Role, 
  RiskAssessment, 
  EnvironmentalObservation, 
  SensorNode, 
  Shelter, 
  Incident, 
  CommunityReport, 
  EvacuationRoute, 
  SimulationScenario,
  ResponseTeam
} from '../types/iris';

// Seed Initial Physical Sensors across India & Critical Monitoring Zones
const initialSensors: SensorNode[] = [
  {
    id: 'IRIS-NOD-01',
    name: 'Western Ghats Ridge Node',
    location: { latitude: 11.4102, longitude: 76.6950, elevation: 1850, area: 'Nilgiris, TN' },
    type: 'MULTI_HAZARD',
    status: 'online',
    battery: 94,
    signalStrength: 98,
    lastSeen: 'Just now',
    currentReading: {
      nodeId: 'IRIS-NOD-01',
      timestamp: new Date().toISOString(),
      location: { latitude: 11.4102, longitude: 76.6950, elevation: 1850, placeName: 'Nilgiris, TN' },
      temperature: 22.4,
      humidity: 86,
      rainfall: 42.5,
      waterLevel: 2.1,
      soilMoisture: 78,
      pm25: 18,
      vibration: 0.18,
      tilt: 1.2,
      source: 'physical',
      confidence: 96
    }
  },
  {
    id: 'IRIS-NOD-02',
    name: 'Cauvery River Flood Sensor',
    location: { latitude: 10.7905, longitude: 78.7047, elevation: 85, area: 'Tiruchirappalli Basin' },
    type: 'HYDROLOGICAL',
    status: 'online',
    battery: 89,
    signalStrength: 92,
    lastSeen: '1 min ago',
    currentReading: {
      nodeId: 'IRIS-NOD-02',
      timestamp: new Date().toISOString(),
      location: { latitude: 10.7905, longitude: 78.7047, elevation: 85, placeName: 'Tiruchirappalli Basin' },
      temperature: 29.8,
      humidity: 74,
      rainfall: 12.0,
      waterLevel: 3.4,
      riverLevel: 4.8,
      soilMoisture: 62,
      source: 'physical',
      confidence: 98
    }
  },
  {
    id: 'IRIS-NOD-03',
    name: 'Himalayan Foothill Slope Monitor',
    location: { latitude: 31.1048, longitude: 77.1734, elevation: 2200, area: 'Shimla Valley, HP' },
    type: 'SEISMIC',
    status: 'online',
    battery: 91,
    signalStrength: 88,
    lastSeen: '2 mins ago',
    currentReading: {
      nodeId: 'IRIS-NOD-03',
      timestamp: new Date().toISOString(),
      location: { latitude: 31.1048, longitude: 77.1734, elevation: 2200, placeName: 'Shimla Valley, HP' },
      temperature: 16.2,
      humidity: 72,
      rainfall: 18.2,
      soilMoisture: 82,
      vibration: 0.35,
      tilt: 3.4,
      source: 'physical',
      confidence: 94
    }
  },
  {
    id: 'IRIS-NOD-04',
    name: 'Industrial Air & Chemical Sentinel',
    location: { latitude: 13.0827, longitude: 80.2707, elevation: 12, area: 'Manali Industrial Zone, Chennai' },
    type: 'AIR_QUALITY',
    status: 'online',
    battery: 97,
    signalStrength: 99,
    lastSeen: 'Just now',
    currentReading: {
      nodeId: 'IRIS-NOD-04',
      timestamp: new Date().toISOString(),
      location: { latitude: 13.0827, longitude: 80.2707, elevation: 12, placeName: 'Manali Industrial Zone, Chennai' },
      temperature: 33.1,
      humidity: 68,
      pm25: 88,
      pm10: 142,
      smoke: 12,
      co: 2.1,
      no2: 45,
      so2: 24,
      gasLevel: 14,
      source: 'physical',
      confidence: 97
    }
  },
  {
    id: 'IRIS-NOD-05',
    name: 'Central Deccan Thermal & Heat Node',
    location: { latitude: 17.3850, longitude: 78.4867, elevation: 540, area: 'Hyderabad Urban Core' },
    type: 'THERMAL',
    status: 'online',
    battery: 82,
    signalStrength: 95,
    lastSeen: '3 mins ago',
    currentReading: {
      nodeId: 'IRIS-NOD-05',
      timestamp: new Date().toISOString(),
      location: { latitude: 17.3850, longitude: 78.4867, elevation: 540, placeName: 'Hyderabad Urban Core' },
      temperature: 38.6,
      humidity: 32,
      rainfall: 0,
      pm25: 42,
      source: 'physical',
      confidence: 95
    }
  }
];

// Seed Initial Emergency Shelters
const initialShelters: Shelter[] = [
  {
    id: 'SHELTER-01',
    name: 'Sector 4 Community Relief Hub',
    location: { latitude: 11.4150, longitude: 76.7020, address: 'Highland Road, Nilgiris District' },
    capacity: 450,
    occupancy: 180,
    medicalAvailable: true,
    foodAvailable: true,
    waterAvailable: true,
    accessibility: true,
    contactNumber: '+91 94421 88901',
    status: 'Available',
    distanceKm: 1.8
  },
  {
    id: 'SHELTER-02',
    name: 'District Multi-Purpose Cyclone & Flood Shelter',
    location: { latitude: 10.7950, longitude: 78.7120, address: 'Grand Anicut Embankment, Trichy' },
    capacity: 800,
    occupancy: 610,
    medicalAvailable: true,
    foodAvailable: true,
    waterAvailable: true,
    accessibility: true,
    contactNumber: '+91 94432 11200',
    status: 'Available',
    distanceKm: 3.4
  },
  {
    id: 'SHELTER-03',
    name: 'Red Cross Emergency Station',
    location: { latitude: 11.3980, longitude: 76.6810, address: 'Hill Crest Ave, Nilgiris' },
    capacity: 250,
    occupancy: 242,
    medicalAvailable: true,
    foodAvailable: true,
    waterAvailable: true,
    accessibility: false,
    contactNumber: '+91 98840 55432',
    status: 'Nearly Full',
    distanceKm: 5.1
  },
  {
    id: 'SHELTER-04',
    name: 'State Disaster Management Civic Hall',
    location: { latitude: 13.0900, longitude: 80.2600, address: 'North Ring Road, Chennai' },
    capacity: 1200,
    occupancy: 320,
    medicalAvailable: true,
    foodAvailable: true,
    waterAvailable: true,
    accessibility: true,
    contactNumber: '+91 90038 99190',
    status: 'Available',
    distanceKm: 4.2
  }
];

// Seed Initial Incident List
const initialIncidents: Incident[] = [
  {
    id: 'INC-2026-081',
    title: 'Flash Flood Watch - River Inundation',
    category: 'FLOOD',
    location: { latitude: 10.7905, longitude: 78.7047, address: 'Cauvery River Sector 3' },
    description: 'Rapid water level surge of 0.8m recorded over 30 minutes. Saturated riverbank requires immediate barrier reinforcement.',
    peopleCount: 320,
    medicalUrgency: false,
    severity: 'HIGH',
    status: 'In Progress',
    source: 'AUTOMATED_HAZARD',
    reporter: { name: 'IRIS Automated Hydrological Sensor', phone: 'SYSTEM' },
    assignedTeam: 'Field Operations Team Beta',
    timestamp: '25 mins ago',
    timeline: [
      { stage: 'Sensor Alert Triggered', time: '10:15 AM', note: 'Threshold exceeded 3.2m water level.' },
      { stage: 'Incident Verified by EOC', time: '10:18 AM', note: 'Corroborated with Sentinel-1 SAR imagery.' },
      { stage: 'Team Dispatched', time: '10:24 AM', note: 'NDRF Quick Response Team assigned.' }
    ]
  },
  {
    id: 'INC-2026-082',
    title: 'Debris Flow & Slope Cleavage Alert',
    category: 'LANDSLIDE',
    location: { latitude: 11.4102, longitude: 76.6950, address: 'State Highway 17, Ooty Ghat Road' },
    description: 'Soil saturation above 85% causing fissure formation across uphill curve. Road blocked on northbound lane.',
    peopleCount: 45,
    medicalUrgency: true,
    severity: 'CRITICAL',
    status: 'Assigned',
    source: 'COMMUNITY',
    reporter: { name: 'Dr. Ramesh Kumar (Field Geologist)', phone: '+91 98841 22334' },
    assignedTeam: 'Fire & Rescue Team Alpha',
    timestamp: '12 mins ago',
    timeline: [
      { stage: 'Citizen Report Received', time: '10:30 AM', note: 'Submitted via IRIS Citizen Portal with image.' },
      { stage: 'Risk Engine Corroborated', time: '10:32 AM', note: 'IRIS-NOD-01 confirmed tilt vector deviation of 3.4°.' },
      { stage: 'Assigned', time: '10:35 AM', note: 'Fire & Rescue Alpha en route.' }
    ]
  }
];

// Seed Initial Community Reports
const initialReports: CommunityReport[] = [
  {
    id: 'REP-101',
    category: 'ENVIRONMENT',
    subCategory: 'Flooding',
    description: 'Water has overflowed the stormwater drain and reached knee level near the residential bus junction.',
    location: { latitude: 10.792, longitude: 78.706, address: 'Bus Terminal Road, Ward 12' },
    severity: 'HIGH',
    status: 'Verified',
    reporterName: 'Karthik S.',
    timestamp: '18 mins ago',
    likes: 19,
    corroborated: true,
    corroborationDetails: 'Corroborated by IRIS-NOD-02 (Water level +0.6m spike) and live rainfall data.',
    nearbySensors: ['IRIS-NOD-02']
  },
  {
    id: 'REP-102',
    category: 'INFRASTRUCTURE',
    subCategory: 'Road Blockage / Landslide',
    description: 'Mud and loose boulders collapsed across Highway 17. Vehicles cannot pass towards Kotagiri.',
    location: { latitude: 11.412, longitude: 76.698, address: 'KM 14, Highway 17' },
    severity: 'CRITICAL',
    status: 'Assigned',
    reporterName: 'Priya Narayanan',
    timestamp: '32 mins ago',
    likes: 42,
    corroborated: true,
    corroborationDetails: 'Confirmed by Slope Tilt sensor IRIS-NOD-01 and Sentinel-2 vegetation slip anomaly.',
    nearbySensors: ['IRIS-NOD-01']
  },
  {
    id: 'REP-103',
    category: 'ENVIRONMENT',
    subCategory: 'Air Pollution / Chemical Smell',
    description: 'Strong acrid chemical odor detected downwind from petrochemical refinery area. Difficulty breathing.',
    location: { latitude: 13.084, longitude: 80.272, address: 'Sector 5, Manali Industrial Belt' },
    severity: 'MODERATE',
    status: 'Verified',
    reporterName: 'Venkatesh R.',
    timestamp: '45 mins ago',
    likes: 15,
    corroborated: true,
    corroborationDetails: 'Corroborated by IRIS-NOD-04 (VOC Gas level elevated to 14 ppm, PM2.5 at 88 µg/m³).',
    nearbySensors: ['IRIS-NOD-04']
  }
];

// Seed Evacuation Routes with Exposure Trade-offs
const initialRoutes: EvacuationRoute[] = [
  {
    id: 'ROUTE-PRIMARY',
    name: 'Corridor Alpha (Direct Ghat Road)',
    origin: 'Current User Location',
    destination: 'Sector 4 Community Relief Hub',
    destinationShelterId: 'SHELTER-01',
    distanceKm: 4.8,
    estimatedTimeMin: 11,
    floodExposure: 'Low',
    fireExposure: 'Low',
    landslideExposure: 'High',
    pollutionExposure: 'Low',
    roadBlockage: false,
    elevationTrend: 'Ascending',
    pathCoordinates: [
      [11.4102, 76.6950],
      [11.4115, 76.6970],
      [11.4130, 76.6995],
      [11.4150, 76.7020]
    ],
    status: 'RECOMMENDED',
    tradeoffSummary: 'Shortest travel time (11 min) with low flood risk, but intersects unstable slope zone.'
  },
  {
    id: 'ROUTE-SECONDARY',
    name: 'Corridor Beta (Ridge Bypass Highway)',
    origin: 'Current User Location',
    destination: 'District Multi-Purpose Shelter',
    destinationShelterId: 'SHELTER-02',
    distanceKm: 7.2,
    estimatedTimeMin: 17,
    floodExposure: 'Moderate',
    fireExposure: 'Low',
    landslideExposure: 'Low',
    pollutionExposure: 'Low',
    roadBlockage: false,
    elevationTrend: 'Flat',
    pathCoordinates: [
      [11.4102, 76.6950],
      [11.4080, 76.7010],
      [11.4050, 76.7080],
      [10.7950, 78.7120]
    ],
    status: 'SAFE',
    tradeoffSummary: 'Safe detour via reinforced concrete arterial road; zero landslide exposure.'
  }
];

// Seed Flagship Simulation Scenario: Extreme Rainfall -> Landslide -> Flood -> Evacuation Recalculation
const initialSimulationScenario: SimulationScenario = {
  id: 'SCENARIO-FLAGSHIP-01',
  name: 'Extreme Monsoon Rainfall → Landslide → River Damming → Flash Flood',
  hazard: 'cascading_multi_hazard',
  location: 'Nilgiris & Cauvery River Basin, South India',
  durationMinutes: 60,
  currentStep: 0,
  totalSteps: 5, // T+00, T+15, T+30, T+45, T+60
  active: false,
  speedMultiplier: 1,
  parameters: {
    rainfallMmHr: 45,
    soilSaturationPercent: 65,
    temperatureC: 24,
    windSpeedKmh: 35,
    windDirectionDeg: 240,
    slopeInstabilityPercent: 30,
    drainageCapacityPercent: 75,
    pm25EmissionRate: 15
  },
  virtualSensors: [],
  impactMetrics: {
    affectedAreaSqKm: 2.4,
    buildingsExposed: 12,
    roadsBlockedCount: 0,
    populationAtRisk: 85,
    sensorsAffected: 1,
    sheltersImpacted: 0
  },
  eventLog: [
    {
      step: 0,
      timeLabel: 'T+00 min',
      message: 'Baseline Environmental State: Moderate monsoon conditions. Drainage operating at standard capacity.',
      severity: 'LOW'
    }
  ]
};

const initialResponseTeams: ResponseTeam[] = [
  {
    id: 'TEAM-01',
    name: 'NDRF 4th Battalion Unit',
    type: 'NDRF Quick Response',
    status: 'Available',
    currentLocation: { latitude: 11.405, longitude: 76.692, area: 'Ooty Cantonment' },
    membersCount: 24,
    contactLead: 'Commandant R. K. Verma'
  },
  {
    id: 'TEAM-02',
    name: 'State Fire & Rescue Engine 3',
    type: 'Fire & Rescue',
    status: 'Assigned',
    currentLocation: { latitude: 11.411, longitude: 76.696, area: 'En route to Highway 17' },
    membersCount: 8,
    contactLead: 'Station Officer S. Murugan',
    assignedIncidentId: 'INC-2026-082'
  },
  {
    id: 'TEAM-03',
    name: 'District Medical Mobile Hospital Unit',
    type: 'Medical Emergency',
    status: 'Responding',
    currentLocation: { latitude: 10.793, longitude: 78.708, area: 'Trichy Central' },
    membersCount: 12,
    contactLead: 'Dr. Ananya Sen'
  }
];

interface IrisStoreState {
  // Authentication & Role
  currentUser: UserProfile;
  isAuthenticated: boolean;
  login: (email: string, role?: Role) => void;
  logout: () => void;
  setRole: (role: 'USER' | 'ADMIN' | 'user' | 'admin') => void;
  updateUserPreferences: (prefs: Partial<UserProfile['alertPreferences']>) => void;
  activeScenario?: SimulationScenario;
  recalculateSafeRoutes: () => void;
  dispatchAlert: (alert: { title: string; severity: string; hazardType: string; region: string; actionGuidance: string }) => void;

  // Real-time Sensors & Telemetry
  sensors: SensorNode[];
  selectedSensor: SensorNode | null;
  setSelectedSensor: (sensor: SensorNode | null) => void;
  updateSensorReading: (nodeId: string, reading: Partial<EnvironmentalObservation>) => void;
  addSensor: (sensor: SensorNode) => void;

  // Risk Assessments
  riskAssessments: RiskAssessment[];
  overallRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

  // Shelters
  shelters: Shelter[];
  updateShelterOccupancy: (id: string, delta: number) => void;

  // Incidents
  incidents: Incident[];
  addIncident: (incident: Omit<Incident, 'id' | 'timestamp' | 'timeline'>) => string;
  updateIncidentStatus: (id: string, status: Incident['status'], team?: string) => void;

  // Community Reports
  communityReports: CommunityReport[];
  addCommunityReport: (report: Omit<CommunityReport, 'id' | 'timestamp' | 'likes' | 'corroborated'>) => void;
  verifyCommunityReport: (id: string, corroborated: boolean, details?: string) => void;

  // Evacuation & Safe Routing
  routes: EvacuationRoute[];
  activeRouteId: string;
  setActiveRouteId: (id: string) => void;
  recalculateRoutesDueToHazard: (blockagePoint?: { lat: number; lng: number }) => void;

  // Simulation Center
  simulation: SimulationScenario;
  startSimulation: () => void;
  pauseSimulation: () => void;
  resetSimulation: () => void;
  advanceSimulationStep: (stepNumber?: number) => void;
  setSimulationSpeed: (speed: number) => void;
  runFlagshipDemo: () => void;

  // Emergency Response Teams
  responseTeams: ResponseTeam[];
  assignTeamToIncident: (teamId: string, incidentId: string) => void;

  // System & Connection State
  socketConnected: boolean;
  setSocketConnected: (connected: boolean) => void;
  systemHealth: {
    api: 'Operational' | 'Warning' | 'Down';
    mongodb: 'Operational' | 'Warning' | 'Down';
    socket: 'Operational' | 'Warning' | 'Down';
    twilio: 'Operational' | 'Warning' | 'Down';
    gemini: 'Operational' | 'Warning' | 'Down';
    earthEngine: 'Operational' | 'Warning' | 'Down';
    cesium: 'Operational' | 'Warning' | 'Down';
  };
}

export const useIrisStore = create<IrisStoreState>((set, get) => ({
  // Default User (can switch easily between Citizen and Administrator)
  currentUser: {
    id: 'USR-ADMIN-01',
    name: 'Director S. Ramanathan',
    email: 'admin@iris.gov.in',
    role: 'admin',
    phone: '+91 90038 99190',
    location: {
      latitude: 11.4102,
      longitude: 76.6950,
      address: 'Command Center, Southern Regional EOC'
    },
    language: 'en',
    alertPreferences: {
      flood: true,
      fire: true,
      landslide: true,
      pollution: true,
      heat: true,
      sms: true,
      voice: true,
      app: true
    }
  },
  isAuthenticated: true,

  login: (email: string, role: Role = 'user') => {
    const isAdmin = role === 'admin' || email.includes('admin');
    set({
      currentUser: {
        id: isAdmin ? 'USR-ADMIN-01' : 'USR-CITIZEN-02',
        name: isAdmin ? 'Director S. Ramanathan (EOC)' : 'Anand Krishnan (Citizen)',
        email,
        role: isAdmin ? 'admin' : 'user',
        phone: '+91 99423 73735',
        location: {
          latitude: 11.4102,
          longitude: 76.6950,
          address: 'Sector 4, Nilgiris District'
        }
      },
      isAuthenticated: true
    });
  },

  logout: () => {
    set({
      currentUser: {
        id: 'GUEST',
        name: 'Guest Citizen',
        email: '',
        role: 'user'
      },
      isAuthenticated: false
    });
  },

  setRole: (role: 'USER' | 'ADMIN' | 'user' | 'admin') => {
    const norm = role.toLowerCase() as Role;
    const isAdmin = norm === 'admin';
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        id: isAdmin ? 'USR-ADMIN-01' : 'USR-CITIZEN-02',
        name: isAdmin ? 'Director S. Ramanathan (EOC)' : 'Anand Krishnan (Citizen)',
        email: isAdmin ? 'commander@eoc.gov.in' : 'citizen@geosense.in',
        role: norm,
        phone: isAdmin ? '+91 90038 99190' : '+91 99423 73735',
        location: {
          latitude: 11.4102,
          longitude: 76.6950,
          address: isAdmin ? 'Command Center, Southern Regional EOC' : 'Sector 4, Nilgiris District'
        }
      },
      isAuthenticated: true
    }));
  },

  recalculateSafeRoutes: () => {
    get().recalculateRoutesDueToHazard();
  },

  dispatchAlert: (alertData) => {
    get().addIncident({
      title: alertData.title,
      type: (alertData.hazardType || 'MULTI_HAZARD') as any,
      severity: (alertData.severity || 'HIGH') as any,
      location: { latitude: 11.41, longitude: 76.69, placeName: alertData.region },
      status: 'Verified',
      description: alertData.actionGuidance,
      reportedBy: 'EOC Tactical Dispatch'
    });
  },

  updateUserPreferences: (prefs) => {
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        alertPreferences: {
          ...state.currentUser.alertPreferences,
          ...prefs
        } as any
      }
    }));
  },

  sensors: initialSensors,
  selectedSensor: initialSensors[0],
  setSelectedSensor: (sensor) => set({ selectedSensor: sensor }),

  updateSensorReading: (nodeId, reading) => {
    set((state) => ({
      sensors: state.sensors.map((s) => {
        if (s.id === nodeId) {
          return {
            ...s,
            lastSeen: 'Just now',
            currentReading: {
              ...s.currentReading,
              ...reading,
              timestamp: new Date().toISOString()
            }
          };
        }
        return s;
      })
    }));
  },

  addSensor: (sensor) => set((state) => ({ sensors: [...state.sensors, sensor] })),

  riskAssessments: [
    {
      hazardType: 'landslide',
      riskScore: 84,
      riskLevel: 'HIGH',
      probability: 78,
      severity: 'HIGH',
      trend: 'up',
      location: 'Nilgiris Upper Ghat Corridor',
      coordinates: { latitude: 11.4102, longitude: 76.6950 },
      contributingFactors: ['Continuous 42mm/hr rainfall', 'Soil saturation at 78%', 'Slope angle 34°'],
      affectedAreaSqKm: 4.8,
      populationAtRisk: 1250,
      recommendedAction: 'Immediate traffic diversion from Highway 17. Prepare low-lying evacuation.',
      timestamp: '5 mins ago',
      source: 'REAL'
    },
    {
      hazardType: 'flood',
      riskScore: 68,
      riskLevel: 'MODERATE',
      probability: 65,
      severity: 'MODERATE',
      trend: 'up',
      location: 'Cauvery River Lower Basin',
      coordinates: { latitude: 10.7905, longitude: 78.7047 },
      contributingFactors: ['River water level at 3.4m (+0.6m in 1 hr)', 'Upstream dam discharge increasing'],
      affectedAreaSqKm: 12.5,
      populationAtRisk: 3400,
      recommendedAction: 'Issue yellow alert to riverside settlements; activate drainage pumps.',
      timestamp: '10 mins ago',
      source: 'SATELLITE'
    },
    {
      hazardType: 'air_pollution',
      riskScore: 55,
      riskLevel: 'MODERATE',
      probability: 60,
      severity: 'MODERATE',
      trend: 'stable',
      location: 'Manali Industrial Corridor, Chennai',
      coordinates: { latitude: 13.0827, longitude: 80.2707 },
      contributingFactors: ['PM2.5 concentration at 88 µg/m³', 'Low wind dispersion speed (6 km/h)'],
      affectedAreaSqKm: 6.2,
      populationAtRisk: 8900,
      recommendedAction: 'Issue health advisory for vulnerable residents to stay indoors.',
      timestamp: '15 mins ago',
      source: 'REAL'
    }
  ],
  overallRiskLevel: 'HIGH',

  shelters: initialShelters,
  updateShelterOccupancy: (id, delta) => {
    set((state) => ({
      shelters: state.shelters.map((s) => {
        if (s.id === id) {
          const newOccupancy = Math.max(0, Math.min(s.capacity, s.occupancy + delta));
          let status: Shelter['status'] = 'Available';
          if (newOccupancy >= s.capacity) status = 'Full';
          else if (newOccupancy >= s.capacity * 0.9) status = 'Nearly Full';
          return { ...s, occupancy: newOccupancy, status };
        }
        return s;
      })
    }));
  },

  incidents: initialIncidents,
  addIncident: (incidentData) => {
    const id = `INC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newIncident: Incident = {
      ...incidentData,
      id,
      timestamp: 'Just now',
      timeline: [
        {
          stage: 'Incident Reported',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: `Incident registered into IRIS EOC via ${incidentData.source}`
        }
      ]
    };
    set((state) => ({ incidents: [newIncident, ...state.incidents] }));
    return id;
  },

  updateIncidentStatus: (id, status, team) => {
    set((state) => ({
      incidents: state.incidents.map((inc) => {
        if (inc.id === id) {
          return {
            ...inc,
            status,
            assignedTeam: team || inc.assignedTeam,
            timeline: [
              ...inc.timeline,
              {
                stage: `Status updated to ${status}`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                note: team ? `Assigned to ${team}` : 'Updated by Command Center'
              }
            ]
          };
        }
        return inc;
      })
    }));
  },

  communityReports: initialReports,
  addCommunityReport: (report) => {
    const newReport: CommunityReport = {
      ...report,
      id: `REP-${Math.floor(200 + Math.random() * 800)}`,
      timestamp: 'Just now',
      likes: 1,
      corroborated: false
    };
    set((state) => ({ communityReports: [newReport, ...state.communityReports] }));
  },

  verifyCommunityReport: (id, corroborated, details) => {
    set((state) => ({
      communityReports: state.communityReports.map((rep) => {
        if (rep.id === id) {
          return {
            ...rep,
            status: 'Verified',
            corroborated,
            corroborationDetails: details || 'Corroborated by nearby IRIS sensor telemetry.'
          };
        }
        return rep;
      })
    }));
  },

  routes: initialRoutes,
  activeRouteId: 'ROUTE-PRIMARY',
  setActiveRouteId: (id) => set({ activeRouteId: id }),

  // Dynamic Route Invalidation & Recalculation
  recalculateRoutesDueToHazard: () => {
    set((state) => ({
      routes: state.routes.map((r) => {
        if (r.id === 'ROUTE-PRIMARY') {
          return {
            ...r,
            status: 'BLOCKED',
            roadBlockage: true,
            tradeoffSummary: 'UNSAFE: Debris flow and water level exceeding 1.2m block this road. Route invalidated.',
            recalculated: true
          };
        }
        if (r.id === 'ROUTE-SECONDARY') {
          return {
            ...r,
            status: 'RECOMMENDED',
            tradeoffSummary: 'OPTIMAL RECALCULATED ROUTE: Bypass via Ridge Expressway is clear. Safe approach to Shelter 02.',
            recalculated: true
          };
        }
        return r;
      }),
      activeRouteId: 'ROUTE-SECONDARY'
    }));
  },

  // Disaster Simulation State
  simulation: initialSimulationScenario,

  startSimulation: () => {
    set((state) => ({
      simulation: { ...state.simulation, active: true }
    }));
  },

  pauseSimulation: () => {
    set((state) => ({
      simulation: { ...state.simulation, active: false }
    }));
  },

  resetSimulation: () => {
    set({
      simulation: initialSimulationScenario,
      routes: initialRoutes,
      activeRouteId: 'ROUTE-PRIMARY'
    });
  },

  setSimulationSpeed: (speedMultiplier) => {
    set((state) => ({
      simulation: { ...state.simulation, speedMultiplier }
    }));
  },

  // Simulation Step Evolution (T+00 -> T+15 -> T+30 -> T+45 -> T+60)
  advanceSimulationStep: (targetStep?: number) => {
    const current = get().simulation;
    const nextStep = targetStep !== undefined ? targetStep : Math.min(current.totalSteps, current.currentStep + 1);

    if (nextStep === 1) {
      // T+15: Rainfall Intensification
      const vSensor1: SensorNode = {
        id: 'IRIS-VRT-101',
        name: 'Virtual Catchment Hydrological Node',
        location: { latitude: 11.4110, longitude: 76.6960, area: 'Upper Mountain Catchment' },
        type: 'HYDROLOGICAL',
        status: 'online',
        battery: 100,
        signalStrength: 100,
        lastSeen: 'Simulation Sync',
        isVirtual: true,
        currentReading: {
          nodeId: 'IRIS-VRT-101',
          timestamp: new Date().toISOString(),
          location: { latitude: 11.4110, longitude: 76.6960, placeName: 'Upper Mountain Catchment' },
          rainfall: 85.0,
          waterLevel: 2.8,
          soilMoisture: 88,
          source: 'simulation',
          confidence: 99
        }
      };

      set((state) => ({
        simulation: {
          ...state.simulation,
          currentStep: 1,
          parameters: {
            ...state.simulation.parameters,
            rainfallMmHr: 85,
            soilSaturationPercent: 88,
            slopeInstabilityPercent: 55
          },
          virtualSensors: [vSensor1],
          impactMetrics: {
            affectedAreaSqKm: 5.6,
            buildingsExposed: 28,
            roadsBlockedCount: 0,
            populationAtRisk: 240,
            sensorsAffected: 2,
            sheltersImpacted: 0
          },
          eventLog: [
            ...state.simulation.eventLog,
            {
              step: 1,
              timeLabel: 'T+15 min',
              message: 'Extreme Cloudburst: Rainfall surges to 85 mm/hr. Ground moisture reaches saturation threshold (88%).',
              severity: 'HIGH'
            }
          ]
        }
      }));
    } else if (nextStep === 2) {
      // T+30: Slope Failure / Landslide Occurrence
      const vSensor2: SensorNode = {
        id: 'IRIS-VRT-102',
        name: 'Virtual Geotechnical Inclinometer',
        location: { latitude: 11.4125, longitude: 76.6980, area: 'Ghat Pass Mile 14' },
        type: 'SEISMIC',
        status: 'warning',
        battery: 100,
        signalStrength: 95,
        lastSeen: 'Simulation Sync',
        isVirtual: true,
        currentReading: {
          nodeId: 'IRIS-VRT-102',
          timestamp: new Date().toISOString(),
          location: { latitude: 11.4125, longitude: 76.6980, placeName: 'Ghat Pass Mile 14' },
          tilt: 8.9,
          vibration: 2.4,
          soilMoisture: 96,
          source: 'simulation',
          confidence: 98
        }
      };

      set((state) => ({
        simulation: {
          ...state.simulation,
          currentStep: 2,
          parameters: {
            ...state.simulation.parameters,
            rainfallMmHr: 110,
            soilSaturationPercent: 96,
            slopeInstabilityPercent: 85
          },
          virtualSensors: [...state.simulation.virtualSensors, vSensor2],
          impactMetrics: {
            affectedAreaSqKm: 9.4,
            buildingsExposed: 54,
            roadsBlockedCount: 1,
            populationAtRisk: 520,
            sensorsAffected: 3,
            sheltersImpacted: 0
          },
          eventLog: [
            ...state.simulation.eventLog,
            {
              step: 2,
              timeLabel: 'T+30 min',
              message: 'CRITICAL SLOPE FAILURE: 12,000 cu.m of mud and rock debris slides across Highway 17. Arterial corridor severed.',
              severity: 'CRITICAL'
            }
          ]
        }
      }));
    } else if (nextStep === 3) {
      // T+45: River Obstruction & Flash Flood Surge
      get().recalculateRoutesDueToHazard(); // Dynamically invalidate route and switch to Corridor Beta!

      set((state) => ({
        simulation: {
          ...state.simulation,
          currentStep: 3,
          parameters: {
            ...state.simulation.parameters,
            drainageCapacityPercent: 20
          },
          impactMetrics: {
            affectedAreaSqKm: 16.8,
            buildingsExposed: 112,
            roadsBlockedCount: 2,
            populationAtRisk: 1480,
            sensorsAffected: 4,
            sheltersImpacted: 1
          },
          eventLog: [
            ...state.simulation.eventLog,
            {
              step: 3,
              timeLabel: 'T+45 min',
              message: 'CASCADING FLASH FLOOD: Landslide dams river tributary, creating backwater inundation. Corridor Alpha invalidated. Evacuation route recalculated dynamically to Corridor Beta.',
              severity: 'CRITICAL'
            }
          ]
        }
      }));
    } else if (nextStep >= 4) {
      // T+60: Full Impact Assessment & Emergency Response Mobilization
      set((state) => ({
        simulation: {
          ...state.simulation,
          currentStep: 4,
          active: false,
          impactMetrics: {
            affectedAreaSqKm: 22.4,
            buildingsExposed: 168,
            roadsBlockedCount: 3,
            populationAtRisk: 2150,
            sensorsAffected: 5,
            sheltersImpacted: 1
          },
          eventLog: [
            ...state.simulation.eventLog,
            {
              step: 4,
              timeLabel: 'T+60 min',
              message: 'SIMULATION COMPLETE: Impact envelope stabilized. 2,150 citizens routed safely to District Multi-Purpose Shelter. Automated SMS and Voice broadcasts completed.',
              severity: 'HIGH'
            }
          ]
        }
      }));
    }
  },

  // Flagship Demo Runner (Auto-stepped for demonstrations)
  runFlagshipDemo: () => {
    get().resetSimulation();
    get().startSimulation();
    
    // Step-by-step auto sequence
    setTimeout(() => get().advanceSimulationStep(1), 1200);
    setTimeout(() => get().advanceSimulationStep(2), 3500);
    setTimeout(() => get().advanceSimulationStep(3), 6000);
    setTimeout(() => get().advanceSimulationStep(4), 8500);
  },

  responseTeams: initialResponseTeams,
  assignTeamToIncident: (teamId, incidentId) => {
    set((state) => ({
      responseTeams: state.responseTeams.map((t) => {
        if (t.id === teamId) {
          return { ...t, status: 'Assigned', assignedIncidentId: incidentId };
        }
        return t;
      })
    }));
    get().updateIncidentStatus(incidentId, 'Assigned');
  },

  socketConnected: true,
  setSocketConnected: (connected) => set({ socketConnected: connected }),

  systemHealth: {
    api: 'Operational',
    mongodb: 'Operational',
    socket: 'Operational',
    twilio: 'Operational',
    gemini: 'Operational',
    earthEngine: 'Operational',
    cesium: 'Operational'
  }
}));
