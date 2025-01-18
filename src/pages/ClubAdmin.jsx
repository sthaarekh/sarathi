import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Camera, Edit2 } from 'lucide-react';
import profilepic from '../assets/profilepic.webp';

const Club = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo Section */}
      <div className="relative h-64 bg-gray-300">
        <img
          src="/api/placeholder/1200/400" 
          alt="Cover" 
          className="w-full h-64 object-cover"
        />
        <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
          <Camera className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative -mt-20 mb-4 flex flex-col md:flex-row md:items-end">
          <div className="relative mx-auto md:mx-0">
            <img 
              src={profilepic} 
              alt="Profile" 
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 mb-6 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Kathmandy University Computer Club</h1>
            <p className="text-gray-600">Department of Computer Science</p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto mb-6 flex justify-center md:justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex justify-center md:justify-start space-x-6">
            <Facebook className="w-6 h-6 text-blue-600 cursor-pointer" />
            <Instagram className="w-6 h-6 text-pink-600 cursor-pointer" />
            <Twitter className="w-6 h-6 text-blue-400 cursor-pointer" />
            <Linkedin className="w-6 h-6 text-blue-700 cursor-pointer" />
          </div>
        </div>

        {/* Main Content */}
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            {/* About Us Section - Takes up 1/3 of space */}
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Us</h2>
              <p className="text-gray-700 mb-4">
                The University Computer Club (UCC) was established in 1997. As a hub for students 
                from the Department of Computer Science, we organize various technical workshops, 
                hackathons, and skill development programs.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Meet Our Team</h3>
              <div className="flex space-x-4">
                <div className="text-center">
                  <img 
                    src="/api/placeholder/48/48" 
                    alt="Team Member" 
                    className="w-12 h-12 rounded-full mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600">President</p>
                  <p className="text-sm text-gray-600">I am thrilled to be the president of KUCC and would like to share the knowledge forward.</p>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+977 1234567890</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Updates</h2>
                
                {/* Event Card */}
                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/api/placeholder/40/40" 
                        alt="Event" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">IT Meet 2024</h3>
                        <p className="text-sm text-gray-500">Innovate, Inspire, Impact!</p>
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm">...</button>
                  </div>
                  <img 
                    src="/api/placeholder/600/300" 
                    alt="Event Banner" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/api/placeholder/40/40" 
                        alt="Event" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">IT Meet 2024</h3>
                        <p className="text-sm text-gray-500">Innovate, Inspire, Impact!</p>
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm">...</button>
                  </div>
                  <img 
                    src="/api/placeholder/600/300" 
                    alt="Event Banner" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
              </div>
            </div>
          </div>
      
      </div>
    </div>
  );
};

export default Club;