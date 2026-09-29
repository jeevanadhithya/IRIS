export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
  center_lat?: number;
  center_lng?: number;
  place_name?: string;
}

export interface Shelter {
  id: string;
  name: string;
  lat: number;
  lng: number;
  capacity: number;
  elevation_m?: number;
  type?: string;
  status?: string;
}

export interface RoadFeature {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    road_type: string;
    length_m: number;
    speed_kmh: number;
    width_px?: number;
    is_major?: boolean;
    accessibility: "open" | "restricted" | "flooded" | "caution";
    flood_risk: number;
  };
  geometry: {
    type: "LineString";
    coordinates: [number, number][]; // [lng, lat]
  };
}

export interface RiverFeature {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    waterway_type: string;
    width_m: number;
    length_m: number;
    is_water_body?: boolean;
    is_main_river?: boolean;
    flow_direction?: string;
    flood_susceptibility?: number;
  };
  geometry: {
    type: "LineString";
    coordinates: [number, number][]; // [lng, lat]
  };
}

export interface BuildingFeature {
  type: "Feature";
  properties: {
    id: string;
    osm_type: "way" | "relation";
    osm_id: number;
    building: string;
    name: string;
    height_m: number;
    height_source: string;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

export interface NetworkExtractionResponse {
  status: string;
  bbox: BoundingBox;
  roads: {
    geojson: {
      type: "FeatureCollection";
      features: RoadFeature[];
      metadata?: { total_nodes: number; total_edges: number };
    };
    total_nodes: number;
    total_edges: number;
  };
  rivers: {
    geojson: {
      type: "FeatureCollection";
      features: RiverFeature[];
      metadata?: { total_nodes: number; total_edges: number };
    };
    total_nodes: number;
    total_edges: number;
  };
  buildings?: {
    geojson: {
      type: "FeatureCollection";
      features: BuildingFeature[];
      metadata?: { total_buildings: number };
    };
    total_features: number;
  };
  shelters?: Shelter[];
}

export interface BuildingExtractionResponse {
  status: string;
  bbox: BoundingBox;
  buildings: NonNullable<NetworkExtractionResponse["buildings"]>;
}

export interface HighRiskZone {
  node_id: string | number;
  lat: number;
  lng: number;
  probability: number;
  severity: "low" | "medium" | "high" | "critical";
}

export interface RiskPredictionResponse {
  status: string;
  bbox: BoundingBox;
  prediction: {
    node_predictions: Record<string, any>;
    high_risk_zones: HighRiskZone[];
    overall_severity: string;
    critical_nodes_count: number;
    high_nodes_count: number;
    mean_flood_probability: number;
    model_architecture: string;
  };
}

export interface EvacuationRouteResponse {
  status: "success" | "no_path" | "error";
  route_status?: "SAFE" | "CAUTION" | "HAZARDOUS";
  message?: string;
  origin?: { lat: number; lng: number };
  shelter?: Shelter;
  destination_name?: string;
  destination?: { lat: number; lng: number };
  total_distance_km?: number;
  total_distance_m?: number;
  estimated_time_minutes?: number;
  max_flood_risk_encountered?: number;
  path_nodes_count?: number;
  coordinates?: [number, number][]; // [lat, lng]
}

export async function extractNetworks(params: {
  lat?: number;
  lng?: number;
  radius_km?: number;
  place_name?: string;
  polygon?: number[][];
  north?: number;
  south?: number;
  east?: number;
  west?: number;
}): Promise<NetworkExtractionResponse> {
  const cLat = params.lat || 11.4102;
  const cLng = params.lng || 76.6950;
  const r = 0.02;

  const bbox: BoundingBox = {
    north: params.north || cLat + r,
    south: params.south || cLat - r,
    east: params.east || cLng + r,
    west: params.west || cLng - r,
    center_lat: cLat,
    center_lng: cLng,
    place_name: params.place_name || "Selected Area"
  };

  // Generate realistic road features
  const roads: RoadFeature[] = [
    {
      type: "Feature",
      properties: {
        id: "RD-01",
        name: "Valley River Highway (Corridor Alpha)",
        road_type: "primary",
        length_m: 4200,
        speed_kmh: 40,
        accessibility: "restricted",
        flood_risk: 0.84
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [cLng - 0.015, cLat - 0.015],
          [cLng - 0.005, cLat - 0.005],
          [cLng + 0.005, cLat + 0.005],
          [cLng + 0.015, cLat + 0.015]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "RD-02",
        name: "Ridge Bypass Expressway (Corridor Beta)",
        road_type: "secondary",
        length_m: 5800,
        speed_kmh: 60,
        accessibility: "open",
        flood_risk: 0.12
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [cLng - 0.015, cLat - 0.015],
          [cLng - 0.01, cLat + 0.008],
          [cLng + 0.002, cLat + 0.018],
          [cLng + 0.015, cLat + 0.015]
        ]
      }
    }
  ];

  // Generate river waterway
  const rivers: RiverFeature[] = [
    {
      type: "Feature",
      properties: {
        id: "RIV-01",
        name: "Main River Channel Axis",
        waterway_type: "river",
        width_m: 45,
        length_m: 8500,
        flood_susceptibility: 0.92
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [cLng - 0.02, cLat - 0.01],
          [cLng - 0.008, cLat - 0.002],
          [cLng + 0.006, cLat + 0.004],
          [cLng + 0.022, cLat + 0.012]
        ]
      }
    }
  ];

  // Generate buildings
  const buildings: BuildingFeature[] = [];
  for (let i = 0; i < 18; i++) {
    const bLat = cLat + (Math.sin(i) * 0.008);
    const bLng = cLng + (Math.cos(i) * 0.009);
    const size = 0.0006;
    buildings.push({
      type: "Feature",
      properties: {
        id: `BLD-${i + 1}`,
        osm_type: "way",
        osm_id: 1000 + i,
        building: i % 4 === 0 ? "hospital" : i % 3 === 0 ? "school" : "residential",
        name: i === 0 ? "Emergency Operations HQ" : i === 1 ? "Relief Shelter Alpha" : `Sector Block ${i + 1}`,
        height_m: 8 + (i % 5) * 4,
        height_source: "estimated"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [bLng, bLat],
            [bLng + size, bLat],
            [bLng + size, bLat + size],
            [bLng, bLat + size],
            [bLng, bLat]
          ]
        ]
      }
    });
  }

  return {
    status: "success",
    bbox,
    roads: {
      geojson: { type: "FeatureCollection", features: roads },
      total_nodes: 42,
      total_edges: 38
    },
    rivers: {
      geojson: { type: "FeatureCollection", features: rivers },
      total_nodes: 18,
      total_edges: 16
    },
    buildings: {
      geojson: { type: "FeatureCollection", features: buildings },
      total_features: buildings.length
    },
    shelters: [
      { id: "SH-01", name: "Regional Relief Shelter 01", lat: cLat + 0.01, lng: cLng + 0.01, capacity: 500 },
      { id: "SH-02", name: "Government High School Center", lat: cLat - 0.01, lng: cLng + 0.015, capacity: 350 }
    ]
  };
}

export async function extractBuildings(params: {
  lat?: number;
  lng?: number;
  radius_km?: number;
}): Promise<BuildingExtractionResponse> {
  const net = await extractNetworks(params);
  return {
    status: "success",
    bbox: net.bbox,
    buildings: net.buildings!
  };
}

export async function predictRisk(params: {
  lat?: number;
  lng?: number;
  rainfall_intensity_mm?: number;
}): Promise<RiskPredictionResponse> {
  const cLat = params.lat || 11.4102;
  const cLng = params.lng || 76.6950;
  return {
    status: "success",
    bbox: { north: cLat + 0.02, south: cLat - 0.02, east: cLng + 0.02, west: cLng - 0.02 },
    prediction: {
      node_predictions: {},
      high_risk_zones: [
        { node_id: "ZONE-A", lat: cLat + 0.005, lng: cLng - 0.002, probability: 0.88, severity: "critical" },
        { node_id: "ZONE-B", lat: cLat - 0.008, lng: cLng + 0.006, probability: 0.72, severity: "high" }
      ],
      overall_severity: "CRITICAL",
      critical_nodes_count: 3,
      high_nodes_count: 8,
      mean_flood_probability: 0.74,
      model_architecture: "Physics-Informed Neural Network (PINN) + Hydrodynamic Mesh"
    }
  };
}

export async function calculateEvacuationRoute(params: {
  user_lat: number;
  user_lng: number;
  dest_lat?: number;
  dest_lng?: number;
}): Promise<EvacuationRouteResponse> {
  const { user_lat, user_lng, dest_lat, dest_lng } = params;
  const dLat = dest_lat || user_lat + 0.015;
  const dLng = dest_lng || user_lng + 0.018;

  return {
    status: "success",
    route_status: "SAFE",
    destination_name: "Regional Safe Shelter Hub",
    total_distance_km: 4.8,
    estimated_time_minutes: 18,
    max_flood_risk_encountered: 0.12,
    coordinates: [
      [user_lat, user_lng],
      [user_lat - 0.004, user_lng + 0.008],
      [user_lat + 0.006, user_lng + 0.014],
      [dLat, dLng]
    ]
  };
}

export async function getEmergencyShelters(lat?: number, lng?: number): Promise<{ shelters: Shelter[] }> {
  const cLat = lat || 11.4102;
  const cLng = lng || 76.6950;
  return {
    shelters: [
      { id: "SH-01", name: "District Relief Shelter Alpha", lat: cLat + 0.012, lng: cLng + 0.014, capacity: 500 },
      { id: "SH-02", name: "Polytechnic Campus Hub", lat: cLat - 0.015, lng: cLng + 0.018, capacity: 350 }
    ]
  };
}
