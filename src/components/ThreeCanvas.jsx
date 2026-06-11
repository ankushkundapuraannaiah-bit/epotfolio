import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Component to handle interactive mesh tracking mouse
function InteractiveNetwork({ isDark }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const pointsRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Fetch normalized mouse coordinates (-1 to 1)
    const { x, y } = state.pointer;

    // Smoothly rotate the group towards mouse position
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.4, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.4, 0.05);

    // Slowly rotate meshes on their own axis
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.002;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= 0.003;
    }
  });

  const lineColor = isDark ? '#38bdf8' : '#0066ff';
  const pointColor = isDark ? '#00c6ff' : '#00c6ff';

  // Generate random points on a sphere for custom nodes
  const count = 60;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0; // Sphere radius
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Central node structure */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial 
          color={lineColor} 
          wireframe 
          transparent 
          opacity={isDark ? 0.15 : 0.1} 
        />
      </mesh>

      {/* Outer particle nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={pointColor}
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      {/* Floating 3D Geometries */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-3.5, 1.5, -1]}>
          <torusGeometry args={[0.6, 0.2, 12, 24]} />
          <meshPhongMaterial 
            color={isDark ? '#0066ff' : '#38bdf8'} 
            shininess={100}
            specular={new THREE.Color('#ffffff')}
            flatShading
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[3, -1.8, -0.5]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial 
            color={isDark ? '#00c6ff' : '#0066ff'} 
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[2.5, 2, -1.5]} rotation={[0.5, 0.5, 0]}>
          <coneGeometry args={[0.4, 0.8, 4]} />
          <meshPhongMaterial 
            color={isDark ? '#38bdf8' : '#00c6ff'} 
            shininess={80}
            flatShading
          />
        </mesh>
      </Float>
    </group>
  );
}

// Light configurations for the scene
function SceneLights({ isDark }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.6} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color={isDark ? '#00c6ff' : '#38bdf8'} />
      <spotLight position={[0, 10, 0]} intensity={0.8} />
    </>
  );
}

export default function ThreeCanvas({ theme }) {
  const isDark = theme === 'dark';

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      pointerEvents: 'none',
      opacity: isDark ? 0.85 : 0.7
    }}>
      <Canvas 
        camera={{ position: [0, 0, 5.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneLights isDark={isDark} />
        <InteractiveNetwork isDark={isDark} />
      </Canvas>
    </div>
  );
}
