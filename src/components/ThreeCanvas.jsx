import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Torus, Sphere, MeshDistortMaterial, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Particle Galaxy Field ─── */
function ParticleGalaxy({ isDark }) {
  const points = useRef();
  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color(isDark ? '#38bdf8' : '#0066ff');
    const color2 = new THREE.Color(isDark ? '#0066ff' : '#38bdf8');
    const white  = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Spiral galaxy distribution
      const arm = Math.floor(Math.random() * 3);
      const angle = arm * (2 * Math.PI / 3) + Math.random() * 1.5;
      const radius = Math.random() * 8 + 0.5;
      const spread = (Math.random() - 0.5) * 1.2;
      pos[i * 3]     = Math.cos(angle) * radius + spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius + spread;

      const t = Math.random();
      const c = t < 0.5 ? color1.clone().lerp(color2, t * 2) : color2.clone().lerp(white, (t - 0.5) * 2);
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [isDark]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.04;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Central DNA-like Double Helix Orb ─── */
function CentralOrb({ isDark }) {
  const meshRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const ringRef3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3 + x * 0.5;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3 + y * 0.3;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.5;
      ringRef1.current.rotation.y = t * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = t * 0.4;
      ringRef2.current.rotation.z = t * 0.2;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.x = -t * 0.3;
      ringRef3.current.rotation.z = t * 0.5;
    }
  });

  const primary = isDark ? '#38bdf8' : '#0066ff';
  const secondary = isDark ? '#0066ff' : '#00c6ff';

  return (
    <group>
      {/* Central distorted sphere */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.3, 4]} />
          <MeshDistortMaterial
            color={primary}
            distort={0.35}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={1}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Orbiting Rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.2, 0.04, 8, 80]} />
        <meshBasicMaterial color={primary} transparent opacity={0.6} />
      </mesh>

      <mesh ref={ringRef2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.03, 8, 80]} />
        <meshBasicMaterial color={secondary} transparent opacity={0.4} />
      </mesh>

      <mesh ref={ringRef3} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.4, 0.025, 8, 80]} />
        <meshBasicMaterial color={isDark ? '#a855f7' : '#7c3aed'} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* ─── Mouse-tracking Pointer Sphere ─── */
function PointerSphere({ isDark }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.pointer;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 4, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 3, 0.08);
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 1]}>
      <octahedronGeometry args={[0.25, 0]} />
      <meshPhongMaterial
        color={isDark ? '#00c6ff' : '#38bdf8'}
        emissive={isDark ? '#00c6ff' : '#0066ff'}
        emissiveIntensity={0.6}
        shininess={200}
        flatShading
      />
    </mesh>
  );
}

/* ─── Floating Tech Shards ─── */
function FloatingShard({ position, color, speed = 2, scale = 1 }) {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={1.5}>
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          shininess={150}
          flatShading
        />
      </mesh>
    </Float>
  );
}

/* ─── Scene Lights ─── */
function Lights({ isDark }) {
  const lightRef = useRef();
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.2 : 0.5} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 1 : 1.5} color={isDark ? '#38bdf8' : '#0066ff'} />
      <pointLight ref={lightRef} position={[5, 3, 5]} intensity={2} color={isDark ? '#0066ff' : '#38bdf8'} distance={15} />
      <pointLight position={[-5, -3, -5]} intensity={1} color={isDark ? '#a855f7' : '#7c3aed'} distance={12} />
      <spotLight position={[0, 8, 0]} intensity={isDark ? 1.5 : 2} color={'#ffffff'} angle={0.4} penumbra={0.8} />
    </>
  );
}

/* ─── Main Canvas Export ─── */
export default function ThreeCanvas({ theme }) {
  const isDark = theme === 'dark';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Lights isDark={isDark} />
        <ParticleGalaxy isDark={isDark} />
        <CentralOrb isDark={isDark} />
        <PointerSphere isDark={isDark} />

        {/* Floating accent shards */}
        <FloatingShard position={[-5, 2.5, -2]} color={isDark ? '#38bdf8' : '#0066ff'} speed={1.5} />
        <FloatingShard position={[5, -2, -1]}  color={isDark ? '#0066ff' : '#38bdf8'} speed={2.5} scale={0.7} />
        <FloatingShard position={[-4, -2.5, 1]} color={isDark ? '#a855f7' : '#7c3aed'} speed={2} scale={0.5} />
        <FloatingShard position={[4.5, 3, -3]} color={isDark ? '#00c6ff' : '#0066ff'} speed={3} scale={0.6} />
        <FloatingShard position={[0, 4, -2]}   color={isDark ? '#38bdf8' : '#00c6ff'} speed={1.8} scale={0.4} />
      </Canvas>
    </div>
  );
}
