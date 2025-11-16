import Link from 'next/link';

export function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Flex Living</h1>
        <p className="text-sm text-gray-600">Reviews Dashboard</p>
      </div>
      
      <nav className="mt-6">
        <Link 
          href="/dashboard" 
          className="block py-3 px-6 bg-flex/10 text-flex border-r-4 border-flex"
        >
          📊 Dashboard
        </Link>
        <Link 
          href="/property" 
          className="block py-3 px-6 text-gray-600 hover:bg-gray-50"
        >
          🏠 Property Views
        </Link>
      </nav>
      
      <div className="absolute bottom-0 w-full p-6 border-t">
        <div className="text-xs text-gray-500">
          Account ID: 61148
        </div>
      </div>
    </div>
  );
}