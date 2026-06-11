import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Smooth Mouse Tracker ─── */
function useMouseTracker() {
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame(() => {
    mouse.current.x += (target.current.x - mouse.current.x) * 0.05;
    mouse.current.y += (target.current.y - mouse.current.y) * 0.05;
  });

  return mouse;
}

/* ─── Ambient Particle Field ─── */
function ParticleField() {
  const points = useRef();
  const count = 2000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#38bdf8');
    const c2 = new THREE.Color('#a855f7');
    const c3 = new THREE.Color('#4f87ff');

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 14 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const c = t < 0.5
        ? c1.clone().lerp(c2, t * 2)
        : c2.clone().lerp(c3, (t - 0.5) * 2);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.025;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors sizeAttenuation transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

/* ─── Hero Central Shape ─── */
function CentralShape() {
  const meshRef = useRef();
  const innerRef = useRef();
  const mouse = useMouseTracker();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.12 + mouse.current.x * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.15 + mouse.current.y * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2;
      innerRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group>
      {/* Outer wireframe icosahedron */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Central distorted blob */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={innerRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.1, 4]} />
          <MeshDistortMaterial
            color="#4f87ff"
            distort={0.45}
            speed={2.5}
            roughness={0}
            metalness={0.9}
            envMapIntensity={2}
          />
        </mesh>
      </Float>

      {/* Orbiting ring 1 */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.6, 0.025, 8, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
      </mesh>

      {/* Orbiting ring 2 */}
      <mesh rotation={[0, Math.PI / 5, Math.PI / 4]}>
        <torusGeometry args={[3.2, 0.018, 8, 120]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
      </mesh>

      {/* Orbiting ring 3 */}
      <mesh rotation={[Math.PI / 2, Math.PI / 6, 0]}>
        <torusGeometry args={[3.8, 0.012, 8, 120]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* ─── Floating Accent Gems ─── */
function AccentGem({ position, color, scale = 1, speed = 2, floatDir = 1 }) {
  const ref = useRef();
  const mouse = useMouseTracker();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += 0.01 * speed;
    ref.current.rotation.y += 0.008 * speed;
    // Subtle mouse parallax
    ref.current.position.x = position[0] + mouse.current.x * 0.3;
    ref.current.position.y = position[1] + mouse.current.y * 0.2 + Math.sin(t * speed * 0.4) * 0.3 * floatDir;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[0.35, 0]} />
      <meshPhongMaterial color={color} emissive={color} emissiveIntensity={0.4} shininess={200} flatShading />
    </mesh>
  );
}

/* ─── Floating Cube Accent ─── */
function FloatingCube({ position, color, scale = 1, speed = 1 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.3 * speed;
    ref.current.rotation.y = t * 0.4 * speed;
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.5) * 0.4;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

/* ─── Ambient Scene Lights ─── */
function Lights() {
  const light1 = useRef();
  const light2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.4) * 6;
      light1.current.position.z = Math.cos(t * 0.4) * 6;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.3) * 5;
      light2.current.position.z = Math.sin(t * 0.3) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#38bdf8" />
      <pointLight ref={light1} position={[5, 2, 5]} intensity={2.5} color="#4f87ff" distance={18} />
      <pointLight ref={light2} position={[-5, -2, -3]} intensity={1.5} color="#a855f7" distance={15} />
      <spotLight position={[0, 10, 0]} intensity={2} color="#ffffff" angle={0.35} penumbra={0.9} />
    </>
  );
}

/* ─── Main Canvas ─── */
export default function ThreeCanvas() {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%', height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Lights />
        <ParticleField />
        <CentralShape />

        {/* Accent Gems */}
        <AccentGem position={[-5, 2.5, -1]}  color="#38bdf8" speed={1.5} scale={0.9} floatDir={1} />
        <AccentGem position={[5.5, -1.5, -2]} color="#a855f7" speed={2.2} scale={0.7} floatDir={-1} />
        <AccentGem position={[-4, -2.8, 0.5]} color="#6366f1" speed={1.8} scale={0.5} floatDir={1} />
        <AccentGem position={[4, 3.2, -3]}    color="#e879f9" speed={2.5} scale={0.6} floatDir={-1} />
        <AccentGem position={[0.5, 4, -2]}    color="#38bdf8" speed={1.2} scale={0.4} floatDir={1} />
        <AccentGem position={[-6, 0, -1.5]}   color="#4f87ff" speed={3}   scale={0.35} floatDir={-1} />

        {/* Floating Cubes */}
        <FloatingCube position={[6, 2, -2]}  color="#38bdf8" scale={0.5} speed={0.8} />
        <FloatingCube position={[-6, -1, -3]} color="#a855f7" scale={0.4} speed={1.2} />

        <Stars radius={60} depth={40} count={800} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
