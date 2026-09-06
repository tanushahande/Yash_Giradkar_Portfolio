"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AnimatedPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.08) * 0.05;
    }
  });

  const geometry = useMemo(() => new THREE.PlaneGeometry(20, 20, 32, 32), []);

  return (
    <mesh ref={meshRef} geometry={geometry} rotation-x={-Math.PI / 4} position={[0, 0, -5]}>
      <meshBasicMaterial
        color="#1e3a5f"
        wireframe
        transparent
        opacity={0.03}
      />
    </mesh>
  );
}

export default function GradientMesh() {
  return (
    <div className="absolute inset-0 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AnimatedPlane />
      </Canvas>
    </div>
  );
}
