import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#263238] text-gray-300 py-10 flex justify-center items-center">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-10">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-start">
          {/* Logo */}
          <div className="mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                className="h-8 w-auto"
                src="/src/assets/logos/Logo.svg"
                alt="Logo"
              />
            </div>
          </div>
          <p className="text-sm mb-3">Copyright © 2024 Sarathi Ltd.</p>
          <p className="text-sm">All rights reserved</p>
          {/* Social Icons */}
          <div className="flex mt-4 space-x-4">
            <Link to="#" aria-label="Instagram" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="#" aria-label="Twitter" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="https://github.com/sthaarekh/sarathi" aria-label="Github" className="hover:text-white" target="_blank">
              <i className="fab fa-github"></i>
            </Link>
          </div>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-xl text-white mb-4">Company</h3>
          <ul>
            <li className="mb-3">
              <Link to="/about" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:text-white">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        {/* Stay Up to Date */}
        <div>
          <h3 className="font-semibold text-xl text-white mb-4">Stay up to date</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 text-gray-900 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-[#D9DBE1] rounded-r-md hover:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2 12l18-9v18L2 12z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
