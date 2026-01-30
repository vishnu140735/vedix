import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

interface StoryImage {
  id: number;
  url: string;
  title: string;
  description: string;
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  image: string;
  mudras: string[];
  duration: string;
}

interface Story {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  status: string;
  coverImage: string;
  images: StoryImage[];
  chapters: Chapter[];
}

const stories: Story[] = [
  {
    id: 1,
    title: 'Sita Swayamvar',
    description: 'Experience the epic tale of Sita\'s swayamvar through interactive dance and mudras',
    duration: '45 min',
    difficulty: 'Intermediate',
    status: 'available',
    // Replace with AI-generated image: "Sita Swayamvar, King Janaka's court, princes gathering, ancient Indian royal court"
    coverImage: `https://i.pinimg.com/736x/26/bd/48/26bd48084eb0efe86ce016de1e6b90fe.jpg`,
    images: [
      {
        id: 1,
        // Replace with AI-generated image: "Princes arriving at King Janaka's court for Sita's swayamvar, royal procession"
        url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30T7oZyo5dp3_QPr3YHuoMOWsvok_6uRCMg&s`,
        title: 'The Arrival',
        description: 'Princes gather at King Janaka\'s court for the swayamvar',
      },
      {
        id: 2,
        // Replace with AI-generated image: "Lord Shiva's bow, the challenge, mighty bow in King Janaka's court"
        url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqsoRfW5RWAahUYUnr7DxozAoB8GlfCSQhxw&s`,
        title: 'The Challenge',
        description: 'The mighty bow of Lord Shiva awaits the worthy prince',
      },
      {
        id: 3,
        // Replace with AI-generated image: "Lord Rama breaking the bow, victory moment, Sita watching"
        url: `https://preview.redd.it/rama-breaks-shivas-bow-and-wins-sitas-hand-in-marriage-v0-hj0f967jcw0e1.jpeg?width=640&crop=smart&auto=webp&s=72d16d7676a11167af5aa98ae5b5b24df237bea7`,
        title: 'Rama\'s Victory',
        description: 'Lord Rama breaks the bow, winning Sita\'s hand',
      },
      {
        id: 4,
        // Replace with AI-generated image: "Rama and Sita wedding, divine marriage ceremony, traditional Indian wedding"
        url: `https://vedicfeed.com/wp-content/uploads/2019/12/Rama-Sita-Marriage.jpg`,
        title: 'The Union',
        description: 'The divine marriage of Rama and Sita',
      },
    ],
    chapters: [
      {
        id: 1,
        title: 'The Gathering',
        description: 'Learn the mudras for welcoming gestures',
        // Replace with AI-generated image: "Royal court gathering, welcoming gestures, King Janaka's palace"
        image: `https://i.pinimg.com/736x/3e/8f/0e/3e8f0eb5f0e3b50c476038e2a55dd14d.jpg`,
        mudras: ['Anjali Mudra', 'Abhaya Mudra'],
        duration: '10 min',
      },
      {
        id: 2,
        title: 'The Challenge',
        description: 'Express strength and determination',
        // Replace with AI-generated image: "The bow challenge, princes attempting to lift the bow"
        image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwF5upW-2N0CnZu99Br7zSHascuHiJ3aFn-Q&s`,
        mudras: ['Vitarka Mudra', 'Varada Mudra'],
        duration: '12 min',
      },
      {
        id: 3,
        title: 'The Victory',
        description: 'Celebrate with joyful gestures',
        // Replace with AI-generated image: "Rama breaking the bow, celebration, victory moment"
        image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxm6BHL4jtsxRpJcSOhqoA62p_5cAWo-oIWQ&s`,
        mudras: ['Anjali Mudra', 'Abhaya Mudra'],
        duration: '15 min',
      },
      {
        id: 4,
        title: 'The Union',
        description: 'Express love and devotion',
        // Replace with AI-generated image: "Rama and Sita wedding ceremony, divine union"
        image: `https://i.ytimg.com/vi/uBDKQTjvoDs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDRy4XJJcTMkggd87La88XpAl5SOQ`,
        mudras: ['Dhyana Mudra', 'Anjali Mudra'],
        duration: '8 min',
      },
    ],
  },
  {
    id: 2,
    title: 'Ramayana - The Journey',
    description: 'Follow Lord Rama\'s journey through expressive gestures and movements',
    duration: '60 min',
    difficulty: 'Advanced',
    status: 'coming-soon',
    // Replace with AI-generated image: "Ramayana journey, Lord Rama's exile, forest scene, ancient Indian epic"
    coverImage: `https://i0.wp.com/hindupad.com/wp-content/uploads/Ayodhya-Kanda-in-Ramayana.jpg?fit=376%2C349&ssl=1`,
    images: [
      {
        id: 1,
        // Replace with AI-generated image: "Rama Sita Lakshmana in forest, exile scene, Dandaka forest"
        url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3Cm9LFHbF8svJtA2f9IY5m5OrbVXQmPfOw&s`,
        title: 'The Exile',
        description: 'Rama, Sita, and Lakshmana begin their forest journey',
      },
      {
        id: 2,
        // Replace with AI-generated image: "Ravana abducting Sita, golden deer scene, abduction moment"
        url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSouSLxKxbnv4ZLbFiryFNy8h13bpwXzX3TQA&s`,
        title: 'The Abduction',
        description: 'Ravana abducts Sita to Lanka',
      },
      {
        id: 3,
        // Replace with AI-generated image: "Rama and Lakshmana searching for Sita, meeting Hanuman"
        url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2u03FJT2KiVpG2YxKfVUECa_N0UX7r8Eewg&s`,
        title: 'The Search',
        description: 'Rama and Lakshmana search for Sita',
      },
      {
        id: 4,
        // Replace with AI-generated image: "Rama vs Ravana battle, epic war scene, Lanka battle"
        url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB01y99-wdhA7LHGCV9VswDxvlkMhiJFvobA&s`,
        title: 'The Battle',
        description: 'The epic battle between Rama and Ravana',
      },
      {
        id: 5,
        // Replace with AI-generated image: "Rama returning to Ayodhya, victory procession, Pushpaka Vimana"
        url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKhZ1tMwaPmRsiMhYZzfU8HUe4VuLmkCr3zA&s`,
        title: 'The Return',
        description: 'Rama returns to Ayodhya with Sita',
      },
    ],
    chapters: [],
  },
  {
    id: 3,
    title: 'Krishna Leela',
    description: 'Dance through the divine play of Lord Krishna',
    duration: '50 min',
    difficulty: 'Intermediate',
    status: 'coming-soon',
    // Replace with AI-generated image: "Krishna Leela, Lord Krishna playing flute, Vrindavan scene, divine play"
    coverImage: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUiJLuibjMLFq-gEfX03lzZvePdMV9IqYQIg&s`,
    images: [
      {
        id: 1,
        // Replace with AI-generated image: "Lord Krishna birth, Mathura, Vasudeva carrying baby Krishna, divine birth"
        url: `https://via.placeholder.com/800x600/B8860B/FFFFFF?text=Krishna+Birth`,
        title: 'The Birth',
        description: 'The divine birth of Lord Krishna in Mathura',
      },
      {
        id: 2,
        // Replace with AI-generated image: "Krishna childhood, Vrindavan, playing with friends, cowherd boy"
        url: `https://via.placeholder.com/800x600/FFA000/FFFFFF?text=Childhood+Play`,
        title: 'Childhood Play',
        description: 'Krishna\'s playful childhood in Vrindavan',
      },
      {
        id: 3,
        // Replace with AI-generated image: "Krishna playing flute, Vrindavan, gopis enchanted, divine music"
        url: `https://via.placeholder.com/800x600/B8860B/FFFFFF?text=The+Flute`,
        title: 'The Flute',
        description: 'Krishna plays his divine flute, enchanting all',
      },
      {
        id: 4,
        // Replace with AI-generated image: "Raas Leela, Krishna dancing with gopis, circular dance, full moon night"
        url: `https://via.placeholder.com/800x600/FFA000/FFFFFF?text=Raas+Leela`,
        title: 'Raas Leela',
        description: 'The divine dance with the gopis',
      },
      {
        id: 5,
        // Replace with AI-generated image: "Krishna stealing butter, Makhan Chor, playful Krishna, Yashoda"
        url: `https://via.placeholder.com/800x600/B8860B/FFFFFF?text=Butter+Thief`,
        title: 'The Butter Thief',
        description: 'Krishna\'s playful mischief stealing butter',
      },
    ],
    chapters: [],
  },
];

export default function Storytelling() {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const currentStory = stories.find(s => s.id === selectedStory);

  return (
    <>
      <SEO 
        title="AI Storytelling - VEDIX"
        description="Learn and perform historical events through AI-powered storytelling and dance"
      />
      <div className="min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 text-gradient">
              AI Storytelling
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Learn and perform historical events through interactive dance narratives
            </p>
            <div className="inline-block glass-strong rounded-full px-6 py-3 mb-8">
              <span className="text-sm text-gray-600">Powered by AI • Interactive Learning</span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {stories.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-strong rounded-2xl overflow-hidden ${
                  story.status === 'coming-soon' ? 'opacity-60' : ''
                }`}
              >
                {/* Story Card with Cover Image */}
                <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
                  {/* Cover Image */}
                  <div className="md:col-span-1">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                      <img
                        src={story.coverImage}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/800x600/FFA000/FFFFFF?text=${encodeURIComponent(story.title)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="text-sm font-medium">Click to view gallery</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Story Info */}
                  <div className="md:col-span-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                          {story.title}
                        </h2>
                        {story.status === 'coming-soon' && (
                          <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{story.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <span>⏱️ {story.duration}</span>
                        <span>📊 {story.difficulty}</span>
                        {story.status === 'available' && story.images.length > 0 && (
                          <span>🖼️ {story.images.length} Images</span>
                        )}
                      </div>
                    </div>
                    {story.status === 'available' && (
                      <button
                        onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
                        className="w-full md:w-auto px-6 py-3 bg-saffron-500 text-white rounded-full font-medium hover:bg-saffron-600 transition-colors shadow-sm"
                      >
                        {selectedStory === story.id ? 'Hide Details' : 'Explore Story'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Story Content */}
                <AnimatePresence>
                  {selectedStory === story.id && story.status === 'available' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-200 p-6 md:p-8 space-y-8">
                        {/* Image Gallery */}
                        {story.images.length > 0 && (
                          <div>
                            <h3 className="text-xl font-display font-bold mb-4 text-gray-900">
                              Story Gallery
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {story.images.map((img) => (
                                <motion.div
                                  key={img.id}
                                  className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                                  whileHover={{ scale: 1.05 }}
                                  onClick={() => setSelectedImage(img.id)}
                                >
                                  <img
                                    src={img.url}
                                    alt={img.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x300/FFA000/FFFFFF?text=${encodeURIComponent(img.title)}`;
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                      <p className="text-sm font-medium">{img.title}</p>
                                      <p className="text-xs opacity-90">{img.description}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Chapters */}
                        {story.chapters.length > 0 && (
                          <div>
                            <h3 className="text-xl font-display font-bold mb-4 text-gray-900">
                              Story Chapters
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                              {story.chapters.map((chapter) => (
                                <motion.div
                                  key={chapter.id}
                                  className="glass rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                                  whileHover={{ y: -4 }}
                                  onClick={() => setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id)}
                                >
                                  <div className="relative aspect-video">
                                    <img
                                      src={chapter.image}
                                      alt={chapter.title}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x300/B8860B/FFFFFF?text=${encodeURIComponent(chapter.title)}`;
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h4 className="font-bold text-lg mb-1">{chapter.title}</h4>
                                        <p className="text-sm opacity-90">{chapter.description}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                      <span className="text-sm text-gray-500">⏱️ {chapter.duration}</span>
                                      <span className="text-xs text-saffron-600 font-medium">
                                        {chapter.mudras.length} Mudras
                                      </span>
                                    </div>
                                    <AnimatePresence>
                                      {selectedChapter === chapter.id && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="pt-3 border-t border-gray-200">
                                            <p className="text-sm text-gray-600 mb-2">Mudras to learn:</p>
                                            <div className="flex flex-wrap gap-2">
                                              {chapter.mudras.map((mudra, idx) => (
                                                <span
                                                  key={idx}
                                                  className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-xs font-medium"
                                                >
                                                  {mudra}
                                                </span>
                                              ))}
                                            </div>
                                            <button className="mt-3 w-full px-4 py-2 bg-saffron-500 text-white rounded-lg text-sm font-medium hover:bg-saffron-600 transition-colors">
                                              Start Practice
                                            </button>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && currentStory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {currentStory.images.find(img => img.id === selectedImage) && (
                  <>
                    <img
                      src={currentStory.images.find(img => img.id === selectedImage)!.url}
                      alt={currentStory.images.find(img => img.id === selectedImage)!.title}
                      className="max-w-full max-h-[90vh] object-contain rounded-lg"
                      onError={(e) => {
                        const img = currentStory.images.find(img => img.id === selectedImage);
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/1200x800/FFA000/FFFFFF?text=${encodeURIComponent(img?.title || 'Image')}`;
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {currentStory.images.find(img => img.id === selectedImage)!.title}
                      </h3>
                      <p className="text-white/90">
                        {currentStory.images.find(img => img.id === selectedImage)!.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      ✕
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

