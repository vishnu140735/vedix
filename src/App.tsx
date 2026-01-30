import { Routes, Route } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import { ErrorBoundary } from './components/ErrorBoundary';
import BackToTop from './components/BackToTop';
import SkipToContent from './components/SkipToContent';

gsap.registerPlugin(ScrollTrigger);

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing'));
const About = lazy(() => import('./pages/About'));
const Practice = lazy(() => import('./pages/Practice'));
const MudraLibrary = lazy(() => import('./pages/MudraLibrary'));
const LearningPaths = lazy(() => import('./pages/LearningPaths'));
const LearningPathDetail = lazy(() => import('./pages/LearningPathDetail'));
const Storytelling = lazy(() => import('./pages/Storytelling'));
const Challenges = lazy(() => import('./pages/Challenges'));
const Mentors = lazy(() => import('./pages/Mentors'));
const CulturalHub = lazy(() => import('./pages/CulturalHub'));
const GamifiedLearning = lazy(() => import('./pages/GamifiedLearning'));
const Progress = lazy(() => import('./pages/Progress'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-saffron-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading VEDIX...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Refresh ScrollTrigger after Lenis is initialized
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
        <SkipToContent />
        <Navigation />
        <main id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/library" element={<MudraLibrary />} />
              <Route path="/learning-paths" element={<LearningPaths />} />
              <Route path="/learning-paths/:id" element={<LearningPathDetail />} />
              <Route path="/storytelling" element={<Storytelling />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/cultural-hub" element={<CulturalHub />} />
              <Route path="/gamified-learning" element={<GamifiedLearning />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <BackToTop />
      </div>
    </ErrorBoundary>
  );
}

export default App;

