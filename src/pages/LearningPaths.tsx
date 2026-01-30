import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const learningPaths = [
  {
    id: 1,
    title: 'Beginner\'s Journey',
    description: 'Start your journey with fundamental mudras and basic techniques',
    duration: '4 weeks',
    lessons: 12,
    progress: 0,
    icon: '🌱',
    color: 'from-green-400 to-emerald-500',
  },
  {
    id: 2,
    title: 'Intermediate Mastery',
    description: 'Deepen your understanding with complex gestures and sequences',
    duration: '6 weeks',
    lessons: 18,
    progress: 0,
    icon: '🎯',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 3,
    title: 'Advanced Performance',
    description: 'Master advanced techniques and prepare for performances',
    duration: '8 weeks',
    lessons: 24,
    progress: 0,
    icon: '⭐',
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 4,
    title: 'Storytelling Through Dance',
    description: 'Learn to narrate stories like Sita Swayamvar through mudras',
    duration: '10 weeks',
    lessons: 30,
    progress: 0,
    icon: '📖',
    color: 'from-amber-400 to-orange-500',
  },
];

export default function LearningPaths() {
  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  return (
    <>
      <SEO 
        title="Learning Paths - VEDIX"
        description="Curated learning paths with guided tutorials and practice sessions for mastering Bharatiya Natya mudras"
      />
      <div className="min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 text-gradient">
              Learning Paths
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Follow curated paths with guided tutorials and structured practice sessions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className={`glass-strong rounded-2xl p-6 md:p-8 cursor-pointer transition-all hover:shadow-lg ${
                  selectedPath === path.id ? 'ring-2 ring-saffron-500' : ''
                }`}
                onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`text-5xl md:text-6xl bg-gradient-to-br ${path.color} bg-clip-text text-transparent`}>
                    {path.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-gray-900">
                      {path.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{path.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <span>⏱️ {path.duration}</span>
                      <span>📚 {path.lessons} lessons</span>
                    </div>
                    <Link
                      to={`/learning-paths/${path.id}`}
                      className="inline-block px-6 py-3 bg-saffron-500 text-white rounded-full font-medium hover:bg-saffron-600 transition-colors shadow-sm"
                    >
                      Start Learning
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

