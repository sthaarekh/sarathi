import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllClubs } from "../utils/api";
import AuthContext from "../context/AuthContext";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [club, setClubs] = useState();
  const { auth, logoutUser } = useContext(AuthContext); // Access auth and logoutUser from context
  const [myClub, setMyClub] = useState(null);

  const handleLogout = () => {
    logoutUser(); // Call logoutUser to clear cookies and update auth state
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubs = await getAllClubs();
        const myClub = clubs.data.data.clubs.find(
          (club) => String(club.admin) === String(auth.userId)
        );
        setMyClub(myClub);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchData();
  }, [auth.userId]);

  return (
    <nav className="bg-[#F5F7FA] py-4">
      {/* For desktop screen */}
      <div className="hidden md:flex justify-between items-center px-4">
        <div className="flex items-center ml-[100px]">
          <img
            className="h-8 w-auto"
            src="/src/assets/logos/Logo.svg"
            alt="Logo"
          />
          <p className="text-xl font-medium text-gray-500 ml-2 font-smarkan">
            Sarathi
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-flow-col gap-[40px] lg:gap-[70px] xl:gap-[80px]">
            <Link to="/" className="text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link to="/clubs" className="text-gray-500 hover:text-gray-900">
              Clubs
            </Link>
            <Link to="/about" className="text-gray-500 hover:text-gray-900">
              About Us
            </Link>
          </div>
        </div>

        <div className="flex items-center mr-[100px]">
          <div className="grid grid-flow-col gap-3 lg:gap-4">
            {auth.token ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center p-2 bg-gray-200 rounded-full"
                >
                  {myClub && myClub.profilePicture ? (
                    <img
                      src={myClub.profilePicture}
                      alt="Profile"
                      className="w-9 h-9 rounded-full"
                    />
                  ) : (
                    <img
                      src="src/assets/icons/user.png" 
                      alt="Default Profile"
                      className="w-9 h-9 rounded-full"
                    />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-50 right-0 mt-2 bg-white shadow-md rounded-md w-40">
                    {auth.isMainAdmin ? (
                      <Link
                        to="/admin"
                        className="block text-gray-500 hover:text-gray-900 py-2 px-4"
                      >
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/clubadmin"
                        className="block text-gray-500 hover:text-gray-900 py-2 px-4"
                      >
                        My Profile
                      </Link>
                    )}
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
          <Link
            to="/clubs"
            className="block text-gray-500 hover:text-gray-900 py-2"
          >
            Clubs
          </Link>
          <Link
            to="/about"
            className="block text-gray-500 hover:text-gray-900 py-2"
          >
            About Us
          </Link>
          {auth.token ? (
            <>
              {auth.isMainAdmin ? (
                // Main Admin navigation
                <Link
                  to="/admin"
                  className="block text-gray-500 hover:text-gray-900 py-2"
                >
                  Admin Dashboard
                </Link>
              ) : (
                // Club Admin navigation
                <Link
                  to="/clubadmin"
                  className="block text-gray-500 hover:text-gray-900 py-2"
                >
                  My Profile
                </Link>
              )}
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
