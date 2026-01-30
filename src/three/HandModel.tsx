import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function FloatingHand() {
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      timeRef.current += delta;
      meshRef.current.rotation.y = Math.sin(timeRef.current * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.cos(timeRef.current * 0.3) * 0.2;
      meshRef.current.position.y = Math.sin(timeRef.current * 0.8) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1.5, 0.3]} />
      <meshStandardMaterial
        color="#B8860B"
        emissive="#FFA000"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function HandModel() {
  return (
    <group>
      <FloatingHand />
      <ambientLight intensity={0.5} />
    </group>
  );
}

