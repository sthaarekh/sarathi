import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#263238] text-gray-300 py-10 flex justify-center items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[30%_30%_40%] gap-8 px-10">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-start px-10">
          {/* Logo */}
          <div className="mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
              className="h-8 w-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Lgog.svg"
              alt="Logo"
              />
            </div>
          </div>
          <p className="text-sm mb-3">Copyright © 2024 Sarathi Ltd.</p>
          <p className="text-sm">All rights reserved</p>
          {/* Social Icons */}
          <div className="flex mt-4 space-x-4">
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Dribbble" className="hover:text-white">
              <i className="fab fa-dribbble"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Company Section */}
        <div className="pl-20">
          <h3 className="text-xl text-white mb-4">Company</h3>
          <ul>
            <li className="mb-3">
              <a href="#" className="hover:text-white">
                About us
              </a>
            </li>
            <li>
              <a href="/contacts" className="hover:text-white">
                Contact us
              </a>
            </li>
          </ul>
        </div>

        {/* Stay Up to Date */}
        <div className="px-10">
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
