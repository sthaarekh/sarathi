import React from 'react';
import img from '../assets/contacts.webp'
const Contacts = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F5F7FA] py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
              Contact Us
            </h2>

            <form className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="yourname@company.com"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Type your comment or message"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#4CAF4F] px-4 py-3 text-base font-medium text-white hover:bg-[#409f43] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Send
              </button>
            </form>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center items-center">
            <img
              src={img}
              alt="Image failed to load"
              className="hidden md:block w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
