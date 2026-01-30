import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointLight, SpotLight } from 'three';

export default function Lights() {
  const pointLightRef = useRef<PointLight>(null);
  const spotLightRef = useRef<SpotLight>(null);

  useFrame((state) => {
    if (pointLightRef.current) {
      pointLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      pointLightRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 3;
      pointLightRef.current.position.z = 2 + Math.sin(state.clock.elapsedTime * 0.2) * 1;
    }
    if (spotLightRef.current) {
      spotLightRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} color="#FFA000" />
      
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#FFD689"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <pointLight
        ref={pointLightRef}
        position={[0, 0, 3]}
        intensity={1.2}
        color="#B8860B"
        distance={10}
        decay={2}
      />

      <spotLight
        ref={spotLightRef}
        position={[-5, 5, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.6}
        color="#FFA000"
        castShadow
      />

      <pointLight
        position={[0, -3, 2]}
        intensity={0.5}
        color="#800020"
        distance={8}
      />
    </>
  );
}

