import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { Vector3 } from 'three';

export default function Camera() {
  const { camera } = useThree();
  const targetPosition = useRef(new Vector3(0, 0, 5));
  const currentPosition = useRef(new Vector3(0, 0, 5));
  const scrollOffset = useRef(0);

  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          scrollOffset.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [camera]);

  useFrame((state, delta) => {
    const offset = scrollOffset.current;
    
    targetPosition.current.y = Math.sin(offset * Math.PI * 2) * 0.5;
    targetPosition.current.x = Math.cos(offset * Math.PI * 2) * 0.3;
    targetPosition.current.z = 5 + offset * 2;

    currentPosition.current.lerp(targetPosition.current, delta * 2);
    camera.position.copy(currentPosition.current);

    const mouseX = (state.pointer.x * 0.5) * 0.5;
    const mouseY = (state.pointer.y * 0.5) * 0.5;
    
    camera.lookAt(mouseX, mouseY, 0);
  });

  return null;
}

