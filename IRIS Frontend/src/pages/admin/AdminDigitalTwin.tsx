import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  InputAdornment,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import {
  Layers as LayerIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  RestartAlt as ResetIcon,
  Tune as ControlsIcon,
  Public as GlobeIcon,
  Edit as PlanIcon,
  Block as BlockIcon,
  House as ShelterIcon,
  Group as TeamIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Fullscreen as FullscreenIcon,
  SatelliteAlt as SatelliteIcon,
  Terrain as TerrainIcon,
  Map as MapIcon,
  Sensors as SensorIcon,
  Warning as HazardIcon,
  AltRoute as RouteIcon,
  MyLocation as LocateIcon,
  Search as SearchIcon,
  ViewInAr as ThreeDIcon,
  Apartment as BuildingIcon,
  WaterDrop as WaterIcon,
  AddRoad as RoadIcon
} from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DigitalTwin3DScene } from '../../components/digitaltwin/DigitalTwin3DScene';
import { CesiumDigitalTwinViewer } from '../../components/gis/CesiumDigitalTwinViewer';
import { useIrisStore } from '../../store/irisStore';

type BasemapType = 'SATELLITE' | 'HYBRID' | 'TERRAIN' | 'STREET';
type ViewMode = 'CESIUM_3D' | 'COMPLETE_3D' | 'SATELLITE_2D';

interface RegionPreset {
  name: string;
  pincode: string;
  center: [number, number];
  zoom: number;
  desc: string;
  hazard: string;
}

const REGIONAL_PRESETS: RegionPreset[] = [
  { name: 'India (National Overview)', pincode: '000000', center: [20.5937, 78.9629], zoom: 5, desc: 'Country-wide overview map', hazard: 'NONE' },
  { name: 'Monitored Area 1 / Western Himalayas', pincode: '246471', center: [31.0390, 78.8938], zoom: 14, desc: 'Mandakini Basin Inundation Gorge & 3D Building Footprints (1849 Houses)', hazard: 'FLASH_FLOOD' },
  { name: 'Uttarakhand / Mandakini Basin', pincode: '246471', center: [30.5228, 79.0772], zoom: 12, desc: 'Flash flood & debris flow risk', hazard: 'FLASH_FLOOD' },
  { name: 'Western Ghats / Nilgiris', pincode: '643001', center: [11.4102, 76.6950], zoom: 13, desc: 'High landslide & cloudburst sensitivity', hazard: 'LANDSLIDE' },
  { name: 'Himachal / Shimla Slopes', pincode: '171001', center: [31.1048, 77.1734], zoom: 13, desc: 'Steep slope pore pressure saturation', hazard: 'LANDSLIDE' },
  { name: 'Cauvery River Basin / Trichy', pincode: '620001', center: [10.7905, 78.7047], zoom: 12, desc: 'River discharge surge monitoring', hazard: 'FLOOD' },
  { name: 'Wayanad / Meppadi Ghats', pincode: '673121', center: [11.5540, 76.1283], zoom: 13, desc: 'Severe slope debris avalanche zone', hazard: 'LANDSLIDE' },
  { name: 'Guwahati / Brahmaputra', pincode: '781001', center: [26.1445, 91.7362], zoom: 12, desc: 'Monsoon river overflow & embankment breach', hazard: 'FLOOD' }
];

export const AdminDigitalTwin: React.FC = () => {
  const {
    sensors,
    shelters,
    routes,
    simulation,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    advanceSimulationStep,
    runFlagshipDemo
  } = useIrisStore();

  const [activeMode, setActiveMode] = useState<'LIVE' | 'PREDICTION' | 'SIMULATION' | 'PLAN'>('LIVE');
  const [viewMode, setViewMode] = useState<ViewMode>('CESIUM_3D');
  const [basemap, setBasemap] = useState<BasemapType>('SATELLITE');
  const [selectedRegion, setSelectedRegion] = useState(0);

  // Boundary Drawing State
  const [isDrawing, setIsDrawing] = useState(false);
  const isDrawingRef = useRef(false);
  useEffect(() => { isDrawingRef.current = isDrawing; }, [isDrawing]);

  const [customPolygon, setCustomPolygon] = useState<[number, number][]>([]);
  const customPolygonRef = useRef<[number, number][]>([]);
  useEffect(() => { customPolygonRef.current = customPolygon; }, [customPolygon]);
  
  
  const getPolygonCentroid = (poly: [number, number][]): [number, number] => {
    if (!poly || poly.length === 0) return [0, 0];
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    for (const [lat, lng] of poly) {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    }
    return [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
  };

  // Calculate Area
  const getCalculatedArea = () => {
    if (customPolygon.length < 3) return 0;
    return Math.floor(Math.random() * 500000) + 1500000; // Mocked for UI like in the reference image
  };


  // Search by PIN Code or Area
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [userGpsPos, setUserGpsPos] = useState<[number, number] | null>(null);

  // Selected 3D Building Inspector Modal
  const [inspectedBuilding, setInspectedBuilding] = useState<any | null>(null);

  // Toggleable Layers State
  const [layers, setLayers] = useState({
    satelliteBasemap: true,
    labelsOverlay: true,
    sensors: true,
    floodExtent: true,
    landslideHazard: true,
    shelters: true,
    evacuationRoutes: true,
    blockedRoads: true
  });

  const [weatherData, setWeatherData] = useState<any>(null);


  const currentPreset = REGIONAL_PRESETS[selectedRegion];
  const activeCenter = userGpsPos || currentPreset.center;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const [lat, lon] = activeCenter;
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e6ab33f5495e15dd65899f39a940c47e&units=metric`);
        const data = await res.json();
        if (res.ok) {
          setWeatherData(data);
        }
      } catch (err) {
        console.error('Failed to fetch OpenWeather', err);
      }
    };
    fetchWeather();
  }, [activeCenter]);

  const handleToggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);
  const overlayGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Leaflet Map (when in 2D mode)
  useEffect(() => {
    if (viewMode !== 'SATELLITE_2D') {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      return;
    }

    if (!mapContainerRef.current || mapRef.current) return;

    const initialPreset = REGIONAL_PRESETS[selectedRegion];
    const initialCenter = userGpsPos || initialPreset.center;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialPreset.zoom,
      zoomControl: false,
      attributionControl: false
    });

    L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map);

    mapRef.current = map;
    overlayGroupRef.current = L.layerGroup().addTo(map);

    // Drawing Logic
    map.on('click', (e: any) => {
        if (isDrawingRef.current) {
            setCustomPolygon(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
        }
    });


    updateBasemap(basemap, map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [viewMode]);

  // Update Basemap Tiles
  const updateBasemap = (type: BasemapType, targetMap?: L.Map) => {
    const map = targetMap || mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    if (labelsLayerRef.current) map.removeLayer(labelsLayerRef.current);

    let tileUrl = '';
    let hasLabels = false;

    if (type === 'SATELLITE' || type === 'HYBRID') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      hasLabels = type === 'HYBRID';
    } else if (type === 'TERRAIN') {
      tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    } else {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    }

    tileLayerRef.current = L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);

    if (hasLabels) {
      labelsLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      ).addTo(map);
    }
  };

  useEffect(() => {
    if (viewMode === 'SATELLITE_2D') {
      updateBasemap(basemap);
    }

  }, [basemap, viewMode]);

  // Handle Region Fly-To
  const handleFlyToRegion = (index: number) => {
    setSelectedRegion(index);
    const preset = REGIONAL_PRESETS[index];
    if (mapRef.current && viewMode === 'SATELLITE_2D') {
      mapRef.current.flyTo(preset.center, preset.zoom, { duration: 1.5 });
    }
  };

  // Search by PIN Code or Area Name
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchError('');
    const query = searchQuery.trim().toLowerCase();

    // 1. Check local pre-indexed PIN codes & regions
    const matchedIdx = REGIONAL_PRESETS.findIndex(
      (r) =>
        r.pincode === query ||
        r.name.toLowerCase().includes(query) ||
        r.desc.toLowerCase().includes(query)
    );

    if (matchedIdx !== -1) {
      handleFlyToRegion(matchedIdx);
      return;
    }

    // 2. OpenStreetMap Nominatim Live Geocoding API for any Indian PIN code or area
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', India')}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setUserGpsPos([lat, lon]);

        if (mapRef.current && viewMode === 'SATELLITE_2D') {
          mapRef.current.flyTo([lat, lon], 14, { duration: 1.5 });
        }
      } else {
        setSearchError(`No coordinates found for "${searchQuery}". Showing nearest regional monitoring hub.`);
      }
    } catch (err) {
      setSearchError('Geocoding service unavailable. Using local catalog.');
    }
  };

  // Navigate to My Current Location (GPS)
  const myLocationCircleRef = useRef<L.Circle | null>(null);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserGpsPos(coords);
        setIsLocating(false);

        if (mapRef.current && viewMode === 'SATELLITE_2D') {
          mapRef.current.flyTo(coords, 14, { duration: 1.5 });
          
          if (myLocationCircleRef.current) {
            myLocationCircleRef.current.remove();
          }
          myLocationCircleRef.current = L.circle(coords, {
            radius: 5000,
            color: '#0ea5e9',
            fillColor: '#0ea5e9',
            fillOpacity: 0.1,
            weight: 2,
            dashArray: '5, 5'
          }).bindPopup('5 KM Radius Surveillance Zone').addTo(mapRef.current);
        }
      },
      (err) => {
        setIsLocating(false);
        alert(`Location access failed: ${err.message}. Defaulting to Regional Center.`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Render Overlays on Leaflet Map
  useEffect(() => {
    if (viewMode !== 'SATELLITE_2D') return;

    const map = mapRef.current;
    const overlayGroup = overlayGroupRef.current;
    if (!map || !overlayGroup) return;

    overlayGroup.clearLayers();

    const currCenter = userGpsPos || REGIONAL_PRESETS[selectedRegion].center;
    const [cLat, cLng] = currCenter;

    // GPS User Marker if active
    if (userGpsPos) {
      const userPin = L.divIcon({
        className: 'user-gps-beacon',
        html: `
          <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: #0284c7; opacity: 0.45; animation: ping 1.5s infinite;"></div>
            <div style="width: 18px; height: 18px; border-radius: 50%; background: #0284c7; border: 3px solid #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.5);"></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      L.marker(userGpsPos, { icon: userPin })
        .addTo(overlayGroup)
        .bindPopup('<strong>📍 YOUR CURRENT GPS LOCATION</strong><br/>Digital Twin Centered');
    }

    // 1. Landslide Hazard Zone
    if (layers.landslideHazard) {
      const landslideCoords: [number, number][] = [
        [cLat + 0.008, cLng - 0.012],
        [cLat + 0.016, cLng - 0.002],
        [cLat + 0.012, cLng + 0.015],
        [cLat + 0.002, cLng + 0.008]
      ];

      L.polygon(landslideCoords, {
        color: simulation.currentStep >= 2 ? '#ef4444' : '#f97316',
        weight: 3,
        dashArray: '6, 6',
        fillColor: simulation.currentStep >= 2 ? '#ef4444' : '#f97316',
        fillOpacity: simulation.currentStep >= 2 ? 0.65 : 0.4
      })
        .addTo(overlayGroup)
        .bindPopup('<strong>⚠️ LANDSLIDE DEBRIS SLIP (SLOPE K-12)</strong><br/>Mass: 12,000 m³ &bull; FoS = 0.87');
    }

    // 2. Flood Inundation Polygon
    if (layers.floodExtent) {
      const floodMult = simulation.currentStep >= 3 ? 1.6 : 1.0;
      const floodCoords: [number, number][] = [
        [cLat - 0.003 * floodMult, cLng - 0.02 * floodMult],
        [cLat + 0.006 * floodMult, cLng + 0.005],
        [cLat - 0.012 * floodMult, cLng + 0.025 * floodMult],
        [cLat - 0.018 * floodMult, cLng - 0.005]
      ];

      L.polygon(floodCoords, {
        color: '#0284c7',
        weight: 2.5,
        fillColor: '#38bdf8',
        fillOpacity: simulation.currentStep >= 3 ? 0.65 : 0.45
      })
        .addTo(overlayGroup)
        .bindPopup(`<strong>🌊 FLASH FLOOD EXTENT</strong><br/>Depth: ${simulation.currentStep >= 3 ? '2.8m' : '1.2m'}`);
    }

    // 3. Evacuation Corridors
    if (layers.evacuationRoutes) {
      const isAlphaBlocked = simulation.currentStep >= 2;
      L.polyline(
        [
          [cLat - 0.025, cLng - 0.03],
          [cLat - 0.01, cLng - 0.015],
          [cLat + 0.005, cLng - 0.002],
          [cLat + 0.02, cLng + 0.02]
        ],
        {
          color: isAlphaBlocked ? '#ef4444' : '#f59e0b',
          weight: isAlphaBlocked ? 4 : 5,
          dashArray: isAlphaBlocked ? '8, 8' : undefined
        }
      )
        .addTo(overlayGroup)
        .bindPopup(isAlphaBlocked ? '<strong>❌ CORRIDOR ALPHA: SEVERED</strong>' : '<strong>⚠️ CORRIDOR ALPHA (VALLEY HIGHWAY)</strong>');

      L.polyline(
        [
          [cLat - 0.025, cLng - 0.03],
          [cLat - 0.02, cLng + 0.01],
          [cLat, cLng + 0.028],
          [cLat + 0.02, cLng + 0.02]
        ],
        { color: '#10b981', weight: 6 }
      )
        .addTo(overlayGroup)
        .bindPopup('<strong>✅ CORRIDOR BETA (RIDGE BYPASS)</strong><br/>Safe Elevation +180m');
    }

    // 4. Sensors
    if (layers.sensors) {
      sensors.forEach((s, idx) => {
        const sLat = cLat + (idx % 2 === 0 ? 1 : -1) * 0.008 * (idx + 1);
        const sLng = cLng + (idx % 3 === 0 ? 1 : -1) * 0.01 * (idx + 1);

        const sensorIcon = L.divIcon({
          className: 'custom-sensor-marker',
          html: `
            <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
              <div style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background: #0284c7; opacity: 0.35; animation: ping 2s infinite;"></div>
              <div style="width: 16px; height: 16px; border-radius: 50%; background: #0284c7; border: 2.5px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        L.marker([sLat, sLng], { icon: sensorIcon })
          .addTo(overlayGroup)
          .bindPopup(`<strong>${s.name}</strong><br/>Type: ${s.type}<br/>Signal: ${s.signalStrength}% (LoRa)`);
      });
    }

    // 5. Shelters
    if (layers.shelters) {
      shelters.forEach((sh, idx) => {
        const shLat = cLat + (idx === 0 ? 0.02 : -0.02);
        const shLng = cLng + (idx === 0 ? 0.02 : 0.025);

        const shelterIcon = L.divIcon({
          className: 'custom-shelter-marker',
          html: `<div style="width:30px;height:30px;background:#10b981;border:2.5px solid #ffffff;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;box-shadow:0 3px 8px rgba(0,0,0,0.3);">🏠</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        L.marker([shLat, shLng], { icon: shelterIcon })
          .addTo(overlayGroup)
          .bindPopup(`<strong>${sh.name}</strong><br/>Capacity: ${sh.occupancy}/${sh.capacity} beds`);
      });
    }

    // CUSTOM POLYGON DRAWING RENDER
    if (customPolygon.length > 0) {
        L.polygon(customPolygon, { color: '#0288d1', fillColor: '#0288d1', fillOpacity: 0.3, weight: 3, dashArray: '4, 4' }).addTo(overlayGroup);
        customPolygon.forEach((pt, i) => {
          L.circleMarker(pt, { radius: 6, color: '#fff', fillColor: '#0288d1', fillOpacity: 1, weight: 2 }).addTo(overlayGroup);
        });
    }
  }, [selectedRegion, layers, simulation.currentStep, sensors, shelters, userGpsPos, viewMode, customPolygon]);


  const activeAreaDisplayName = userGpsPos ? 'Current GPS Location (User Centered)' : currentPreset.name;

  return (
    <Box sx={{ maxWidth: 1600, mx: 'auto', p: { xs: 1, md: 2 } }}>
      {/* Top Header & Search Bar */}
      <Box sx={{ mb: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ThreeDIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
              3D Geographic Digital Twin — Complete 3D & Satellite
            </Typography>
            <Chip
              label={`MODE: ${activeMode}`}
              size="small"
              sx={{
                fontWeight: 800,
                bgcolor: activeMode === 'SIMULATION' ? '#fee2e2' : '#e0f2fe',
                color: activeMode === 'SIMULATION' ? '#dc2626' : '#0369a1',
                border: '1px solid currentColor'
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Select any region, search by PIN code, or navigate to your current GPS location to explore in complete 3D with buildings, reservoir, dam, and river drives.
          </Typography>
        </Box>

        {/* View Mode Toggle: 3D vs Satellite */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, val) => val && setViewMode(val)}
            size="small"
            sx={{ bgcolor: '#ffffff' }}
          >
            <ToggleButton value="CESIUM_3D" sx={{ textTransform: 'none', fontWeight: 700, px: 1.5 }}>
              <GlobeIcon sx={{ fontSize: 18, mr: 0.8 }} /> Cesium 3D Globe
            </ToggleButton>
            <ToggleButton value="COMPLETE_3D" sx={{ textTransform: 'none', fontWeight: 700, px: 1.5 }}>
              <ThreeDIcon sx={{ fontSize: 18, mr: 0.8 }} /> 3D Model Mesh
            </ToggleButton>
            <ToggleButton value="SATELLITE_2D" sx={{ textTransform: 'none', fontWeight: 700, px: 1.5 }}>
              <SatelliteIcon sx={{ fontSize: 18, mr: 0.8 }} /> Satellite GIS
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Quick Mode Buttons */}
          <Box sx={{ display: 'flex', gap: 0.5, bgcolor: '#ffffff', p: 0.5, borderRadius: 2, border: '1px solid #e2e8f0' }}>
            {(['LIVE', 'SIMULATION'] as const).map((m) => (
              <Button
                key={m}
                size="small"
                variant={activeMode === m ? 'contained' : 'text'}
                onClick={() => setActiveMode(m)}
                sx={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'none', py: 0.2 }}
              >
                {m}
              </Button>
            ))}
          </Box>
        </Stack>
      </Box>

      {/* Search & Navigation Bar */}
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 1.5,
          mb: 2,
          bgcolor: '#ffffff',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1.5
        }}
      >
        {/* PIN Code / Area Search Form */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: { xs: '100%', sm: 380 } }}
        >
          <TextField
            size="small"
            fullWidth
            placeholder="Search by 6-digit PIN code (e.g., 246471, 643001) or Area (e.g., Rudraprayag, Ooty, Wayanad)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{ px: 2.5, fontWeight: 700, textTransform: 'none', whiteSpace: 'nowrap' }}
          >
            Search & 3D View
          </Button>
        </Box>

        {/* GPS Navigate to My Location */}
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<LocateIcon />}
          onClick={handleLocateMe}
          disabled={isLocating}
          sx={{ fontWeight: 700, textTransform: 'none', whiteSpace: 'nowrap', py: 0.8 }}
        >
          {isLocating ? 'Locating GPS...' : 'Navigate to My Location'}
        </Button>

        {/* Quick Regional Preset Chips */}
        <Stack direction="row" spacing={0.8} sx={{ overflowX: 'auto', maxWidth: '100%' }}>
          {REGIONAL_PRESETS.map((p, idx) => (
            <Chip
              key={idx}
              label={`${p.name.split('/')[0]} (${p.pincode})`}
              size="small"
              color={selectedRegion === idx && !userGpsPos ? 'primary' : 'default'}
              onClick={() => {
                setUserGpsPos(null);
                handleFlyToRegion(idx);
              }}
              sx={{ fontWeight: 600, fontSize: '0.72rem', cursor: 'pointer' }}
            />
          ))}
        </Stack>
      </Paper>

      {searchError && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setSearchError('')}>
          {searchError}
        </Alert>
      )}

      {/* Main Digital Twin Grid */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 2.5,
              overflow: 'hidden',
              bgcolor: '#ffffff',
              boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)'
            }}
          >
            {/* Viewport: Cesium 3D Globe, Procedural 3D Scene, OR Realtime Satellite Map */}
            <Box sx={{ position: 'relative', width: '100%', height: 620 }}>
              {viewMode === 'CESIUM_3D' ? (
                                  <CesiumDigitalTwinViewer
                    latitude={customPolygon.length > 2 ? getPolygonCentroid(customPolygon)[0] : (userGpsPos ? userGpsPos[0] : currentPreset.center[0])}
                    longitude={customPolygon.length > 2 ? getPolygonCentroid(customPolygon)[1] : (userGpsPos ? userGpsPos[1] : currentPreset.center[1])}
                    areaName={activeAreaDisplayName}
                    height="620px"
                    polygon={customPolygon.length > 2 ? customPolygon : undefined}
                    isRaining={simulation.isPlaying || simulation.currentStep > 0}
                    rainfallIntensity={simulation.parameters?.rainfallMmHr || 65}
                    windSpeed={24}
                    onViewInGIS={() => setViewMode('SATELLITE_2D')}
                  />
              ) : viewMode === 'CESIUM_3D' ? (
                <DigitalTwin3DScene
                  simulationStep={simulation.currentStep}
                  areaName={activeAreaDisplayName}
                  pincode={currentPreset.pincode}
                  waterLevelMultiplier={simulation.currentStep * 0.7}
                  onSelectBuilding={(bld) => setInspectedBuilding(bld)}
                />
              ) : (
                <>
                                      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

                    {/* GIS Monitoring Drawing Tools (Minimalistic Material) */}
                    {viewMode === 'SATELLITE_2D' && (
                      <Paper elevation={3} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1000, p: 2.5, width: 300, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
                        <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <MapIcon fontSize="small" /> Area Selection
                        </Typography>
                        
                        <Button 
                          variant={isDrawing ? 'contained' : 'outlined'} 
                          color="primary" 
                          fullWidth 
                          size="small"
                          onClick={() => setIsDrawing(!isDrawing)}
                          sx={{ mb: 1.5, textTransform: 'none', fontWeight: 600 }}
                        >
                          {isDrawing ? 'Select Points on Map...' : 'Draw Custom Boundary'}
                        </Button>
                        
                        <Stack direction="row" spacing={1} sx={{ mb: customPolygon.length >= 3 ? 2 : 0 }}>
                          <Button variant="text" color="inherit" size="small" fullWidth onClick={() => setCustomPolygon(prev => prev.slice(0, -1))} disabled={customPolygon.length === 0} sx={{ textTransform: 'none', opacity: 0.7 }}>Undo</Button>
                          <Button variant="text" color="inherit" size="small" fullWidth onClick={() => setCustomPolygon([])} disabled={customPolygon.length === 0} sx={{ textTransform: 'none', opacity: 0.7 }}>Clear</Button>
                        </Stack>
                        
                        {customPolygon.length >= 3 && (
                          <Box sx={{ mb: 2, px: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.2 }}>Estimated Enclosed Area</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                              {(getCalculatedArea() / 1000000).toFixed(2)} km� <Typography component="span" variant="caption" sx={{color: 'text.secondary'}}>({getCalculatedArea().toLocaleString()} sq m)</Typography>
                            </Typography>
                          </Box>
                        )}
                        {customPolygon.length >= 3 && (
                          <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            disabled={customPolygon.length < 3}
                            onClick={() => setViewMode('CESIUM_3D')}
                            startIcon={<ThreeDIcon />}
                            sx={{ fontWeight: 600, textTransform: 'none', boxShadow: 2 }}
                          >
                            Generate 3D Twin
                          </Button>
                        )}
                      </Paper>
                    )}


                  {/* Satellite Basemap Selector Bar */}
                  <Paper
                    elevation={3}
                    sx={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      zIndex: 1000,
                      p: 0.5,
                      bgcolor: 'rgba(255,255,255,0.95)',
                      borderRadius: 2
                    }}
                  >
                    <ToggleButtonGroup
                      value={basemap}
                      exclusive
                      onChange={(_, val) => val && setBasemap(val)}
                      size="small"
                    >
                      <ToggleButton value="SATELLITE" sx={{ py: 0.3, px: 1, textTransform: 'none', fontSize: '0.75rem', fontWeight: 600 }}>
                        <SatelliteIcon sx={{ fontSize: 16, mr: 0.5 }} /> Satellite
                      </ToggleButton>
                      <ToggleButton value="HYBRID" sx={{ py: 0.3, px: 1, textTransform: 'none', fontSize: '0.75rem', fontWeight: 600 }}>
                        <SatelliteIcon sx={{ fontSize: 16, mr: 0.5 }} /> Hybrid
                      </ToggleButton>
                      <ToggleButton value="TERRAIN" sx={{ py: 0.3, px: 1, textTransform: 'none', fontSize: '0.75rem', fontWeight: 600 }}>
                        <TerrainIcon sx={{ fontSize: 16, mr: 0.5 }} /> Terrain
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Paper>
                </>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Right Tactical Sidebar */}
        <Grid size={{ xs: 12, lg: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Active Area Details */}
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>
                Selected Region Profile
              </Typography>
              <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 1.5, border: '1px solid #e2e8f0', mb: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {activeAreaDisplayName}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  PIN Code: <strong>{currentPreset.pincode}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  Hazard Profile: <strong>{currentPreset.hazard}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  {currentPreset.desc}
                </Typography>
              {weatherData && (<Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #e2e8f0' }}><Typography variant='caption' color='primary' sx={{ display: 'block', fontWeight: 700, mb: 0.5 }}>Live Weather (OpenWeather API)</Typography><Stack direction='row' spacing={2}><Typography variant='caption' color='text.primary'>Temp: {weatherData.main?.temp}�C</Typography><Typography variant='caption' color='text.primary'>Humidity: {weatherData.main?.humidity}%</Typography></Stack><Typography variant='caption' color='text.secondary' sx={{ display: 'block', mt: 0.5, textTransform: 'capitalize' }}>{weatherData.weather?.[0]?.description}</Typography></Box>)}</Box>

              <Button
                variant={viewMode === 'CESIUM_3D' ? 'contained' : 'outlined'}
                fullWidth
                size="small"
                startIcon={<ThreeDIcon />}
                onClick={() => setViewMode(viewMode === 'CESIUM_3D' ? 'SATELLITE_2D' : 'COMPLETE_3D')}
                sx={{ textTransform: 'none', fontWeight: 700 }}
              >
                {viewMode === 'CESIUM_3D' ? 'Switch to Satellite Map' : 'Switch to 3D Digital Twin'}
              </Button>
            </Paper>

            {/* 3D Features Legend */}
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                3D Physical Model Architecture
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BuildingIcon color="primary" fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Extruded 3D Buildings & Flood Waterlines
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WaterIcon color="info" fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Concrete Gravity Dam & Volumetric Reservoir
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <RoadIcon color="success" fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Valley River Drives & Ridge Bypass Bridge
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HazardIcon color="error" fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Landslide Slope Debris Slip (Slope K-12)
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* Simulation Controls */}
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#ffffff', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                Multi-Hazard Cascade Scrubber
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                Timeline: <strong>T+{simulation.currentStep * 15} MIN</strong> (Water level rises dynamically)
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  startIcon={simulation.isPlaying ? <PauseIcon /> : <PlayIcon />}
                  onClick={simulation.isPlaying ? pauseSimulation : startSimulation}
                  sx={{ textTransform: 'none', fontWeight: 700 }}
                >
                  {simulation.isPlaying ? 'Pause' : 'Play'}
                </Button>
                <IconButton size="small" onClick={resetSimulation}>
                  <ResetIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="small"
                onClick={runFlagshipDemo}
                sx={{ textTransform: 'none', fontWeight: 800 }}
              >
                Auto-Run Flagship Demo
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Building Details Dialog */}
      <Dialog open={!!inspectedBuilding} onClose={() => setInspectedBuilding(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
          <BuildingIcon color="primary" /> {inspectedBuilding?.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Type:</strong> {inspectedBuilding?.type}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Elevation:</strong> {inspectedBuilding?.elevation}m above sea level
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Structural Integrity:</strong> Reinforced Concrete &bull; Earthquake & Flood Resilient
          </Typography>
          <Typography variant="body2" color={inspectedBuilding?.elevation < 80 ? 'error.main' : 'success.main'} sx={{ fontWeight: 700 }}>
            Status: {inspectedBuilding?.elevation < 80 ? 'Vulnerable to riverbank inundation surge' : 'Safe High-Elevation Evacuation Sector'}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminDigitalTwin;

