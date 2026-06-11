import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
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
  const count = 1800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#38bdf8');
    const c2 = new THREE.Color('#a855f7');
    const c3 = new THREE.Color('#4f87ff');

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 15 + 2;
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
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors sizeAttenuation transparent opacity={0.6} depthWrite={false} />
    </points>
  );
}

/* ─── Neural Constellation Network ─── */
function NeuralConstellation() {
  const groupRef = useRef();
  const mouse = useMouseTracker();

  // Generate node positions in a sphere
  const nodeCount = 15;
  const nodes = useMemo(() => {
    const list = [];
    const colors = ['#38bdf8', '#a855f7', '#4f87ff'];
    for (let i = 0; i < nodeCount; i++) {
      const r = 2.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      list.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        color: colors[i % colors.length],
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4
      });
    }
    return list;
  }, []);

  // Pre-calculate node connection pairs (if distance < 2.6)
  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < 2.6) {
          conns.push({ from: nodes[i], to: nodes[j] });
        }
      }
    }
    return conns;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Group level rotation + mouse interaction
    groupRef.current.rotation.y = t * 0.05 + mouse.current.x * 0.35;
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1 + mouse.current.y * 0.25;

    // Sway individual children nodes slightly
    groupRef.current.children.forEach((child) => {
      if (child.userData && child.userData.isNode) {
        const { phase, speed, startX, startY, startZ } = child.userData;
        child.position.x = startX + Math.sin(t * speed + phase) * 0.15;
        child.position.y = startY + Math.cos(t * speed * 1.2 + phase) * 0.15;
        child.position.z = startZ + Math.sin(t * speed * 0.8 + phase) * 0.15;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Draw Nodes */}
      {nodes.map((n, idx) => (
        <mesh 
          key={idx} 
          position={[n.x, n.y, n.z]}
          userData={{ isNode: true, phase: n.phase, speed: n.speed, startX: n.x, startY: n.y, startZ: n.z }}
        >
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshBasicMaterial color={n.color} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Draw static connecting paths as segment lines */}
      {connections.map((c, idx) => {
        const pts = new Float32Array([
          c.from.x, c.from.y, c.from.z,
          c.to.x, c.to.y, c.to.z
        ]);
        return (
          <line key={idx}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[pts, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#4f87ff" transparent opacity={0.12} />
          </line>
        );
      })}
    </group>
  );
}

/* ─── Hero Central Shape: Interactive Morphed Torus Knot ─── */
function CentralShape() {
  const groupRef = useRef();
  const knotRef = useRef();
  const wireKnotRef = useRef();
  const mouse = useMouseTracker();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04 + mouse.current.x * 0.25;
      groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.08 + mouse.current.y * 0.18;
    }
    if (knotRef.current) {
      knotRef.current.rotation.z = t * 0.15;
    }
    if (wireKnotRef.current) {
      wireKnotRef.current.rotation.z = -t * 0.1;
      wireKnotRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Distorted Liquid-glass Torus Knot */}
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={knotRef} position={[0, 0, 0]}>
          <torusKnotGeometry args={[0.9, 0.28, 180, 24, 3, 5]} />
          <MeshDistortMaterial
            color="#4f87ff"
            distort={0.36}
            speed={2.2}
            roughness={0.08}
            metalness={0.92}
            envMapIntensity={2.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Wireframe outer Torus Knot wrapping it */}
      <mesh ref={wireKnotRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.35, 0.16, 120, 16, 2, 3]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Orbiting ring 1 */}
      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.5, 0.015, 8, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>

      {/* Orbiting ring 2 */}
      <mesh rotation={[Math.PI / 3, -Math.PI / 5, Math.PI / 8]}>
        <torusGeometry args={[3.0, 0.012, 8, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* ─── Floating Polyhedral Accents (Dodecahedron & Tetrahedron) ─── */
function FloatingAccent({ position, type = 'dodecahedron', color, scale = 1, speed = 1, floatDir = 1 }) {
  const ref = useRef();
  const mouse = useMouseTracker();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    
    ref.current.rotation.x = t * 0.2 * speed;
    ref.current.rotation.y = t * 0.25 * speed;

    // Parallax + slow float animation
    ref.current.position.x = position[0] + mouse.current.x * 0.35;
    ref.current.position.y = position[1] + mouse.current.y * 0.25 + Math.sin(t * speed * 0.3) * 0.4 * floatDir;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {type === 'dodecahedron' ? (
        <dodecahedronGeometry args={[0.34, 0]} />
      ) : (
        <tetrahedronGeometry args={[0.28, 0]} />
      )}
      <meshPhongMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.3} 
        shininess={250} 
        flatShading 
      />
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
      light1.current.position.x = Math.sin(t * 0.3) * 7;
      light1.current.position.z = Math.cos(t * 0.3) * 7;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.2) * 6;
      light2.current.position.z = Math.sin(t * 0.2) * 6;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[6, 9, 6]} intensity={1.4} color="#38bdf8" />
      <pointLight ref={light1} position={[6, 3, 6]} intensity={3} color="#4f87ff" distance={20} />
      <pointLight ref={light2} position={[-6, -3, -4]} intensity={2} color="#a855f7" distance={18} />
      <spotLight position={[0, 12, 0]} intensity={2.5} color="#ffffff" angle={0.4} penumbra={0.9} />
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
        camera={{ position: [0, 0, 7.5], fov: 52 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Lights />
        <ParticleField />
        <CentralShape />
        <NeuralConstellation />

        {/* Floating Accent Shapes (Dodecahedrons and Tetrahedrons) */}
        <FloatingAccent position={[-5, 2.2, -1]} type="dodecahedron" color="#38bdf8" speed={1.3} scale={0.9} floatDir={1} />
        <FloatingAccent position={[5.2, -1.8, -2]} type="tetrahedron" color="#a855f7" speed={2.0} scale={0.7} floatDir={-1} />
        <FloatingAccent position={[-3.8, -2.6, 0.5]} type="dodecahedron" color="#6366f1" speed={1.5} scale={0.6} floatDir={1} />
        <FloatingAccent position={[4.2, 2.8, -2.5]} type="tetrahedron" color="#e879f9" speed={2.2} scale={0.8} floatDir={-1} />
        <FloatingAccent position={[0.8, 3.8, -1.8]} type="dodecahedron" color="#38bdf8" speed={1.1} scale={0.5} floatDir={1} />
        <FloatingAccent position={[-5.8, -0.2, -1.2]} type="tetrahedron" color="#4f87ff" speed={2.6} scale={0.4} floatDir={-1} />

        <Stars radius={55} depth={45} count={900} factor={3.5} saturation={0} fade speed={0.6} />
      </Canvas>
    </div>
  );
}
