import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Flex Living Reviews
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Professional Reviews Dashboard for Property Management
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link 
            href="/dashboard"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            🏠 Manager Dashboard
          </Link>
          
          <Link 
            href="/property"
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            🌐 Public Property Page
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4">
              <h3 className="font-semibold mb-2">📊 Analytics</h3>
              <p className="text-gray-600">Track performance metrics and trends</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">✅ Review Moderation</h3>
              <p className="text-gray-600">Approve reviews for public display</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">🔍 Insights</h3>
              <p className="text-gray-600">Identify recurring issues and opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}