import { useState } from 'react';
import SEO from '../components/SEO';

const categories = [
  {
    id: 'history',
    title: 'History & Origins',
    icon: '📜',
    items: [
      { title: 'Natyasastra Origins', description: 'The ancient text that defines Indian classical dance' },
      { title: 'Evolution of Mudras', description: 'How hand gestures evolved over centuries' },
      { title: 'Regional Variations', description: 'Different styles across India' },
    ],
  },
  {
    id: 'instruments',
    title: 'Musical Instruments',
    icon: '🎵',
    items: [
      { title: 'Mridangam', description: 'The primary percussion instrument' },
      { title: 'Veena', description: 'String instrument for classical music' },
      { title: 'Flute', description: 'Wind instrument in dance performances' },
    ],
  },
  {
    id: 'costumes',
    title: 'Costumes & Attire',
    icon: '👗',
    items: [
      { title: 'Traditional Sarees', description: 'Classical dance costume styles' },
      { title: 'Jewelry & Accessories', description: 'Traditional ornaments for performances' },
      { title: 'Makeup & Face Paint', description: 'Traditional makeup techniques' },
    ],
  },
  {
    id: 'theory',
    title: 'Theory & Philosophy',
    icon: '📚',
    items: [
      { title: 'Rasa Theory', description: 'The nine emotions in Indian aesthetics' },
      { title: 'Tala & Rhythm', description: 'Understanding rhythm in dance' },
      { title: 'Abhinaya', description: 'The art of expression' },
    ],
  },
];

export default function CulturalHub() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <SEO 
        title="Cultural Hub - VEDIX"
        description="Explore the rich heritage of Bharatiya Natya - history, instruments, costumes, and theory"
      />
      <div className="min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 text-gradient">
              Cultural Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the rich heritage of Bharatiya Natya - history, instruments, costumes, and theory
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className="glass-strong rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{category.icon}</div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                    {category.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="glass rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedCategory(selectedCategory === `${category.id}-${index}` ? null : `${category.id}-${index}`)}
                    >
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      {selectedCategory === `${category.id}-${index}` && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-gray-700 mb-4">
                            Learn more about {item.title.toLowerCase()} and its significance in Bharatiya Natya.
                          </p>
                          <button className="px-4 py-2 bg-saffron-500 text-white rounded-lg text-sm font-medium hover:bg-saffron-600">
                            Read More
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

