import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-24">
      <div className="text-center max-w-2xl">
        <div className="text-9xl font-display font-bold mb-4 text-gradient">
          404
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-saffron-600">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-saffron-500 text-white rounded-full text-lg font-medium hover:bg-saffron-600 transition-all shadow-sm"
          >
            Go Home
          </Link>
          <Link
            to="/library"
            className="px-8 py-4 bg-white text-saffron-600 border-2 border-saffron-500 rounded-full text-lg font-medium hover:bg-saffron-50 transition-all"
          >
            Browse Library
          </Link>
        </div>
      </div>
    </div>
  );
}

