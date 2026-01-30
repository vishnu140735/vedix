import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/learning-paths', label: 'Learn' },
  { path: '/storytelling', label: 'Stories' },
  { path: '/gamified-learning', label: 'Games' },
  { path: '/challenges', label: 'Challenges' },
  { path: '/library', label: 'Library' },
  { path: '/cultural-hub', label: 'Culture' },
  { path: '/mentors', label: 'Mentors' },
  { path: '/practice', label: 'Practice' },
];

export default function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'glass-strong py-3 md:py-4 shadow-sm' : 'bg-white/80 py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2" 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="VEDIX Home"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl md:text-2xl font-display font-bold text-gradient"
          >
            VEDIX
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative group"
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <span
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-saffron-600'
                    : 'text-gray-700 hover:text-saffron-600'
                }`}
              >
                {item.label}
              </span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron-400 to-gold-400"
                  initial={false}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-4 lg:px-6 py-2 bg-saffron-500 text-white rounded-full text-sm font-medium hover:bg-saffron-600 transition-all shadow-sm"
          >
            Get Started
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-saffron-600 bg-saffron-50'
                      : 'text-gray-700 hover:text-saffron-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

