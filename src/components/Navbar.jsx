import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);  // Update based on your auth logic
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userProfilePic='https://www.w3schools.com/w3images/avatar2.png';
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-[#F5F7FA] py-4">
      {/* For desktop screen */}
      <div className="hidden md:flex justify-between items-center px-4">
        <div className="flex items-center ml-[100px]">
          <img
            className="h-8 w-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Lgog.svg"
            alt="Logo"
          />
        </div>

        <div className="flex justify-center">
          <div className="grid grid-flow-col gap-[40px] lg:gap-[70px] xl:gap-[80px]">
            <Link to="/" className="text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link to="/clubs" className="text-gray-500 hover:text-gray-900">
              Clubs
            </Link>
            <Link to="/contacts" className="text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center mr-[100px]">
          <div className="grid grid-flow-col gap-3 lg:gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center bg-gray-200 rounded-full p-2"
                >
                  <img
                    src={userProfilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-50 right-0 mt-2 bg-white shadow-md rounded-md w-40">
                    <Link
                      to="/clubadmin/678f4c06c1c80b6518063f85"
                      className="block text-gray-500 hover:text-gray-900 py-2 px-4"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-gray-500 hover:text-gray-900 py-2 px-4 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-[#4CAF4F] hover:bg-[#409f43] text-white font-medium py-2 px-4 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#4CAF4F] hover:bg-[#409f43] text-white font-medium py-2 px-4 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* For mobile screen */}
      <div className="md:hidden flex items-center justify-between px-4">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <img
            className="h-8 w-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Lgog.svg"
            alt="Logo"
          />
        </div>

        {/* Right Section: Button */}
        <div>
          <button
            className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
          <Link to="/" className="block text-gray-500 hover:text-gray-900 py-2">
            Home
          </Link>
          <Link to="/clubs" className="block text-gray-500 hover:text-gray-900 py-2">
            Clubs
          </Link>
          <Link to="/contacts" className="block text-gray-500 hover:text-gray-900 py-2">
            Contact
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/clubadmin/678f4c06c1c80b6518063f85"
                className="block text-gray-500 hover:text-gray-900 py-2"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block text-gray-500 hover:text-gray-900 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded mb-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
