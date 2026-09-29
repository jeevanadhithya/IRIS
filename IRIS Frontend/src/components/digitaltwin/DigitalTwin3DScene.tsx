import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Button, Typography, Chip, Paper, Slider, Stack } from '@mui/material';
import {
  Layers as LayerIcon,
  WaterDrop as WaterIcon,
  Apartment as BuildingIcon,
  House as ShelterIcon,
  Route as RoadIcon,
  Warning as HazardIcon,
  RestartAlt as ResetIcon
} from '@mui/icons-material';

interface DigitalTwin3DProps {
  simulationStep: number;
  areaName: string;
  pincode?: string;
  waterLevelMultiplier: number;
  onSelectBuilding?: (building: any) => void;
}

// 1. Procedural 3D Terrain with Valley, River Trench & Slopes
function DigitalTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  const terrainGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(80, 80, 64, 64);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // River trench along diagonal
      const riverDist = Math.abs(x - z * 0.4);
      let y = 0;

      if (riverDist < 5) {
        // Deep river channel
        y = -2.5 + Math.sin(x * 0.5) * 0.3;
      } else if (x < -10) {
        // High steep mountain ridge on the left
        y = Math.pow(Math.abs(x + 10) / 12, 1.6) * 5 + Math.sin(z * 0.3) * 1.5;
      } else if (z > 15) {
        // Highland plateau on the north
        y = 2.5 + Math.cos(x * 0.4) * 0.8;
      } else {
        // Gently sloping valley
        y = Math.sin(x * 0.2) * 0.5 + Math.cos(z * 0.2) * 0.5;
      }

      pos.setY(i, y);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh ref={meshRef} geometry={terrainGeometry} receiveShadow>
      <meshStandardMaterial
        color="#334155"
        roughness={0.85}
        metalness={0.15}
        wireframe={false}
      />
    </mesh>
  );
}

// 2. 3D Concrete Gravity Dam & Water Reservoir
function DamAndReservoir({ floodLevel }: { floodLevel: number }) {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (waterRef.current) {
      // Subtle animated water wave oscillation
      waterRef.current.position.y = -0.5 + floodLevel * 0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group position={[-8, 0, -18]}>
      {/* Massive Concrete Dam Wall Structure */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[16, 7, 4]} />
        <meshStandardMaterial color="#64748b" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Spillway Chutes & Gates */}
      {[-4, -1.3, 1.3, 4].map((x, i) => (
        <mesh key={i} position={[x, 5.5, 0.5]} castShadow>
          <boxGeometry args={[1.5, 2.5, 3.5]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
      ))}

      {/* Reservoir Water Body (Behind the Dam) */}
      <mesh
        ref={waterRef}
        position={[0, -0.2, -15]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[26, 26, 16, 16]} />
        <meshStandardMaterial
          color="#0284c7"
          transparent
          opacity={0.88}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Dam Control Tower Label */}
      <Html position={[0, 7.5, 0]} center distanceFactor={25}>
        <div
          style={{
            background: 'rgba(15,23,42,0.92)',
            color: '#38bdf8',
            padding: '3px 8px',
            borderRadius: 4,
            fontSize: '11px',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            border: '1px solid #0284c7',
            pointerEvents: 'none'
          }}
        >
          RESERVOIR DAM (STORAGE: 88%)
        </div>
      </Html>
    </group>
  );
}

// 3. Dynamic River Water Flow with Rising Flood Volume
function RiverWater({ floodLevel }: { floodLevel: number }) {
  const riverRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (riverRef.current) {
      riverRef.current.position.y = -1.6 + floodLevel * 0.75 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
    }
  });

  return (
    <mesh
      ref={riverRef}
      position={[0, -1.6, 0]}
      rotation={[-Math.PI / 2, 0, Math.PI / 8]}
    >
      <planeGeometry args={[14, 85]} />
      <meshStandardMaterial
        color={floodLevel > 2 ? '#b91c1c' : '#0284c7'}
        transparent
        opacity={0.82}
        roughness={0.2}
        metalness={0.6}
      />
    </mesh>
  );
}

// 4. Procedural 3D Architectural Buildings with Rooftops, Windows & Waterline
interface BuildingData {
  id: string;
  name: string;
  type: 'HOSPITAL_EOC' | 'SHELTER' | 'RESIDENTIAL' | 'COMMERCIAL';
  pos: [number, number, number];
  size: [number, number, number];
  elevation: number;
}

function BuildingGroup({
  floodLevel,
  onSelect
}: {
  floodLevel: number;
  onSelect?: (b: BuildingData) => void;
}) {
  const buildings: BuildingData[] = useMemo(
    () => [
      // High elevation safe zone (Ridge)
      { id: 'BLD-01', name: 'District Emergency Operations Center', type: 'HOSPITAL_EOC', pos: [14, 1.5, -4], size: [5, 6, 5], elevation: 185 },
      { id: 'BLD-02', name: 'Regional Relief Shelter Alpha', type: 'SHELTER', pos: [12, 1.2, 8], size: [6, 4.5, 7], elevation: 182 },
      { id: 'BLD-03', name: 'Government Polytechnic Shelter', type: 'SHELTER', pos: [15, 1.0, 18], size: [5, 4, 6], elevation: 178 },

      // Mid elevation urban area
      { id: 'BLD-04', name: 'Commercial Hub & Market', type: 'COMMERCIAL', pos: [5, 0.5, -10], size: [4, 5, 4], elevation: 120 },
      { id: 'BLD-05', name: 'Residential Sector A', type: 'RESIDENTIAL', pos: [6, 0.4, 2], size: [3.5, 4, 4], elevation: 115 },
      { id: 'BLD-06', name: 'Primary Healthcare Clinic', type: 'HOSPITAL_EOC', pos: [7, 0.3, 12], size: [4, 3.5, 4], elevation: 110 },

      // Low-lying riverbank danger zone (Inundated when flood rises)
      { id: 'BLD-07', name: 'Riverfront Residential Row', type: 'RESIDENTIAL', pos: [-3, -0.8, -4], size: [3.5, 3, 4], elevation: 75 },
      { id: 'BLD-08', name: 'Valley Logistics Depot', type: 'COMMERCIAL', pos: [-2, -0.9, 6], size: [4.5, 2.5, 5], elevation: 72 },
      { id: 'BLD-09', name: 'Lowland Habitation Cluster', type: 'RESIDENTIAL', pos: [-3.5, -0.9, 16], size: [4, 2.8, 4], elevation: 70 }
    ],
    []
  );

  return (
    <group>
      {buildings.map((b) => {
        const isSubmerged = b.pos[1] < -1.6 + floodLevel * 0.75;
        const color =
          b.type === 'HOSPITAL_EOC'
            ? '#38bdf8'
            : b.type === 'SHELTER'
            ? '#22c55e'
            : isSubmerged
            ? '#ef4444'
            : '#94a3b8';

        return (
          <group
            key={b.id}
            position={[b.pos[0], b.pos[1] + b.size[1] / 2, b.pos[2]]}
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(b);
            }}
          >
            {/* Main Building Volume */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={b.size} />
              <meshStandardMaterial
                color={color}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>

            {/* Rooftop Trim & Helipad / Solar Panel */}
            <mesh position={[0, b.size[1] / 2 + 0.1, 0]}>
              <boxGeometry args={[b.size[0] * 0.9, 0.2, b.size[2] * 0.9]} />
              <meshStandardMaterial color={b.type === 'HOSPITAL_EOC' ? '#e0f2fe' : '#475569'} />
            </mesh>

            {/* Building Identification Label */}
            <Html position={[0, b.size[1] / 2 + 1.2, 0]} center distanceFactor={22}>
              <div
                style={{
                  background: isSubmerged ? 'rgba(220,38,38,0.92)' : 'rgba(15,23,42,0.85)',
                  color: '#ffffff',
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontSize: '10px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  border: `1px solid ${isSubmerged ? '#f87171' : '#64748b'}`,
                  cursor: 'pointer',
                  transform: 'scale(0.9)'
                }}
              >
                {b.name} {isSubmerged ? '⚠️ FLOODED' : ''}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// 5. 3D Valley Drives & Arterial Corridors (Roads & Bridges)
function RoadDrives({ floodLevel }: { floodLevel: number }) {
  const isAlphaSevered = floodLevel >= 1.5;

  return (
    <group>
      {/* Corridor Alpha: Low-lying Valley River Road (Subject to flood & debris) */}
      <mesh position={[-3, -0.6, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 8]}>
        <planeGeometry args={[2.5, 75]} />
        <meshStandardMaterial
          color={isAlphaSevered ? '#dc2626' : '#f59e0b'}
          roughness={0.9}
        />
      </mesh>

      {/* Corridor Beta: Elevated Ridge Bypass Expressway (High safe elevation) */}
      <mesh position={[13, 1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 75]} />
        <meshStandardMaterial color="#10b981" roughness={0.7} />
      </mesh>

      {/* River Bridge across the gorge */}
      <group position={[0, -0.2, 4]} rotation={[0, -Math.PI / 3, 0]}>
        {/* Bridge Deck */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[18, 0.6, 3]} />
          <meshStandardMaterial color="#64748b" roughness={0.5} />
        </mesh>
        {/* Bridge Pillars */}
        {[-6, 0, 6].map((px, i) => (
          <mesh key={i} position={[px, -1.5, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 3, 8]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
        ))}
      </group>

      {/* Severed Barricade Marker if flooded */}
      {isAlphaSevered && (
        <group position={[-2.8, 0.5, 2]}>
          <Html center distanceFactor={18}>
            <div
              style={{
                background: '#dc2626',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: 4,
                fontSize: '11px',
                fontWeight: 900,
                border: '2px solid #ffffff',
                boxShadow: '0 4px 12px rgba(220,38,38,0.6)',
                whiteSpace: 'nowrap'
              }}
            >
              ✕ HIGHWAY SEVERED (WATER SURGE)
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

// 6. 3D Landslide Slip Wedge on Steep Mountain Slopes
function LandslideSlopeMesh({ floodLevel }: { floodLevel: number }) {
  const isSlipped = floodLevel >= 1.0;

  return (
    <group position={[-16, 3.5, 2]} rotation={[0, 0, 0.35]}>
      {/* Landslide mass wedge */}
      <mesh castShadow>
        <coneGeometry args={[5, 7, 6]} />
        <meshStandardMaterial
          color={isSlipped ? '#b91c1c' : '#78350f'}
          roughness={0.9}
        />
      </mesh>

      {/* Debris Flow Tongue spilling toward the river */}
      {isSlipped && (
        <mesh position={[4, -3.5, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[6, 2, 4]} />
          <meshStandardMaterial color="#991b1b" roughness={0.95} />
        </mesh>
      )}

      <Html position={[0, 4.5, 0]} center distanceFactor={22}>
        <div
          style={{
            background: isSlipped ? '#dc2626' : 'rgba(15,23,42,0.85)',
            color: '#ffffff',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: '10px',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            border: '1px solid #f87171'
          }}
        >
          {isSlipped ? '⚠️ LANDSLIDE DEBRIS SLIP ACTIVE' : 'STEEP SLOPE K-12 (WATCH)'}
        </div>
      </Html>
    </group>
  );
}

// 7. Smart Sensor Node 3D Beacons
function SensorBeacons() {
  const sensorPositions: [number, number, number][] = [
    [-8, 4.5, -18], // Dam Crest Sensor
    [-3, -0.4, -2], // River Ultrasonic Gauge
    [-15, 6, 2],    // Slope Piezometer
    [13, 2, 6]      // Ridge Meteorological Station
  ];

  return (
    <group>
      {sensorPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Beacon Base */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          {/* Glowing Beacon Sphere */}
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.2} />
          </mesh>
          {/* Vertical Laser Telemetry Line */}
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 5, 8]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ==========================================
// MAIN 3D SCENE WRAPPER
// ==========================================
export const DigitalTwin3DScene: React.FC<DigitalTwin3DProps> = ({
  simulationStep,
  areaName,
  pincode,
  waterLevelMultiplier,
  onSelectBuilding
}) => {
  const [cameraView, setCameraView] = useState<'ISOMETRIC' | 'TOP_DOWN' | 'RIVER_LEVEL'>('ISOMETRIC');
  const [floodOverride, setFloodOverride] = useState<number>(waterLevelMultiplier);
  const controlsRef = useRef<any>(null);

  const effectiveFlood = floodOverride;

  const handleResetCamera = (view: 'ISOMETRIC' | 'TOP_DOWN' | 'RIVER_LEVEL') => {
    setCameraView(view);
    if (!controlsRef.current) return;
    if (view === 'TOP_DOWN') {
      controlsRef.current.object.position.set(0, 55, 0.1);
    } else if (view === 'RIVER_LEVEL') {
      controlsRef.current.object.position.set(0, 4, 30);
    } else {
      controlsRef.current.object.position.set(30, 28, 38);
    }
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  };

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', bgcolor: '#0f172a' }}>
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [30, 28, 38], fov: 42 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Dynamic Lighting Setup */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[25, 45, 20]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-8, 10, -18]} intensity={0.8} color="#38bdf8" />

        {/* 3D Physical Elements */}
        <DigitalTerrain />
        <DamAndReservoir floodLevel={effectiveFlood} />
        <RiverWater floodLevel={effectiveFlood} />
        <RoadDrives floodLevel={effectiveFlood} />
        <LandslideSlopeMesh floodLevel={effectiveFlood} />
        <BuildingGroup floodLevel={effectiveFlood} onSelect={onSelectBuilding} />
        <SensorBeacons />

        {/* Camera Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={10}
          maxDistance={90}
        />
      </Canvas>

      {/* Floating 3D HUD Information Banner */}
      <Paper
        elevation={4}
        sx={{
          position: 'absolute',
          top: 14,
          left: 14,
          bgcolor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(8px)',
          color: '#ffffff',
          p: 1.5,
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.15)',
          maxWidth: 320
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Chip label="TRUE 3D DIGITAL TWIN" size="small" color="primary" sx={{ fontWeight: 800, fontSize: '0.7rem' }} />
          <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 700 }}>
            {pincode ? `PIN: ${pincode}` : ''}
          </Typography>
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#f8fafc' }}>
          {areaName}
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mt: 0.5 }}>
          Physical 3D mesh with concrete gravity dam, volumetric reservoir, dynamic river drives, architectural buildings, and slope slip kinematics.
        </Typography>
      </Paper>

      {/* 3D Camera & Water Level Control Bar */}
      <Paper
        elevation={4}
        sx={{
          position: 'absolute',
          bottom: 14,
          left: 14,
          right: 14,
          bgcolor: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(8px)',
          color: '#ffffff',
          p: 1.5,
          borderRadius: 2.5,
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        {/* Camera Perspective Jumps */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>
            CAMERA:
          </Typography>
          <Button
            size="small"
            variant={cameraView === 'ISOMETRIC' ? 'contained' : 'outlined'}
            onClick={() => handleResetCamera('ISOMETRIC')}
            sx={{ textTransform: 'none', fontSize: '0.75rem', py: 0.3 }}
          >
            Isometric
          </Button>
          <Button
            size="small"
            variant={cameraView === 'TOP_DOWN' ? 'contained' : 'outlined'}
            onClick={() => handleResetCamera('TOP_DOWN')}
            sx={{ textTransform: 'none', fontSize: '0.75rem', py: 0.3 }}
          >
            Top-Down Plan
          </Button>
          <Button
            size="small"
            variant={cameraView === 'RIVER_LEVEL' ? 'contained' : 'outlined'}
            onClick={() => handleResetCamera('RIVER_LEVEL')}
            sx={{ textTransform: 'none', fontSize: '0.75rem', py: 0.3 }}
          >
            River Level
          </Button>
        </Box>

        {/* 3D Hydrologic Submersion Water Level Slider */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: { xs: '100%', sm: 260 } }}>
          <WaterIcon color="primary" fontSize="small" />
          <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Surge: +{(effectiveFlood * 1.2).toFixed(1)}m
          </Typography>
          <Slider
            size="small"
            value={effectiveFlood}
            min={0}
            max={3.5}
            step={0.1}
            onChange={(_, val) => setFloodOverride(val as number)}
            sx={{ color: '#38bdf8' }}
          />
        </Box>

        {/* Reset Camera button */}
        <Button
          size="small"
          startIcon={<ResetIcon />}
          onClick={() => handleResetCamera('ISOMETRIC')}
          sx={{ textTransform: 'none', color: '#cbd5e1', borderColor: 'rgba(255,255,255,0.2)' }}
        >
          Reset View
        </Button>
      </Paper>
    </Box>
  );
};

export default DigitalTwin3DScene;
