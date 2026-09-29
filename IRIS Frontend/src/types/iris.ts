/**
 * IRIS: Intelligent Resilient Infrastructure & Safety
 * Unified Data Models & Type Definitions
 */

export type Role = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  emergencyContact?: string;
  language?: 'en' | 'ta' | 'hi' | 'ml';
  alertPreferences?: {
    flood: boolean;
    fire: boolean;
    landslide: boolean;
    pollution: boolean;
    heat: boolean;
    sms: boolean;
    voice: boolean;
    app: boolean;
  };
}

export type DataProvenance = 'REAL' | 'SATELLITE' | 'PREDICTED' | 'SIMULATION' | 'HISTORICAL' | 'COMMUNITY';

export type HazardType = 
  | 'flood' 
  | 'flash_flood' 
  | 'forest_fire' 
  | 'smoke' 
  | 'landslide' 
  | 'air_pollution' 
  | 'extreme_heat' 
  | 'chemical_leak' 
  | 'water_contamination';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface EnvironmentalObservation {
  nodeId: string;
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
    elevation?: number;
    placeName?: string;
  };
  temperature?: number; // °C
  humidity?: number; // %
  rainfall?: number; // mm/hr
  waterLevel?: number; // meters
  riverLevel?: number; // meters
  soilMoisture?: number; // %
  pm25?: number; // µg/m³
  pm10?: number; // µg/m³
  smoke?: number; // ppm
  co?: number; // ppm
  no2?: number; // ppb
  so2?: number; // ppb
  o3?: number; // ppb
  gasLevel?: number; // ppm / LEL %
  vibration?: number; // mm/s or g
  tilt?: number; // degrees
  source: 'physical' | 'satellite' | 'external' | 'historical' | 'predicted' | 'simulation';
  confidence?: number; // 0 - 100%
}

export interface RiskAssessment {
  hazardType: HazardType;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  probability: number; // %
  severity: RiskLevel;
  trend: 'up' | 'down' | 'stable';
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contributingFactors: string[];
  affectedAreaSqKm?: number;
  populationAtRisk?: number;
  recommendedAction: string;
  timestamp: string;
  source: DataProvenance;
}

export interface SensorNode {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    elevation?: number;
    area: string;
  };
  type: 'MULTI_HAZARD' | 'SEISMIC' | 'HYDROLOGICAL' | 'AIR_QUALITY' | 'THERMAL';
  status: 'online' | 'offline' | 'warning' | 'maintenance';
  battery: number; // %
  signalStrength: number; // % or dBm
  lastSeen: string;
  currentReading: EnvironmentalObservation;
  isVirtual?: boolean;
}

export interface Shelter {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  capacity: number;
  occupancy: number;
  medicalAvailable: boolean;
  foodAvailable: boolean;
  waterAvailable: boolean;
  accessibility: boolean;
  contactNumber: string;
  status: 'Open' | 'Available' | 'Nearly Full' | 'Full' | 'Closed';
  distanceKm?: number;
}

export interface Incident {
  id: string;
  title: string;
  category: 'MEDICAL' | 'FLOOD' | 'FIRE' | 'LANDSLIDE' | 'TRAPPED' | 'ACCIDENT' | 'POLLUTION' | 'OTHER';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  description: string;
  peopleCount?: number;
  medicalUrgency?: boolean;
  severity: RiskLevel;
  status: 'Submitted' | 'Verified' | 'Assigned' | 'In Progress' | 'Resolved';
  source: 'COMMUNITY' | 'AUTOMATED_HAZARD' | 'EMERGENCY_SOS';
  reporter: {
    name: string;
    phone?: string;
    userId?: string;
  };
  assignedTeam?: string;
  timestamp: string;
  timeline: {
    stage: string;
    time: string;
    note: string;
  }[];
}

export interface CommunityReport {
  id: string;
  category: 'ENVIRONMENT' | 'INFRASTRUCTURE' | 'EMERGENCY';
  subCategory: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  severity: RiskLevel;
  status: 'Submitted' | 'Verified' | 'Assigned' | 'In Progress' | 'Resolved';
  imageUrl?: string;
  reporterName: string;
  timestamp: string;
  likes: number;
  corroborated: boolean;
  corroborationDetails?: string;
  nearbySensors?: string[];
}

export interface EvacuationRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  destinationShelterId?: string;
  distanceKm: number;
  estimatedTimeMin: number;
  floodExposure: 'Low' | 'Moderate' | 'High';
  fireExposure: 'Low' | 'Moderate' | 'High';
  landslideExposure: 'Low' | 'Moderate' | 'High';
  pollutionExposure: 'Low' | 'Moderate' | 'High';
  roadBlockage: boolean;
  elevationTrend: 'Ascending' | 'Descending' | 'Flat';
  pathCoordinates: [number, number][]; // [lat, lng]
  status: 'RECOMMENDED' | 'SAFE' | 'CAUTION' | 'BLOCKED';
  tradeoffSummary: string;
  recalculated?: boolean;
}

export interface ResponseTeam {
  id: string;
  name: string;
  type: 'Fire & Rescue' | 'Medical Emergency' | 'Field Operations' | 'NDRF Quick Response' | 'Community Volunteers';
  status: 'Available' | 'Assigned' | 'Responding' | 'At Incident' | 'Completed';
  currentLocation: {
    latitude: number;
    longitude: number;
    area: string;
  };
  membersCount: number;
  contactLead: string;
  assignedIncidentId?: string;
}

export interface SimulationScenario {
  id: string;
  name: string;
  hazard: HazardType | 'cascading_multi_hazard';
  location: string;
  durationMinutes: number;
  currentStep: number;
  totalSteps: number;
  active: boolean;
  speedMultiplier: number;
  parameters: {
    rainfallMmHr: number;
    soilSaturationPercent: number;
    temperatureC: number;
    windSpeedKmh: number;
    windDirectionDeg: number;
    slopeInstabilityPercent: number;
    drainageCapacityPercent: number;
    pm25EmissionRate: number;
  };
  virtualSensors: SensorNode[];
  impactMetrics: {
    affectedAreaSqKm: number;
    buildingsExposed: number;
    roadsBlockedCount: number;
    populationAtRisk: number;
    sensorsAffected: number;
    sheltersImpacted: number;
  };
  eventLog: {
    step: number;
    timeLabel: string;
    message: string;
    severity: RiskLevel;
  }[];
}
