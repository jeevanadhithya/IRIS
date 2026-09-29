import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  FormControlLabel,
  Checkbox,
  Divider,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  Navigation as NavigationIcon,
  House as ShelterIcon,
  WarningAmber as WarningIcon,
  Sensors as SensorIcon,
  MyLocation as LocateIcon,
  SatelliteAlt as SatelliteIcon,
  Map as MapIcon,
  ViewInAr as ThreeDIcon
} from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useIrisStore } from '../../store/irisStore';
import { CesiumDigitalTwinViewer } from '../../components/gis/CesiumDigitalTwinViewer';

export const UserMap: React.FC = () => {
  const { sensors, shelters, riskAssessments, routes } = useIrisStore();
  const [viewFormat, setViewFormat] = useState<'3D_TWIN' | '2D_GIS'>('3D_TWIN');
  const [showShelters, setShowShelters] = useState(true);
  const [showHazards, setShowHazards] = useState(true);
  const [showSensors, setShowSensors] = useState(true);
  const [mapType, setMapType] = useState<'SATELLITE' | 'STREET'>('SATELLITE');

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);
  const overlayGroupRef = useRef<L.LayerGroup | null>(null);

  const citizenPos: [number, number] = [31.0390, 78.8938];

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: citizenPos,
      zoom: 13,
      zoomControl: true,
      attributionControl: false
    });

    mapRef.current = map;
    overlayGroupRef.current = L.layerGroup().addTo(map);

    updateBasemap(mapType, map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const updateBasemap = (type: 'SATELLITE' | 'STREET', targetMap?: L.Map) => {
    const map = targetMap || mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    if (labelsLayerRef.current) map.removeLayer(labelsLayerRef.current);

    if (type === 'SATELLITE') {
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      ).addTo(map);

      labelsLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      ).addTo(map);
    } else {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        { maxZoom: 19 }
      ).addTo(map);
    }
  };

  useEffect(() => {
    updateBasemap(mapType);
  }, [mapType]);

  // Update Overlays
  useEffect(() => {
    const map = mapRef.current;
    const overlayGroup = overlayGroupRef.current;
    if (!map || !overlayGroup) return;

    overlayGroup.clearLayers();

    // 1. Citizen GPS Location Marker
    const userIcon = L.divIcon({
      className: 'user-pos-marker',
      html: `
        <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: #0284c7; opacity: 0.4; animation: ping 1.8s infinite;"></div>
          <div style="width: 18px; height: 18px; border-radius: 50%; background: #0284c7; border: 3px solid #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.5);"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker(citizenPos, { icon: userIcon })
      .addTo(overlayGroup)
      .bindPopup('<strong>YOU ARE HERE</strong><br/>Sector 4, Nilgiris District<br/><span style="color:#16a34a; font-weight:700;">Nearest Shelter: 1.8 km</span>');

    // 2. Shelters
    if (showShelters) {
      shelters.forEach((sh, idx) => {
        const shLat = citizenPos[0] + (idx === 0 ? 0.015 : -0.012);
        const shLng = citizenPos[1] + (idx === 0 ? 0.018 : 0.014);

        const shelterIcon = L.divIcon({
          className: 'shelter-marker',
          html: `
            <div style="
              width: 30px; height: 30px; background: #16a34a; border: 2.5px solid #ffffff;
              border-radius: 8px; display: flex; align-items: center; justify-content: center;
              color: #ffffff; font-weight: 800; font-size: 13px; box-shadow: 0 3px 8px rgba(0,0,0,0.3);
            ">🏠</div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        L.marker([shLat, shLng], { icon: shelterIcon })
          .addTo(overlayGroup)
          .bindPopup(`
            <strong>${sh.name}</strong><br/>
            ${sh.location.address}<br/>
            <span style="color:#16a34a; font-weight:700;">Capacity: ${sh.occupancy}/${sh.capacity} beds</span>
          `);
      });
    }

    // 3. Hazard Zones
    if (showHazards) {
      // Landslide Zone
      L.polygon(
        [
          [citizenPos[0] + 0.006, citizenPos[1] - 0.008],
          [citizenPos[0] + 0.014, citizenPos[1] + 0.002],
          [citizenPos[0] + 0.009, citizenPos[1] + 0.014],
          [citizenPos[0] + 0.001, citizenPos[1] + 0.005]
        ],
        { color: '#dc2626', fillColor: '#ef4444', fillOpacity: 0.45, weight: 2 }
      )
        .addTo(overlayGroup)
        .bindPopup('<strong>⚠️ LANDSLIDE HAZARD ZONE</strong><br/>Unstable slope. Do not traverse.');

      // Flood Inundation Zone
      L.polygon(
        [
          [citizenPos[0] - 0.002, citizenPos[1] - 0.015],
          [citizenPos[0] + 0.005, citizenPos[1] + 0.004],
          [citizenPos[0] - 0.008, citizenPos[1] + 0.018],
          [citizenPos[0] - 0.014, citizenPos[1] - 0.004]
        ],
        { color: '#0284c7', fillColor: '#38bdf8', fillOpacity: 0.45, weight: 2 }
      )
        .addTo(overlayGroup)
        .bindPopup('<strong>🌊 FLOOD INUNDATION SURGE</strong><br/>River surge depth: 1.2m.');
    }

    // 4. Safe Corridor Polyline
    L.polyline(
      [
        citizenPos,
        [citizenPos[0] - 0.005, citizenPos[1] + 0.01],
        [citizenPos[0] + 0.008, citizenPos[1] + 0.022],
        [citizenPos[0] + 0.015, citizenPos[1] + 0.018]
      ],
      { color: '#16a34a', weight: 5, dashArray: '6, 6' }
    )
      .addTo(overlayGroup)
      .bindPopup('<strong>✅ RECOMMENDED SAFE EVACUATION CORRIDOR</strong><br/>Follow signs to Regional Shelter Hub.');
  }, [showShelters, showHazards, showSensors, shelters]);

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SatelliteIcon color="primary" />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
              Realtime Satellite Hazard & Safe Corridors Map
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Live geospatial perspective showing safe shelters, high threat zones, and verified evacuation routes.
          </Typography>
        </Box>

        {/* Basemap Switcher & Layer Filters */}
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <ToggleButtonGroup
            value={viewFormat}
            exclusive
            onChange={(_, val) => val && setViewFormat(val)}
            size="small"
            sx={{ bgcolor: '#ffffff' }}
          >
            <ToggleButton value="3D_TWIN" sx={{ textTransform: 'none', fontWeight: 700, py: 0.4 }}>
              <ThreeDIcon sx={{ fontSize: 16, mr: 0.5 }} /> 3D Digital Twin
            </ToggleButton>
            <ToggleButton value="2D_GIS" sx={{ textTransform: 'none', fontWeight: 700, py: 0.4 }}>
              <MapIcon sx={{ fontSize: 16, mr: 0.5 }} /> 2D GIS Map
            </ToggleButton>
          </ToggleButtonGroup>

          {viewFormat === '2D_GIS' && (
            <>
              <ToggleButtonGroup
                value={mapType}
                exclusive
                onChange={(_, val) => val && setMapType(val)}
                size="small"
              >
                <ToggleButton value="SATELLITE" sx={{ textTransform: 'none', fontWeight: 600, py: 0.4 }}>
                  <SatelliteIcon sx={{ fontSize: 16, mr: 0.5 }} /> Satellite
                </ToggleButton>
                <ToggleButton value="STREET" sx={{ textTransform: 'none', fontWeight: 600, py: 0.4 }}>
                  <MapIcon sx={{ fontSize: 16, mr: 0.5 }} /> Street
                </ToggleButton>
              </ToggleButtonGroup>

              <Paper variant="outlined" sx={{ display: 'flex', gap: 1.5, px: 1.5, py: 0.3, borderRadius: 2 }}>
                <FormControlLabel
                  control={<Checkbox size="small" checked={showShelters} onChange={(e) => setShowShelters(e.target.checked)} sx={{ color: '#16a34a', '&.Mui-checked': { color: '#16a34a' } }} />}
                  label={<Typography variant="caption" sx={{ fontWeight: 600 }}>Shelters</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox size="small" checked={showHazards} onChange={(e) => setShowHazards(e.target.checked)} sx={{ color: '#dc2626', '&.Mui-checked': { color: '#dc2626' } }} />}
                  label={<Typography variant="caption" sx={{ fontWeight: 600 }}>Hazards</Typography>}
                />
              </Paper>
            </>
          )}
        </Stack>
      </Box>

      {/* Map Surface */}
      <Card variant="outlined" sx={{ borderRadius: 2.5, overflow: 'hidden', height: 600, position: 'relative', bgcolor: '#000000' }}>
        {viewFormat === '3D_TWIN' ? (
          <CesiumDigitalTwinViewer
            latitude={citizenPos[0]}
            longitude={citizenPos[1]}
            areaName="Monitored Area 1 (Western Himalayas)"
            height="600px"
          />
        ) : (
          <>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

            {/* Floating Legend */}
            <Paper
              elevation={3}
              sx={{
                position: 'absolute',
                bottom: 16,
            left: 16,
            zIndex: 1000,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(6px)',
            p: 1.5,
            borderRadius: 2,
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#334155', display: 'block', mb: 0.8 }}>
            SATELLITE MAP LEGEND
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, bgcolor: '#0284c7', borderRadius: '50%' }} />
              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>Your Live Location</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, bgcolor: '#16a34a', borderRadius: '50%' }} />
              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>Open Relief Shelters</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, bgcolor: '#dc2626', borderRadius: 0.5 }} />
              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>Active Hazard Zones</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 3, bgcolor: '#16a34a', borderStyle: 'dashed' }} />
              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>Designated Safe Corridor</Typography>
            </Box>
          </Box>
        </Paper>
      </>
    )}
  </Card>
</Box>
  );
};

export default UserMap;
