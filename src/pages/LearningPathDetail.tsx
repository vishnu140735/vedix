import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'practice' | 'quiz' | 'reading';
  completed: boolean;
  mudras?: string[];
}

const learningPathsData: Record<number, {
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
}> = {
  1: {
    title: 'Beginner\'s Journey',
    description: 'Start your journey with fundamental mudras and basic techniques',
    duration: '4 weeks',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Mudras',
        description: 'Learn the basics of hand gestures and their significance',
        duration: '15 min',
        type: 'reading',
        completed: false,
      },
      {
        id: 2,
        title: 'Anjali Mudra - The Prayer Gesture',
        description: 'Master the most common mudra used in greetings and prayers',
        duration: '20 min',
        type: 'practice',
        completed: false,
        mudras: ['Anjali Mudra'],
      },
      {
        id: 3,
        title: 'Abhaya Mudra - Fearlessness',
        description: 'Learn the gesture of protection and fearlessness',
        duration: '20 min',
        type: 'practice',
        completed: false,
        mudras: ['Abhaya Mudra'],
      },
      {
        id: 4,
        title: 'Chin Mudra - Consciousness',
        description: 'Practice the meditation gesture for inner peace',
        duration: '25 min',
        type: 'practice',
        completed: false,
        mudras: ['Chin Mudra'],
      },
      {
        id: 5,
        title: 'Quiz: Basic Mudras',
        description: 'Test your knowledge of the fundamental mudras',
        duration: '10 min',
        type: 'quiz',
        completed: false,
      },
    ],
  },
  2: {
    title: 'Intermediate Mastery',
    description: 'Deepen your understanding with complex gestures and sequences',
    duration: '6 weeks',
    lessons: [
      {
        id: 1,
        title: 'Dhyana Mudra - Deep Meditation',
        description: 'Master the meditation gesture for concentration',
        duration: '25 min',
        type: 'practice',
        completed: false,
        mudras: ['Dhyana Mudra'],
      },
      {
        id: 2,
        title: 'Varada Mudra - Compassion',
        description: 'Learn the gesture of granting wishes and compassion',
        duration: '25 min',
        type: 'practice',
        completed: false,
        mudras: ['Varada Mudra'],
      },
      {
        id: 3,
        title: 'Mudra Sequences',
        description: 'Practice combining multiple mudras in sequences',
        duration: '30 min',
        type: 'practice',
        completed: false,
        mudras: ['Anjali Mudra', 'Abhaya Mudra', 'Dhyana Mudra'],
      },
      {
        id: 4,
        title: 'Advanced Techniques',
        description: 'Learn advanced hand positioning and transitions',
        duration: '35 min',
        type: 'video',
        completed: false,
      },
    ],
  },
  3: {
    title: 'Advanced Performance',
    description: 'Master advanced techniques and prepare for performances',
    duration: '8 weeks',
    lessons: [
      {
        id: 1,
        title: 'Vitarka Mudra - Teaching',
        description: 'Master the gesture of intellectual discussion',
        duration: '30 min',
        type: 'practice',
        completed: false,
        mudras: ['Vitarka Mudra'],
      },
      {
        id: 2,
        title: 'Performance Preparation',
        description: 'Learn how to prepare for mudra performances',
        duration: '40 min',
        type: 'video',
        completed: false,
      },
      {
        id: 3,
        title: 'Complex Sequences',
        description: 'Practice advanced mudra combinations',
        duration: '45 min',
        type: 'practice',
        completed: false,
        mudras: ['All Mudras'],
      },
    ],
  },
  4: {
    title: 'Storytelling Through Dance',
    description: 'Learn to narrate stories like Sita Swayamvar through mudras',
    duration: '10 weeks',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Storytelling',
        description: 'Learn how mudras tell stories',
        duration: '20 min',
        type: 'reading',
        completed: false,
      },
      {
        id: 2,
        title: 'Sita Swayamvar - Chapter 1',
        description: 'Begin the epic tale through mudras',
        duration: '30 min',
        type: 'practice',
        completed: false,
        mudras: ['Anjali Mudra', 'Abhaya Mudra'],
      },
      {
        id: 3,
        title: 'Sita Swayamvar - Chapter 2',
        description: 'Continue the story with new gestures',
        duration: '30 min',
        type: 'practice',
        completed: false,
        mudras: ['Vitarka Mudra', 'Varada Mudra'],
      },
      {
        id: 4,
        title: 'Complete Story Performance',
        description: 'Perform the full Sita Swayamvar story',
        duration: '45 min',
        type: 'practice',
        completed: false,
        mudras: ['All Mudras'],
      },
    ],
  },
};

export default function LearningPathDetail() {
  const { id } = useParams<{ id: string }>();
  const pathId = id ? parseInt(id, 10) : 1;
  const pathData = learningPathsData[pathId];
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  if (!pathData) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Learning Path Not Found</h1>
          <Link
            to="/learning-paths"
            className="px-6 py-3 bg-saffron-500 text-white rounded-full font-medium hover:bg-saffron-600 transition-colors"
          >
            Back to Learning Paths
          </Link>
        </div>
      </div>
    );
  }

  const completedLessons = pathData.lessons.filter(l => l.completed).length;
  const progress = (completedLessons / pathData.lessons.length) * 100;

  return (
    <>
      <SEO 
        title={`${pathData.title} - VEDIX`}
        description={pathData.description}
      />
      <div className="min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/learning-paths"
              className="inline-flex items-center text-saffron-600 hover:text-saffron-700 mb-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Learning Paths
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 text-gradient">
              {pathData.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{pathData.description}</p>
            
            {/* Progress Bar */}
            <div className="glass-strong rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-gray-700">
                  {completedLessons} / {pathData.lessons.length} lessons
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-saffron-500 to-gold-500 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {pathData.lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-xl overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedLesson(selectedLesson === lesson.id ? null : lesson.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        lesson.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-saffron-100 text-saffron-600'
                      }`}>
                        {lesson.completed ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-display font-bold text-gray-900">
                            {lesson.title}
                          </h3>
                          {lesson.completed && (
                            <span className="text-green-600 text-sm">✓ Completed</span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{lesson.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>⏱️ {lesson.duration}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            lesson.type === 'practice' ? 'bg-blue-100 text-blue-700' :
                            lesson.type === 'quiz' ? 'bg-purple-100 text-purple-700' :
                            lesson.type === 'video' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {lesson.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {lesson.type === 'practice' ? (
                        <Link
                          to="/practice"
                          className="px-4 py-2 bg-saffron-500 text-white rounded-lg font-medium hover:bg-saffron-600 transition-colors text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Practice
                        </Link>
                      ) : lesson.type === 'quiz' ? (
                        <Link
                          to="/gamified-learning?tab=quiz"
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Take Quiz
                        </Link>
                      ) : lesson.type === 'reading' ? (
                        <Link
                          to="/library"
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Read
                        </Link>
                      ) : (
                        <button
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert('Video lesson coming soon!');
                          }}
                        >
                          Watch
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedLesson === lesson.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-gray-200"
                    >
                      <div className="p-6 bg-gray-50">
                        <h4 className="font-bold text-gray-900 mb-3">Lesson Details</h4>
                        <p className="text-gray-700 mb-4">{lesson.description}</p>
                        {lesson.mudras && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Mudras in this lesson:</p>
                            <div className="flex flex-wrap gap-2">
                              {lesson.mudras.map((mudra, idx) => (
                                <Link
                                  key={idx}
                                  to="/library"
                                  className="px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm font-medium hover:bg-saffron-200 transition-colors"
                                >
                                  {mudra}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="mt-4 flex gap-3">
                          {lesson.type === 'practice' && (
                            <Link
                              to="/practice"
                              className="px-6 py-2 bg-saffron-500 text-white rounded-lg font-medium hover:bg-saffron-600 transition-colors"
                            >
                              Start Practice
                            </Link>
                          )}
                          {lesson.type === 'quiz' && (
                            <Link
                              to="/gamified-learning?tab=quiz"
                              className="px-6 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                            >
                              Start Quiz
                            </Link>
                          )}
                          {lesson.type === 'reading' && (
                            <Link
                              to="/library"
                              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                            >
                              Read More
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

