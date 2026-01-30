import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: number;
}

interface DailyChallenge {
  id: number;
  title: string;
  description: string;
  type: 'practice' | 'quiz' | 'streak' | 'accuracy';
  reward: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  avatar: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first mudra practice',
    icon: '🌟',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    reward: 50,
  },
  {
    id: 2,
    name: 'Dedicated Learner',
    description: 'Practice for 7 consecutive days',
    icon: '🔥',
    unlocked: false,
    progress: 3,
    maxProgress: 7,
    reward: 100,
  },
  {
    id: 3,
    name: 'Mudra Master',
    description: 'Master 10 different mudras',
    icon: '👑',
    unlocked: false,
    progress: 6,
    maxProgress: 10,
    reward: 200,
  },
  {
    id: 4,
    name: 'Perfect Form',
    description: 'Achieve 100% accuracy on any mudra',
    icon: '✨',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: 150,
  },
  {
    id: 5,
    name: 'Story Teller',
    description: 'Complete a full story performance',
    icon: '📖',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: 300,
  },
  {
    id: 6,
    name: 'Quiz Champion',
    description: 'Score 100% on 5 quizzes',
    icon: '🏆',
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    reward: 250,
  },
];

const dailyChallenges: DailyChallenge[] = [
  {
    id: 1,
    title: 'Morning Practice',
    description: 'Practice 3 mudras before noon',
    type: 'practice',
    reward: 75,
    progress: 1,
    maxProgress: 3,
    completed: false,
  },
  {
    id: 2,
    title: 'Perfect Accuracy',
    description: 'Achieve 95%+ accuracy on any mudra',
    type: 'accuracy',
    reward: 100,
    progress: 0,
    maxProgress: 1,
    completed: false,
  },
  {
    id: 3,
    title: 'Quick Quiz',
    description: 'Complete a mudra knowledge quiz',
    type: 'quiz',
    reward: 50,
    progress: 0,
    maxProgress: 1,
    completed: false,
  },
];

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Priya S.', xp: 5420, level: 12, avatar: '👑' },
  { rank: 2, name: 'Raj K.', xp: 4890, level: 11, avatar: '⭐' },
  { rank: 3, name: 'Ananya M.', xp: 4650, level: 11, avatar: '🌟' },
  { rank: 4, name: 'You', xp: 3420, level: 8, avatar: '🙂' },
  { rank: 5, name: 'Suresh P.', xp: 3210, level: 8, avatar: '🎯' },
  { rank: 6, name: 'Meera D.', xp: 2980, level: 7, avatar: '✨' },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does Abhaya Mudra represent?',
    options: ['Fearlessness', 'Meditation', 'Offering', 'Wisdom'],
    correct: 0,
  },
  {
    id: 2,
    question: 'Which mudra is commonly used in prayer?',
    options: ['Chin Mudra', 'Anjali Mudra', 'Dhyana Mudra', 'Vitarka Mudra'],
    correct: 1,
  },
  {
    id: 3,
    question: 'What is the Sanskrit name for meditation gesture?',
    options: ['अभय मुद्रा', 'ध्यान मुद्रा', 'अंजलि मुद्रा', 'वरद मुद्रा'],
    correct: 1,
  },
];

export default function GamifiedLearning() {
  const [searchParams] = useSearchParams();
  const [userXP, setUserXP] = useState(3420);
  const [userLevel] = useState(8);
  const [streak] = useState(3);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'challenges' | 'leaderboard' | 'quiz'>('overview');
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Check if quiz tab is requested via URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'quiz') {
      setSelectedTab('quiz');
    }
  }, [searchParams]);

  const xpProgress = ((userXP % 500) / 500) * 100;

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const question = quizQuestions.find(q => q.id === questionId);
    if (question && answerIndex === question.correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const completeQuiz = () => {
    setShowQuizResult(true);
    const xpGained = quizScore * 50;
    setUserXP(prev => prev + xpGained);
    setTimeout(() => {
      setCurrentQuiz(null);
      setQuizScore(0);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    }, 3000);
  };

  return (
    <>
      <SEO 
        title="Gamified Learning - VEDIX"
        description="Learn mudras through gamified experiences with points, achievements, and challenges"
      />
      <div className="min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 text-gradient">
              Gamified Learning
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Level up your mudra skills through fun challenges and achievements
            </p>
          </div>

          {/* User Stats Card */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="glass-strong rounded-2xl p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <div className="text-3xl font-bold text-saffron-600 mb-1">{userXP.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-3xl font-bold text-saffron-600 mb-1">Level {userLevel}</div>
                  <div className="text-sm text-gray-600">
                    {xpProgress.toFixed(0)}% to Level {userLevel + 1}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-saffron-500 to-gold-500 h-2 rounded-full transition-all"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔥</div>
                  <div className="text-3xl font-bold text-saffron-600 mb-1">{streak} days</div>
                  <div className="text-sm text-gray-600">Current Streak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'achievements', label: 'Achievements', icon: '🏆' },
                { id: 'challenges', label: 'Daily Challenges', icon: '🎯' },
                { id: 'leaderboard', label: 'Leaderboard', icon: '👥' },
                { id: 'quiz', label: 'Quick Quiz', icon: '📝' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTab === tab.id
                      ? 'bg-saffron-500 text-white shadow-sm'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-saffron-500'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="glass-strong rounded-2xl p-6">
                    <h2 className="text-2xl font-display font-bold mb-4 text-gray-900">Recent Activity</h2>
                    <div className="space-y-3">
                      {[
                        { action: 'Completed practice', mudra: 'Anjali Mudra', xp: '+50', time: '2 hours ago' },
                        { action: 'Unlocked achievement', achievement: 'First Steps', xp: '+50', time: '1 day ago' },
                        { action: 'Completed quiz', score: '3/3', xp: '+150', time: '2 days ago' },
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-center justify-between glass rounded-lg p-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-600">{activity.time}</p>
                          </div>
                          <span className="text-sm font-bold text-saffron-600">{activity.xp} XP</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-strong rounded-2xl p-6">
                    <h2 className="text-2xl font-display font-bold mb-4 text-gray-900">Quick Actions</h2>
                    <div className="space-y-3">
                      <Link
                        to="/practice"
                        className="block glass rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Practice Mudras</p>
                            <p className="text-sm text-gray-600">Earn 50 XP per practice</p>
                          </div>
                          <span className="text-2xl">🙏</span>
                        </div>
                      </Link>
                      <Link
                        to="/storytelling"
                        className="block glass rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Complete Story</p>
                            <p className="text-sm text-gray-600">Earn 300 XP</p>
                          </div>
                          <span className="text-2xl">📖</span>
                        </div>
                      </Link>
                      <button
                        onClick={() => setSelectedTab('quiz')}
                        className="w-full glass rounded-lg p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Take Quiz</p>
                            <p className="text-sm text-gray-600">Earn up to 150 XP</p>
                          </div>
                          <span className="text-2xl">📝</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {achievements.map((achievement) => {
                    const progressPercent = (achievement.progress / achievement.maxProgress) * 100;
                    return (
                      <div
                        key={achievement.id}
                        className={`glass-strong rounded-xl p-6 ${
                          achievement.unlocked ? 'ring-2 ring-gold-500' : ''
                        }`}
                      >
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className="font-bold text-lg mb-1 text-gray-900">{achievement.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">
                              {achievement.progress} / {achievement.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                achievement.unlocked ? 'bg-green-500' : 'bg-saffron-500'
                              }`}
                              style={{ width: `${Math.min(progressPercent, 100)}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-saffron-600">
                            {achievement.unlocked ? '✓ Unlocked' : `${achievement.reward} XP`}
                          </span>
                          {achievement.unlocked && (
                            <span className="text-xs text-gold-600 font-medium">Reward: {achievement.reward} XP</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {selectedTab === 'challenges' && (
                <motion.div
                  key="challenges"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="glass-strong rounded-2xl p-6 mb-6">
                    <h2 className="text-2xl font-display font-bold mb-2 text-gray-900">Daily Challenges</h2>
                    <p className="text-gray-600">Complete challenges to earn bonus XP and maintain your streak!</p>
                  </div>
                  {dailyChallenges.map((challenge) => {
                    const progressPercent = (challenge.progress / challenge.maxProgress) * 100;
                    return (
                      <div
                        key={challenge.id}
                        className={`glass-strong rounded-xl p-6 ${
                          challenge.completed ? 'ring-2 ring-green-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-lg text-gray-900">{challenge.title}</h3>
                              {challenge.completed && <span className="text-green-600">✓</span>}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className={`px-2 py-1 rounded-full ${
                                challenge.type === 'practice' ? 'bg-blue-100 text-blue-700' :
                                challenge.type === 'quiz' ? 'bg-purple-100 text-purple-700' :
                                challenge.type === 'streak' ? 'bg-orange-100 text-orange-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {challenge.type}
                              </span>
                              <span>🎁 {challenge.reward} XP</span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">
                              {challenge.progress} / {challenge.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                challenge.completed ? 'bg-green-500' : 'bg-saffron-500'
                              }`}
                              style={{ width: `${Math.min(progressPercent, 100)}%` }}
                            />
                          </div>
                        </div>
                        <button
                          className={`w-full py-2 rounded-lg font-medium transition-all ${
                            challenge.completed
                              ? 'bg-green-500 text-white'
                              : 'bg-saffron-500 text-white hover:bg-saffron-600'
                          }`}
                          disabled={challenge.completed}
                        >
                          {challenge.completed ? 'Completed ✓' : 'Start Challenge'}
                        </button>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {selectedTab === 'leaderboard' && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="glass-strong rounded-2xl p-6 md:p-8">
                    <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">Global Leaderboard</h2>
                    <div className="space-y-3">
                      {leaderboard.map((entry) => (
                        <div
                          key={entry.rank}
                          className={`glass rounded-lg p-4 flex items-center justify-between ${
                            entry.name === 'You' ? 'ring-2 ring-saffron-500 bg-saffron-50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-2xl font-bold text-gray-400 w-8">
                              {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
                            </div>
                            <div className="text-3xl">{entry.avatar}</div>
                            <div>
                              <div className="font-bold text-gray-900">{entry.name}</div>
                              <div className="text-sm text-gray-600">Level {entry.level}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-saffron-600">{entry.xp.toLocaleString()} XP</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'quiz' && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {currentQuiz === null ? (
                    <div className="glass-strong rounded-2xl p-6 md:p-8 text-center">
                      <h2 className="text-2xl font-display font-bold mb-4 text-gray-900">Quick Quiz</h2>
                      <p className="text-gray-600 mb-6">
                        Test your knowledge of mudras and earn XP for each correct answer!
                      </p>
                      <div className="mb-6">
                        <div className="glass rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-600 mb-2">Quiz Details</p>
                          <p className="font-medium text-gray-900">{quizQuestions.length} Questions</p>
                          <p className="text-sm text-gray-600">50 XP per correct answer</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCurrentQuiz(1)}
                        className="px-8 py-4 bg-saffron-500 text-white rounded-full font-medium hover:bg-saffron-600 transition-colors shadow-sm"
                      >
                        Start Quiz
                      </button>
                    </div>
                  ) : (
                    <div className="glass-strong rounded-2xl p-6 md:p-8">
                      {!showQuizResult ? (
                        <>
                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                              <h2 className="text-2xl font-display font-bold text-gray-900">
                                Question {currentQuiz} of {quizQuestions.length}
                              </h2>
                              <span className="text-sm text-gray-600">
                                Score: {quizScore} / {currentQuiz}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-saffron-500 h-2 rounded-full transition-all"
                                style={{ width: `${(currentQuiz / quizQuestions.length) * 100}%` }}
                              />
                            </div>
                          </div>

                          {quizQuestions
                            .filter(q => q.id === currentQuiz)
                            .map((question) => (
                              <div key={question.id}>
                                <h3 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h3>
                                <div className="space-y-3">
                                  {question.options.map((option, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        handleQuizAnswer(question.id, idx);
                                        setTimeout(() => {
                                          if (currentQuiz < quizQuestions.length) {
                                            setCurrentQuiz(currentQuiz + 1);
                                            setSelectedAnswer(null);
                                          } else {
                                            completeQuiz();
                                          }
                                        }, 1000);
                                      }}
                                      className={`w-full text-left glass rounded-lg p-4 transition-all ${
                                        selectedAnswer === idx
                                          ? idx === question.correct
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                          : 'hover:bg-gray-50'
                                      }`}
                                      disabled={selectedAnswer !== null}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-6xl mb-4">🎉</div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                          <p className="text-xl text-saffron-600 mb-4">
                            You scored {quizScore} / {quizQuestions.length}
                          </p>
                          <p className="text-gray-600 mb-6">
                            You earned {quizScore * 50} XP!
                          </p>
                          <button
                            onClick={() => {
                              setCurrentQuiz(null);
                              setQuizScore(0);
                              setSelectedAnswer(null);
                              setShowQuizResult(false);
                            }}
                            className="px-6 py-3 bg-saffron-500 text-white rounded-full font-medium hover:bg-saffron-600 transition-colors"
                          >
                            Take Another Quiz
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

