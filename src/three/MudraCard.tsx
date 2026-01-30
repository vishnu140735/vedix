import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface MudraCardProps {
  position: [number, number, number];
  name: string;
  sanskrit: string;
}

export default function MudraCard({ position, name, sanskrit }: MudraCardProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetRotation = useRef(new Vector3(0, 0, 0));

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      
      if (hovered) {
        targetRotation.current.x = 0.1;
        targetRotation.current.y += delta * 0.5;
      } else {
        targetRotation.current.x = 0;
      }
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x,
        delta * 5
      );
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial
          color={hovered ? '#FFA000' : '#B8860B'}
          emissive={hovered ? '#FFA000' : '#800020'}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <Text
        position={[0, 0.8, 0.15]}
        fontSize={0.2}
        color="#FFD689"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      
      <Text
        position={[0, 0.3, 0.15]}
        fontSize={0.15}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {sanskrit}
      </Text>
    </group>
  );
}

