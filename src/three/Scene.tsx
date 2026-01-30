import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import Camera from './Camera';
import Lights from './Lights';
import Effects from './Effects';
import Particles from './Particles';
import HandModel from './HandModel';

interface SceneProps {
  children?: React.ReactNode;
  enableEffects?: boolean;
  enableParticles?: boolean;
  enableHand?: boolean;
}

export default function Scene({ 
  children, 
  enableEffects = true, 
  enableParticles = true,
  enableHand = false 
}: SceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? 'default' : 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={isMobile ? [0.5, 1] : [1, 2]}
      performance={{ min: isMobile ? 0.3 : 0.5 }}
      className="absolute inset-0"
    >
      <Suspense fallback={null}>
        <Camera />
        <Lights />
        {enableEffects && !isMobile && <Effects />}
        {enableParticles && <Particles />}
        {enableHand && <HandModel />}
        {children}
      </Suspense>
    </Canvas>
  );
}

