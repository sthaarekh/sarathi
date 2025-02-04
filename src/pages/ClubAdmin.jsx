import React, { useState, useRef, useContext, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Camera, Edit2, ImagePlus, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import profilepic from '../assets/profilepic.webp';
import SarathiContext from '../context/SarathiContext';

const Club = () => {
  const [postText, setPostText] = useState('');
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedTeamMember, setSelectedTeamMember] = useState(0);
  const context = useContext(SarathiContext);
  const {clubs, fetchClubs} = context;

  useEffect(() => {
    fetchClubs();
    // eslint-disable-next-line
  }, []);

  const teamMembers = [
    {
      name: 'Risham Raj',
      role: 'President',
      description: 'I am thrilled to be the president of KUCC and would like to share the knowledge forward.',
      image: 'src/assets/pic2.webp'
    },
    {
      name: 'Saimon Neupane',
      role: 'Vice President',
      description: 'Working towards making KUCC a platform for innovative learning and technical growth.',
      image: 'src/assets/saimon.webp'
    },
    {
      name: 'Arekh Shrestha',
      role: 'Secretary',
      description: 'Committed to organizing impactful events and maintaining smooth club operations.',
      image: 'src/assets/pic1.webp'
    }
    
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const handleCreatePost = () => {
    console.log('Creating post:', { text: postText, file: selectedFileName });
    setPostText('');
    setSelectedFileName('');
  };

  // Sample posts data
  const posts = [
    {
      id: 1,
      title: 'IT Meet 2024',
      description: 'Innovate, Inspire, Impact! With the IT Meet 2024 we are planning to push the boundaries of what we can achieve with the events',
      image: '/api/placeholder/600/300'
    },
    {
      id: 2,
      title: 'Recent Workshop',
      description: 'Innovate, Inspire, Impact!',
      image: '/api/placeholder/600/300'
    }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Kathmandu University Computer Club</h1>
            <p className="text-gray-600">Department of Computer Science</p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto mb-6 flex justify-center md:justify-end">
            <button className="px-4 py-2 text-white rounded-lg bg-[#4CAF4F] hover:bg-[#409f43] flex items-center">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="https://www.facebook.com/kucc1997" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-700 transition-colors" />
            </a>
            <a href="https://www.instagram.com/kucc97/" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 text-pink-600 hover:text-pink-700 transition-colors" />
            </a>
            <a href="https://twitter.com/kucc" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://linkedin.com/company/kucc" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-blue-700 hover:text-blue-800 transition-colors" />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {/* About Us Section */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About Us</h2>
            <p className="text-gray-700 mb-4">
              The University Computer Club (KUCC) was established in 1997. As a hub for students 
              from the Department of Computer Science, we organize various technical workshops, 
              hackathons, and skill development programs. Our mission is to foster technological 
              innovation and create a collaborative learning environment.
            </p>
            
            {/* Meet Our Team Section */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Meet Our Team</h3>
            <div className="space-y-4">
              {/* Team Member Photos */}
              <div className="flex flex-wrap gap-2 mb-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedTeamMember === index ? 'transform scale-110' : ''
                    }`}
                    onClick={() => setSelectedTeamMember(index)}
                  >
                    <img 
                      src={member.image}
                      alt={member.role}
                      className={`w-12 h-12 rounded-full border-2 ${
                        selectedTeamMember === index ? 'border-[#4CAF4F]' : 'border-transparent'
                      }`}
                    />
                  </div>
                ))}
              </div>
              
              {/* Selected Team Member Info */}
              <div className="text-left">
                <p className="font-medium text-[#4CAF4F]">{teamMembers[selectedTeamMember].name}</p>
                <p className="font-medium text-gray-600">{teamMembers[selectedTeamMember].role}</p>
                <p className="text-sm text-gray-600 mt-1">{teamMembers[selectedTeamMember].description}</p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-6 pt-6  border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <p>+977 1234567890</p>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <p>kucc@ku.edu.np</p>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <p>Dhulikhel, Kavre, Nepal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Updates Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Updates</h2>
              
              {/* Post Creation Section */}
              <div className="border rounded-lg p-3 md:p-4 mb-6">
                <div className="flex items-start space-x-3 mb-3">
                  <img 
                    src={profilepic}  
                    alt="Admin" 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      placeholder="Share an update..."
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#4CAF4F] text-sm md:text-base"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 px-2 md:px-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      accept="image/*"
                    />
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="p-1.5 md:p-2 text-gray-600 hover:text-[#4CAF4F] rounded-lg flex items-center"
                      title="Attach photo"
                    >
                      <ImagePlus className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="ml-1 text-sm hidden md:inline">Photo</span>
                    </button>
                    {selectedFileName && (
                      <span className="text-xs md:text-sm text-gray-600 truncate max-w-[150px] md:max-w-xs">
                        {selectedFileName}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={handleCreatePost}
                    className="px-3 md:px-4 py-1.5 md:py-2 text-white rounded-lg bg-[#4CAF4F] hover:bg-[#409f43] text-sm md:text-base"
                  >
                    Post
                  </button>
                </div>
              </div>

              {/* Event Cards */}
              {posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={profilepic} 
                        alt="Event" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">Kathmandu University Computer Club</h3>
                        <p className="text-sm text-gray-500">{post.description}</p>
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-gray-800">
                      <span className="text-xl">...</span>
                    </button>
                  </div>
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
