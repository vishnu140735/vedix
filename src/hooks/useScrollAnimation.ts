import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 100,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
        },
      });
      
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

