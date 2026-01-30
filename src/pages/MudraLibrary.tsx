import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

const mudras = [
  {
    id: 1,
    name: 'Abhaya Mudra',
    sanskrit: 'अभय मुद्रा',
    description: 'The gesture of fearlessness and protection, symbolizing peace and reassurance.',
    category: 'Protection',
    difficulty: 'Beginner',
    // Replace with AI-generated image: "Abhaya Mudra hand gesture, fearlessness gesture, palm facing outward"
    image: `https://www.shutterstock.com/image-vector/abhaya-mudra-gesture-yoga-fingers-600nw-1058481215.jpg`,
  },
  {
    id: 2,
    name: 'Chin Mudra',
    sanskrit: 'चिन मुद्रा',
    description: 'The gesture of consciousness, representing the connection between individual and universal consciousness.',
    category: 'Meditation',
    difficulty: 'Beginner',
    // Replace with AI-generated image: "Chin Mudra hand gesture, thumb and index finger touching, meditation pose"
    image: `https://www.shutterstock.com/image-vector/chin-mudra-gesture-consciousness-vector-600nw-1095713390.jpg`,
  },
  {
    id: 3,
    name: 'Anjali Mudra',
    sanskrit: 'अंजलि मुद्रा',
    description: 'The gesture of offering and respect, commonly used in prayer and greeting.',
    category: 'Reverence',
    difficulty: 'Beginner',
    // Replace with AI-generated image: "Anjali Mudra hand gesture, palms together in prayer position, namaste"
    image: `https://c8.alamy.com/comp/2C4F75B/anjali-mudra-gesture-of-reverence-vector-2C4F75B.jpg`,
  },
  {
    id: 4,
    name: 'Dhyana Mudra',
    sanskrit: 'ध्यान मुद्रा',
    description: 'The gesture of meditation, representing concentration and inner peace.',
    category: 'Meditation',
    difficulty: 'Intermediate',
    // Replace with AI-generated image: "Dhyana Mudra hand gesture, hands resting in lap, meditation pose"
    image: `https://www.shutterstock.com/image-vector/dhyana-mudra-gesture-yoga-fingers-260nw-1058509970.jpg`,
  },
  {
    id: 5,
    name: 'Varada Mudra',
    sanskrit: 'वरद मुद्रा',
    description: 'The gesture of granting wishes, symbolizing compassion and charity.',
    category: 'Compassion',
    difficulty: 'Intermediate',
    // Replace with AI-generated image: "Varada Mudra hand gesture, palm facing downward, granting gesture"
    image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEhZxwZWX2YqUkoXZqdhjBVMzxQX8mil3pA&s`,
  },
  {
    id: 6,
    name: 'Vitarka Mudra',
    sanskrit: 'वितर्क मुद्रा',
    description: 'The gesture of discussion and intellectual argument, representing teaching and debate.',
    category: 'Wisdom',
    difficulty: 'Advanced',
    // Replace with AI-generated image: "Vitarka Mudra hand gesture, thumb and index finger in circle, teaching gesture"
    image: `https://cdn.shopify.com/s/files/1/0298/7753/4853/files/Vitarka_Mudra_480x480.jpg?v=1631036916`,
  },
];

export default function MudraLibrary() {
  const [selectedMudra, setSelectedMudra] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [isFiltering, setIsFiltering] = useState(false);

  const categories = ['All', ...Array.from(new Set(mudras.map(m => m.category)))];

  const filteredMudras = filter === 'All' 
    ? mudras 
    : mudras.filter(m => m.category === filter);

  // Reset selected mudra when filter changes
  useEffect(() => {
    setSelectedMudra(null);
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [filter]);

  return (
    <div className="relative min-h-screen pt-24 bg-gradient-to-b from-white to-gray-50">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold mb-4 md:mb-6 text-gradient px-4">
            Mudra Library
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            Explore the sacred gestures of Bharatiya Natya
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setFilter(category);
                }}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                  filter === category
                    ? 'bg-saffron-500 text-white shadow-sm'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-saffron-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
            layout
          >
            <AnimatePresence mode="wait">
              {!isFiltering && (
                <motion.div
                  key={filter}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.1,
                      },
                    },
                    exit: {
                      opacity: 0,
                      transition: {
                        staggerChildren: 0.05,
                        staggerDirection: -1,
                      },
                    },
                  }}
                  className="contents"
                >
                  {filteredMudras.map((mudra) => (
                    <motion.div
                      key={`${filter}-${mudra.id}`}
                      layout
                      variants={{
                        hidden: { 
                          opacity: 0, 
                          y: 30,
                          scale: 0.9,
                        },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          scale: 1,
                          transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                          },
                        },
                        exit: {
                          opacity: 0,
                          scale: 0.8,
                          y: -20,
                          transition: {
                            duration: 0.2,
                          },
                        },
                      }}
                      className="glass-strong rounded-2xl md:rounded-3xl p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                      onClick={() => setSelectedMudra(selectedMudra === mudra.id ? null : mudra.id)}
                    >
                      <div className="aspect-square rounded-xl md:rounded-2xl mb-3 md:mb-4 overflow-hidden relative group">
                        <img
                          src={mudra.image}
                          alt={`${mudra.name} - ${mudra.sanskrit}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to placeholder with mudra name
                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/600x600/FFA000/FFFFFF?text=${encodeURIComponent(mudra.name)}`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="text-white text-center px-4">
                            <p className="text-sm font-medium">{mudra.sanskrit}</p>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 text-saffron-600">
                        {mudra.name}
                      </h3>
                      
                      <p className="text-base sm:text-lg font-sanskrit text-gold-600 mb-3 md:mb-4">
                        {mudra.sanskrit}
                      </p>

                      <AnimatePresence>
                        {selectedMudra === mudra.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ 
                              opacity: 1, 
                              height: 'auto',
                              marginTop: 16,
                            }}
                            exit={{ 
                              opacity: 0, 
                              height: 0,
                              marginTop: 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: 'easeInOut',
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm sm:text-base text-gray-700 mb-4">{mudra.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {mudra.category}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {mudra.difficulty}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}

