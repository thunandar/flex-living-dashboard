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
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Flex Living</h1>
          <p className="text-sm text-gray-600">Reviews Dashboard</p>
        </div>
        
        <nav className="mt-6">
          <Link 
            href="/dashboard" 
            onClick={() => setIsOpen(false)}
            className="block py-3 px-6 bg-flex/10 text-flex border-r-4 border-flex"
          >
            📊 Dashboard
          </Link>
          <Link 
            href="/property" 
            onClick={() => setIsOpen(false)}
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
    </>
  );
}