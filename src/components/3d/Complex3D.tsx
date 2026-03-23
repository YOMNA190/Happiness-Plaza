import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera, Environment, ContactShadows, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { Zone } from '@/types';
import { zones } from '@/data/mockData';

// Animated Building Block Component
interface BuildingBlockProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  onClick: () => void;
  isHovered: boolean;
  isSelected: boolean;
  delay: number;
}

function BuildingBlock({ position, size, color, onClick, isHovered, isSelected, delay }: BuildingBlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0);
  
  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = Date.now();
      const duration = 800;
      
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        setScale(eased);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
      
      // Hover effect
      if (isHovered || isSelected) {
        meshRef.current.rotation.y += 0.005;
      }
    }
  });

  const emissiveIntensity = isSelected ? 0.4 : isHovered ? 0.2 : 0;

  return (
    <Float
      speed={isHovered ? 2 : 1}
      rotationIntensity={isHovered ? 0.2 : 0.05}
      floatIntensity={isHovered ? 0.5 : 0.2}
    >
      <mesh
        ref={meshRef}
        position={position}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
        scale={[scale, scale, scale]}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.2}
          metalness={0.6}
          transparent
          opacity={0.95}
        />
        {/* Building edges with glow */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
          <lineBasicMaterial color="#C5A028" linewidth={3} />
        </lineSegments>
        
        {/* Inner glow */}
        {(isHovered || isSelected) && (
          <mesh scale={[1.02, 1.02, 1.02]}>
            <boxGeometry args={size} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
        )}
      </mesh>
    </Float>
  );
}

// Interactive Marker Component with enhanced visuals
interface MarkerProps {
  position: [number, number, number];
  zone: Zone;
  onClick: () => void;
  isSelected: boolean;
  delay: number;
}

function Marker({ position, zone, onClick, isSelected, delay }: MarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay + 500);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((state) => {
    if (groupRef.current && visible) {
      // Pulsing animation
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
      const targetScale = isSelected ? 1.4 : hovered ? 1.2 : pulseScale;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
      
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      
      // Rotation
      groupRef.current.rotation.y += 0.01;
    }
  });

  if (!visible) return null;

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Marker base */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
        <meshStandardMaterial 
          color={zone.color} 
          emissive={zone.color} 
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* Marker pin */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial 
          color={zone.color} 
          emissive={zone.color} 
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Outer glow ring */}
      <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.25, 0.35, 32]} />
        <meshBasicMaterial 
          color={zone.color} 
          transparent 
          opacity={0.4 + (hovered || isSelected ? 0.3 : 0)} 
        />
      </mesh>
      
      {/* Particle ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.02, 8, 32]} />
        <meshBasicMaterial 
          color={zone.color} 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Label */}
      {(isSelected || hovered) && (
        <Html distanceFactor={8} center>
          <div className="bg-dark/95 text-white px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap border-2 border-gold/50 shadow-luxury-lg backdrop-blur-md animate-pulse">
            {zone.name}
            <span className="block text-xs text-gold mt-1">
              {zone.availableUnits} units available
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

// Enhanced Ground/Platform Component
function Ground() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle wave effect
      const positions = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        const wave = Math.sin(x * 0.5 + state.clock.elapsedTime * 0.5) * 
                     Math.cos(z * 0.5 + state.clock.elapsedTime * 0.3) * 0.02;
        positions.setY(i, wave);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Main platform */}
      <mesh position={[0, -0.5, 0]} receiveShadow ref={meshRef}>
        <planeGeometry args={[18, 14, 32, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.7} 
          metalness={0.3}
          emissive="#C5A028"
          emissiveIntensity={0.02}
        />
      </mesh>
      
      {/* Decorative border */}
      <mesh position={[0, -0.48, 0]}>
        <boxGeometry args={[18.2, 0.05, 14.2]} />
        <meshStandardMaterial 
          color="#C5A028" 
          roughness={0.2} 
          metalness={0.9}
          emissive="#C5A028"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Grid pattern */}
      <gridHelper 
        args={[18, 18, '#C5A028', '#2a2a2a']} 
        position={[0, -0.49, 0]} 
      />
      
      {/* Corner accents */}
      {[[-8, -6], [8, -6], [-8, 6], [8, 6]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.45, z]}>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
          <meshStandardMaterial 
            color="#C5A028" 
            emissive="#C5A028"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Complex Buildings Component
function ComplexBuildings({ onZoneClick, selectedZone }: { onZoneClick: (zone: Zone) => void; selectedZone: Zone | null }) {
  const [hoveredZone] = useState<string | null>(null);

  const buildings = useMemo(() => [
    { id: 'retail', position: [-3, 1.5, -2] as [number, number, number], size: [4, 3, 3] as [number, number, number], color: '#C5A028' },
    { id: 'foodcourt', position: [2, 0.75, -1] as [number, number, number], size: [2.5, 1.5, 2] as [number, number, number], color: '#E85D4E' },
    { id: 'hotel', position: [4, 3, 2] as [number, number, number], size: [3, 6, 3] as [number, number, number], color: '#4A90D9' },
    { id: 'medical', position: [-2, 1.5, 3] as [number, number, number], size: [3, 2, 2.5] as [number, number, number], color: '#50C878' },
    { id: 'entertainment', position: [0, 1, 4] as [number, number, number], size: [4, 2, 2] as [number, number, number], color: '#9B59B6' },
    { id: 'office', position: [3, 2, -3] as [number, number, number], size: [2.5, 4, 2.5] as [number, number, number], color: '#34495E' },
  ], []);

  return (
    <group>
      {buildings.map((building: { id: string; position: [number, number, number]; size: [number, number, number]; color: string }, index: number) => {
        const zone = zones.find(z => z.id === building.id);
        if (!zone) return null;
        
        return (
          <group key={building.id}>
            <BuildingBlock
              position={building.position}
              size={building.size}
              color={building.color}
              onClick={() => onZoneClick(zone)}
              isHovered={hoveredZone === building.id}
              isSelected={selectedZone?.id === building.id}
              delay={index * 200}
            />
            <Marker
              position={[building.position[0], building.position[1] + building.size[1] / 2 + 0.5, building.position[2]]}
              zone={zone}
              onClick={() => onZoneClick(zone)}
              isSelected={selectedZone?.id === zone.id}
              delay={index * 200}
            />
          </group>
        );
      })}
    </group>
  );
}

// Scene Component
function Scene({ onZoneClick, selectedZone }: { onZoneClick: (zone: Zone) => void; selectedZone: Zone | null }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[12, 10, 14]} fov={50} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={6}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2 - 0.1}
        target={[0, 1, 0]}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 5]} intensity={1.2} castShadow color="#fff5e6" />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#C5A028" />
      <pointLight position={[0, 8, 0]} intensity={0.8} color="#C5A028" distance={20} />
      <pointLight position={[-10, 5, 10]} intensity={0.4} color="#4A90D9" />
      
      {/* Stars background */}
      <Stars 
        radius={50} 
        depth={50} 
        count={500} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={0.5}
      />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Scene Objects */}
      <Ground />
      <ComplexBuildings onZoneClick={onZoneClick} selectedZone={selectedZone} />
      
      {/* Enhanced Shadows */}
      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.6}
        scale={25}
        blur={3}
        far={15}
      />
    </>
  );
}

// Main 3D Component
interface Complex3DProps {
  onZoneClick: (zone: Zone) => void;
  selectedZone: Zone | null;
}

export default function Complex3D({ onZoneClick, selectedZone }: Complex3DProps) {
  return (
    <div className="w-full h-full min-h-[600px] lg:min-h-[700px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)' }}
      >
        <Scene onZoneClick={onZoneClick} selectedZone={selectedZone} />
      </Canvas>
    </div>
  );
}