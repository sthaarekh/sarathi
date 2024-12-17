import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#F5F7FA] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center md:justify-center justify-between">
        <div className="flex items-center">
          <img
            className="h-8 w-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Lgog.svg"
            alt=""
            />

          <div className="hidden mx-[300px] md:block">
            <a href="/" className="mx-6 text-gray-500 hover:text-gray-900">
              Home
            </a>
            <a href="/clubs" className="mx-6 text-gray-500 hover:text-gray-900">
              Clubs
            </a>
            <a href="/contacts" className="mx-6 text-gray-500 hover:text-gray-900">
              Contact
            </a>
          </div>

        </div>

        <div className="flex items-center">
          <div className="hidden md:block">
            <a href="/login"
              className="bg-[#4CAF4F] hover:bg-[#409f43] text-white font-medium py-2 px-4 rounded mr-2">
              Login
            </a>
            <a href="/register"
              className="bg-[#4CAF4F] hover:bg-[#409f43] text-white font-medium py-2 px-4 rounded">
              Register
            </a>
          </div>
          <button
            className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)} >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-2 px-4">
          <a href="/" className="block text-gray-500 hover:text-gray-900 py-2">
            Home
          </a>
          <a href="/clubs" className="block text-gray-500 hover:text-gray-900 py-2">
            Clubs
          </a>
          <a href="/contact"
            className="block text-gray-500 hover:text-gray-900 py-2">
            Contact
          </a>
          <a href="/login"
            className="block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mb-2">
            Login
          </a>
          <a href="/register"
            className="block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            Register
          </a>
        </div>
      )}

    </nav>
  );
};

export default Navbar;