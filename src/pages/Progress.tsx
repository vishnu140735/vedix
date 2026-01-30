import { motion } from 'framer-motion';
import { useState } from 'react';

const achievements = [
  { id: 1, name: 'First Steps', description: 'Complete your first mudra', icon: '🌟', unlocked: true },
  { id: 2, name: 'Dedicated Learner', description: 'Practice for 7 days', icon: '📚', unlocked: true },
  { id: 3, name: 'Master of Gestures', description: 'Master 10 mudras', icon: '👑', unlocked: false },
  { id: 4, name: 'Perfect Form', description: 'Achieve 100% accuracy', icon: '✨', unlocked: false },
];

const stats = [
  { label: 'Mudras Learned', value: '6', max: '20' },
  { label: 'Practice Sessions', value: '24', max: '100' },
  { label: 'Total Time', value: '12h', max: '50h' },
  { label: 'Accuracy', value: '87%', max: '100%' },
];

export default function Progress() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <div className="relative min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold mb-4 md:mb-6 text-gradient px-4">
            Your Progress
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Track your journey in mastering Bharatiya Natya mudras
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          <div className="glass-strong rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 md:mb-6">
              {['week', 'month', 'all'].map((period) => (
                <motion.button
                  key={period}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium capitalize transition-all ${
                    selectedPeriod === period
                      ? 'bg-saffron-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-saffron-500'
                  }`}
                >
                  {period}
                </motion.button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl md:rounded-2xl p-4 md:p-6"
                >
                  <div className="text-xs sm:text-sm text-gray-600 mb-2">{stat.label}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-saffron-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseInt(stat.value) / parseInt(stat.max)) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className="bg-gradient-to-r from-saffron-400 to-gold-400 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 md:mb-6 text-saffron-400">
              Achievements
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glass rounded-xl md:rounded-2xl p-4 md:p-6 ${
                    achievement.unlocked ? 'glow-gold' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="text-3xl md:text-4xl">{achievement.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-display font-bold mb-1">
                        {achievement.name}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-xl md:text-2xl flex-shrink-0">✓</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 md:mb-6 text-saffron-400">
              Recent Activity
            </h2>
            <div className="space-y-3 md:space-y-4">
              {[
                { mudra: 'Anjali Mudra', date: '2 hours ago', accuracy: '95%' },
                { mudra: 'Chin Mudra', date: '1 day ago', accuracy: '88%' },
                { mudra: 'Abhaya Mudra', date: '2 days ago', accuracy: '92%' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-lg md:rounded-xl p-3 md:p-4 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-base md:text-lg truncate">{activity.mudra}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{activity.date}</div>
                  </div>
                  <div className="text-saffron-400 font-bold text-base md:text-lg ml-4 flex-shrink-0">{activity.accuracy}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

