import SEO from '../components/SEO';

const mentors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    expertise: 'Bharatanatyam & Mudras',
    experience: '25 years',
    rating: 4.9,
    students: 1200,
    avatar: '👩‍🏫',
    available: true,
  },
  {
    id: 2,
    name: 'Guru Rajesh Kumar',
    expertise: 'Classical Dance & Theory',
    experience: '30 years',
    rating: 4.8,
    students: 950,
    avatar: '👨‍🏫',
    available: true,
  },
  {
    id: 3,
    name: 'Meera Devi',
    expertise: 'Storytelling Through Dance',
    experience: '20 years',
    rating: 4.9,
    students: 800,
    avatar: '👩‍🎨',
    available: false,
  },
];

const communities = [
  { name: 'Beginner Dancers', members: 2500, icon: '🌱' },
  { name: 'Advanced Performers', members: 1200, icon: '⭐' },
  { name: 'Teachers & Mentors', members: 350, icon: '👨‍🏫' },
  { name: 'Cultural Enthusiasts', members: 5000, icon: '🎭' },
];

export default function Mentors() {
  return (
    <>
      <SEO 
        title="Mentor Space - VEDIX"
        description="Connect with expert mentors for remote teaching and join vibrant dance communities"
      />
      <div className="min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 text-gradient">
              Mentor Space
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from expert mentors and build connections in vibrant communities
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-gray-900">
              Expert Mentors
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="glass-strong rounded-2xl p-6 text-center"
                >
                  <div className="text-6xl mb-4">{mentor.avatar}</div>
                  <h3 className="text-xl font-display font-bold mb-2 text-gray-900">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{mentor.expertise}</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium text-gray-900">{mentor.rating}</span>
                    <span className="text-gray-500">({mentor.students} students)</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    {mentor.experience} of experience
                  </div>
                  <button
                    className={`w-full py-3 rounded-full font-medium transition-all ${
                      mentor.available
                        ? 'bg-saffron-500 text-white hover:bg-saffron-600'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    } shadow-sm`}
                    disabled={!mentor.available}
                  >
                    {mentor.available ? 'Book Session' : 'Unavailable'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-gray-900">
              Communities & Clubs
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {communities.map((community, index) => (
                <div
                  key={index}
                  className="glass-strong rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-3">{community.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{community.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{community.members.toLocaleString()} members</p>
                  <button className="w-full py-2 bg-saffron-500 text-white rounded-lg text-sm font-medium hover:bg-saffron-600 transition-colors">
                    Join Community
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

