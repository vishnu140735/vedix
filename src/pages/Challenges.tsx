import { useState } from 'react';
import SEO from '../components/SEO';

const challenges = [
  {
    id: 1,
    title: 'Daily Practice Challenge',
    description: 'Practice mudras for 7 consecutive days',
    type: 'streak',
    reward: '🏆 Beginner Badge',
    progress: 3,
    target: 7,
    status: 'active',
  },
  {
    id: 2,
    title: 'Mudra Master Quiz',
    description: 'Test your knowledge of 20 different mudras',
    type: 'quiz',
    reward: '📜 Knowledge Scroll',
    progress: 0,
    target: 20,
    status: 'available',
  },
  {
    id: 3,
    title: 'Perfect Form Challenge',
    description: 'Achieve 95%+ accuracy on 5 mudras',
    type: 'accuracy',
    reward: '✨ Perfection Badge',
    progress: 2,
    target: 5,
    status: 'active',
  },
  {
    id: 4,
    title: 'Story Performance',
    description: 'Complete a full story performance',
    type: 'performance',
    reward: '🎭 Performer Badge',
    progress: 0,
    target: 1,
    status: 'available',
  },
];

export default function Challenges() {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);

  return (
    <>
      <SEO 
        title="Challenges - VEDIX"
        description="Engaging challenges with quizzes and progress tracking to support your learning journey"
      />
      <div className="min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 text-gradient">
              Challenges
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Test your skills, track your progress, and earn achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {challenges.map((challenge) => {
              const progressPercent = (challenge.progress / challenge.target) * 100;
              const isCompleted = challenge.progress >= challenge.target;

              return (
                <div
                  key={challenge.id}
                  className={`glass-strong rounded-2xl p-6 md:p-8 ${
                    isCompleted ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900">
                          {challenge.title}
                        </h2>
                        {isCompleted && <span className="text-2xl">✅</span>}
                      </div>
                      <p className="text-gray-600 mb-4">{challenge.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full">
                          {challenge.type}
                        </span>
                        <span>🎁 {challenge.reward}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">
                        {challenge.progress} / {challenge.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          isCompleted
                            ? 'bg-green-500'
                            : 'bg-gradient-to-r from-saffron-400 to-saffron-600'
                        }`}
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedChallenge(selectedChallenge === challenge.id ? null : challenge.id)}
                    className={`w-full py-3 rounded-full font-medium transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-saffron-500 text-white hover:bg-saffron-600'
                    } shadow-sm`}
                  >
                    {isCompleted ? 'Completed ✓' : challenge.status === 'active' ? 'Continue' : 'Start Challenge'}
                  </button>

                  {selectedChallenge === challenge.id && challenge.type === 'quiz' && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="font-bold text-lg mb-4 text-gray-900">Quiz Questions</h3>
                      <div className="space-y-3">
                        <div className="glass rounded-lg p-4">
                          <div className="font-medium text-gray-900 mb-2">Question 1: What does Abhaya Mudra represent?</div>
                          <div className="space-y-2">
                            {['Fearlessness', 'Meditation', 'Offering', 'Wisdom'].map((option, idx) => (
                              <button
                                key={idx}
                                className="w-full text-left px-4 py-2 glass rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

