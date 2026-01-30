import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Profile() {
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    darkMode: true,
    autoSave: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold mb-4 md:mb-6 text-gradient px-4">
            Profile & Settings
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <div className="glass-strong rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 md:mb-6 text-saffron-600">
              Profile Information
            </h2>
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-saffron-500 to-gold-500 flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0">
                  👤
                </div>
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <div className="text-xl sm:text-2xl font-bold mb-1 md:mb-2 text-gray-900">Student</div>
                  <div className="text-sm sm:text-base text-gray-600 break-all">student@vedix.com</div>
                </div>
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-white text-saffron-600 border-2 border-saffron-500 rounded-full text-sm sm:text-base font-medium hover:bg-saffron-50 transition-all shadow-sm">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 md:mb-6 text-saffron-600">
              Settings
            </h2>
            <div className="space-y-3 md:space-y-4">
              {Object.entries(settings).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between glass rounded-lg md:rounded-xl p-3 md:p-4"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="font-medium text-sm sm:text-base capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {key === 'notifications' && 'Receive practice reminders'}
                      {key === 'soundEffects' && 'Enable audio feedback'}
                      {key === 'darkMode' && 'Use dark theme'}
                      {key === 'autoSave' && 'Automatically save progress'}
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSetting(key as keyof typeof settings)}
                    className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors flex-shrink-0 ${
                      value ? 'bg-saffron-500' : 'bg-dark-300'
                    }`}
                  >
                    <motion.div
                      className="absolute top-0.5 sm:top-1 w-5 h-5 bg-white rounded-full"
                      animate={{ x: value ? (window.innerWidth < 640 ? 24 : 28) : 4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 md:mb-6 text-saffron-400">
              Learning Preferences
            </h2>
            <div className="space-y-3 md:space-y-4">
              <div className="glass rounded-lg md:rounded-xl p-3 md:p-4">
                <label className="block text-xs sm:text-sm font-medium mb-2">Difficulty Level</label>
                <select className="w-full bg-dark-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-saffron-400">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="glass rounded-lg md:rounded-xl p-3 md:p-4">
                <label className="block text-xs sm:text-sm font-medium mb-2">Practice Duration</label>
                <select className="w-full bg-dark-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-saffron-400">
                  <option>5 minutes</option>
                  <option>10 minutes</option>
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                </select>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 md:py-4 bg-red-600 hover:bg-red-700 rounded-full font-medium text-base md:text-lg transition-all active:scale-95"
          >
            Sign Out
          </motion.button>
        </div>
      </div>
    </div>
  );
}

