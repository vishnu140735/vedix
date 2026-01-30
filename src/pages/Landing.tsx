import { useRef, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Lazy load heavy 3D components
const Scene = lazy(() => import('../three/Scene'));
const Particles = lazy(() => import('../three/Particles'));

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Simplified animations for performance
  useEffect(() => {
    if (!heroRef.current) return;
    // Minimal animation - just fade in
    if (titleRef.current) {
      gsap.to(titleRef.current, { opacity: 1, duration: 0.6 });
    }
    if (subtitleRef.current) {
      gsap.to(subtitleRef.current, { opacity: 1, duration: 0.6, delay: 0.2 });
    }
    if (ctaRef.current) {
      gsap.to(ctaRef.current, { opacity: 1, duration: 0.6, delay: 0.4 });
    }
  }, []);

  return (
    <>
      <SEO 
        title="VEDIX - Digital Heritage Platform | Bharatiya Natya Mudras"
        description="Immerse yourself in the ancient art of Bharatiya Natya mudras through cutting-edge 3D experiences. Learn, practice, and master sacred hand gestures."
      />
      <div className="relative min-h-screen">
        <div ref={heroRef} className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-display font-bold mb-4 md:mb-6 text-gradient leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            VEDIX
          </motion.h1>
          
          <motion.p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Immerse yourself in the ancient art of Bharatiya Natya mudras through
            cutting-edge 3D experiences
          </motion.p>

          <motion.div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Link
              to="/practice"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-saffron-500 text-white rounded-full text-base sm:text-lg font-medium hover:bg-saffron-600 transition-all shadow-sm text-center"
            >
              Start Practicing
            </Link>
            <Link
              to="/learning-paths"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-saffron-600 border-2 border-saffron-500 rounded-full text-base sm:text-lg font-medium hover:bg-saffron-50 transition-all shadow-sm text-center"
            >
              Start Learning
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 hidden lg:block opacity-10">
        <Suspense fallback={null}>
          <Scene enableEffects={false} enableParticles={true} enableHand={false}>
            <Particles />
          </Scene>
        </Suspense>
      </div>
    </div>
    </>
  );
}

