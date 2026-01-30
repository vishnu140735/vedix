import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: 'Heritage Meets Innovation',
    content: 'VEDIX bridges the gap between ancient wisdom and modern technology, bringing the sacred art of Bharatiya Natya mudras to life through immersive 3D experiences.',
    sanskrit: 'नाट्यशास्त्र',
    icon: '🎭',
    stats: { value: '2000+', label: 'Years of Heritage' },
  },
  {
    title: 'Interactive Learning',
    content: 'Practice mudras in real-time with AI-powered hand tracking. Receive instant feedback and guidance as you master each gesture.',
    sanskrit: 'अभ्यास',
    icon: '🤲',
    stats: { value: '50+', label: 'Mudras to Master' },
  },
  {
    title: 'Cultural Preservation',
    content: 'We are committed to preserving and sharing the rich heritage of Indian classical dance and drama for future generations.',
    sanskrit: 'संस्कृति',
    icon: '🌺',
    stats: { value: '100%', label: 'Authentic Tradition' },
  },
];

const stats = [
  { number: 2000, suffix: '+', label: 'Years of Heritage', icon: '📜' },
  { number: 50, suffix: '+', label: 'Mudras Available', icon: '🙏' },
  { number: 10000, suffix: '+', label: 'Active Learners', icon: '👥' },
  { number: 95, suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Section items with advanced animations
      const sectionItems = containerRef.current?.querySelectorAll('.section-item');
      sectionItems?.forEach((item, index) => {
        const isEven = index % 2 === 0;
        
        // Main container animation - simplified for performance
        gsap.from(item as Element, {
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: item as Element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        // Text elements stagger
        const title = item.querySelector('.section-title');
        const content = item.querySelector('.section-content');
        const sanskrit = item.querySelector('.section-sanskrit');
        const image = item.querySelector('.section-image');
        const stats = item.querySelector('.section-stats');

        if (title) {
          gsap.from(title, {
            opacity: 0,
            x: isEven ? -50 : 50,
            duration: 1,
            scrollTrigger: {
              trigger: item as Element,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          });
        }

        if (content) {
          gsap.from(content, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
              trigger: item as Element,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          });
        }

        if (sanskrit) {
          gsap.from(sanskrit, {
            opacity: 0,
            scale: 0.8,
            rotation: -5,
            duration: 1,
            delay: 0.4,
            scrollTrigger: {
              trigger: item as Element,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          });
        }

        if (image) {
          gsap.from(image, {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            scrollTrigger: {
              trigger: item as Element,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          });

            }

        if (stats) {
          gsap.from(stats, {
            opacity: 0,
            y: 20,
            scale: 0.9,
            duration: 0.8,
            delay: 0.6,
            scrollTrigger: {
              trigger: item as Element,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      // Stats counter animation
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('.stat-number');
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target') || '0');
          const suffix = stat.getAttribute('data-suffix') || '';
          let animated = false;
          
          ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
              if (!animated) {
                animated = true;
                const obj = { value: 0 };
                gsap.to(obj, {
                  value: target,
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function() {
                    if (stat) {
                      stat.textContent = Math.floor(obj.value) + suffix;
                    }
                  },
                });
              }
            },
          });
        });
      }

      // Parallax for background particles
      gsap.to('.particles-container', {
        y: (i) => i * -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen pt-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <motion.div
          ref={titleRef}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold mb-4 md:mb-6 text-gradient px-4">
             VEDIX
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            A journey through time, connecting ancient traditions with the future of digital learning
          </p>
        </motion.div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-32"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-strong rounded-2xl p-4 md:p-6 text-center"
            >
              <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
              <div className="stat-number text-2xl md:text-3xl lg:text-4xl font-bold text-saffron-600 mb-1" 
                   data-target={stat.number} 
                   data-suffix={stat.suffix}>
                0{stat.suffix}
              </div>
              <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {sections.map((section, index) => (
            <div
              key={index}
              className="section-item glass-strong rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
                <div className={index % 2 === 0 ? '' : 'md:order-2'}>
                  <div className="inline-block mb-4 text-4xl md:text-5xl">
                    {section.icon}
                  </div>
                  
                  <h2 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6 text-saffron-600">
                    {section.title}
                  </h2>
                  
                  <p className="section-content text-base sm:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                    {section.content}
                  </p>
                  
                  <div className="section-sanskrit text-2xl md:text-3xl font-sanskrit text-gold-600 mb-4 md:mb-6 inline-block">
                    {section.sanskrit}
                  </div>

                  <div className="section-stats glass rounded-xl p-4 md:p-6 inline-block">
                    <div className="text-2xl md:text-3xl font-bold text-saffron-600">
                      {section.stats.value}
                    </div>
                    <div className="text-sm md:text-base text-gray-600">
                      {section.stats.label}
                    </div>
                  </div>
                </div>
                
                <div className={`section-image h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl md:rounded-2xl bg-gradient-to-br from-saffron-100 to-gold-100 relative overflow-hidden ${index % 2 === 0 ? '' : 'md:order-1'}`}>
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="text-4xl sm:text-5xl md:text-6xl">
                      {section.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 md:mt-32 text-center">
          <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-saffron-600">
              Join the Journey
            </h3>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Experience the beauty of Bharatiya Natya mudras through cutting-edge technology
            </p>
            <Link
              to="/learning-paths"
              className="inline-block px-8 py-4 bg-saffron-500 text-white rounded-full text-lg font-medium hover:bg-saffron-600 transition-all shadow-sm"
            >
              Start Learning Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

