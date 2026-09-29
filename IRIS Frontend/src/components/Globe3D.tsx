import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

const disasterPoints = [
  { lat: 35.6762, lng: 139.6503, type: 'earthquake', intensity: 0.9 },
  { lat: 28.6139, lng: 77.2090, type: 'flood', intensity: 0.7 },
  { lat: 25.7617, lng: -80.1918, type: 'hurricane', intensity: 0.85 },
  { lat: -23.5505, lng: -46.6333, type: 'wildfire', intensity: 0.6 },
  { lat: 51.5074, lng: -0.1278, type: 'flood', intensity: 0.5 },
  { lat: 34.0522, lng: -118.2437, type: 'earthquake', intensity: 0.75 },
  { lat: 1.3521, lng: 103.8198, type: 'flood', intensity: 0.4 },
  { lat: -33.8688, lng: 151.2093, type: 'wildfire', intensity: 0.8 },
];

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function DisasterMarkers() {
  const groupRef = useRef<THREE.Group>(null);

  const markers = useMemo(() => {
    return disasterPoints.map((point, i) => {
      const position = latLngToVector3(point.lat, point.lng, 2.05);
      const color = point.type === 'earthquake' ? '#ef4444' : 
                    point.type === 'flood' ? '#3b82f6' : 
                    point.type === 'hurricane' ? '#8b5cf6' : '#f97316';
      return { position, color, intensity: point.intensity, key: i };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
        mesh.scale.setScalar(scale * markers[i].intensity);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {markers.map((marker) => (
        <mesh key={marker.key} position={marker.position}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={marker.color} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Main Globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#0a1628"
          emissive="#0ea5e9"
          emissiveIntensity={0.1}
          wireframe
          transparent
          opacity={0.6}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere ref={atmosphereRef} args={[2.1, 64, 64]}>
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>

      <DisasterMarkers />
    </group>
  );
}

function Particles() {
  const count = 500;
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 3 + Math.random() * 2;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      colors[i * 3] = 0.1 + Math.random() * 0.5;
      colors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function Globe3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f97316" />
        
        <Globe />
        <Particles />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
