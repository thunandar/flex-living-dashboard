import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 bg-white p-2 rounded-lg shadow-lg border border-gray-200"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-56 lg:w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 lg:p-6 border-b">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg lg:text-xl font-bold text-gray-800">Flex Living</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs lg:text-sm text-gray-600">Reviews Dashboard</p>
        </div>
        
        <nav className="mt-4 lg:mt-6">
          <Link 
            href="/dashboard" 
            onClick={() => setIsOpen(false)}
            className="block py-2.5 lg:py-3 px-4 lg:px-6 bg-flex/10 text-flex border-r-4 border-flex text-sm lg:text-base"
          >
            📊 Dashboard
          </Link>
          <Link 
            href="/property" 
            onClick={() => setIsOpen(false)}
            className="block py-2.5 lg:py-3 px-4 lg:px-6 text-gray-600 hover:bg-gray-50 text-sm lg:text-base"
          >
            🏠 Property Views
          </Link>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 lg:p-6 border-t">
          <div className="text-xs text-gray-500">
            Account ID: 61148
          </div>
        </div>
      </div>
    </>
  );
}