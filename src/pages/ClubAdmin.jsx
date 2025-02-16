import React, { useState, useRef,useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Camera, Edit2, ImagePlus, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from "framer-motion";
import Edit from "../components/Edit.jsx";
import { useParams } from "react-router-dom";
import { getAllClubs, getAllNotices, uploadNotice } from "../utils/api";
import Loading from "../components/Loading";
import useAuth from "../context/Hook/useAuth.js";

const Club = () => {
  const { clubId } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedTeamMember, setSelectedTeamMember] = useState(0);
  const [club, setClub] = useState({});
  const [notices, setNotices] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [postText, setPostText] = useState();
  const [selectedFileName, setSelectedFileName] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);
  
  const { auth } = useAuth();
  // const { id } = useParams();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
  
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
  
      // Cleanup previous preview
      return () => URL.revokeObjectURL(url);
    }
  };
  
  const handleCreatePost = async () => {
    if (!postText.trim() && !selectedFile) {
      alert("Post cannot be empty.");
      return;
    }
  
    console.log("Post text:", postText);
    console.log("Selected file:", selectedFile);
  
    // Prepare form data
    const formData = new FormData();
    formData.append("description", postText);
    if (selectedFile) {
      formData.append("images", selectedFile);
    }
    console.log(formData)
    try {
      // Send notice to backend
      const response = await uploadNotice(club._id, formData);
      console.log("Post uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  
    // Reset form
    setPostText("");
    setSelectedFile(null);
    setSelectedFileName("");
    setPreviewUrl("");
    setIsExpanded(false);
  };
  const handleClick = () => {
    setIsExpanded(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(" club admin object id is :" + auth.userId);

        const clubs = await getAllClubs();
        console.log(clubs);
        console.log("the club  id is ", clubId);

        const myClub = clubs.data.data.clubs.find(
          (club) => String(club.admin) === String(auth.userId)
        );
        console.log(`The respective club is ${myClub}`);
        const clubEyeDee = String(myClub._id);
        console.log("the club id for the user is :" + clubEyeDee);
        const notices = await getAllNotices(clubEyeDee);
        console.log("notices are ", notices);
        setNotices(notices.data.data);

        const club = clubs.data.data.clubs.find(
          (club) => String(club._id) === clubEyeDee
        );
        console.log("the club data is ", club);
        setClub(club);
        console.log("team members are ", Object.values(club.ourTeam));
        if (club) {
          setTeamMembers(Object.values(club.ourTeam));
        } else {
          console.warn("Club not found for ID:", clubId);
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clubId]);

  if (loading) return <Loading />;


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}>
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo Section */}
      <div className="relative h-64 bg-gray-300">
        <img
          src={club.coverPicture}
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
            <img src={club.profilePicture} alt="Profile" className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"/>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 mb-6 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
            <p className="text-gray-600">{club.department}</p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto mb-6 flex justify-center md:justify-end">
            <button onClick={() => setIsPopupOpen(true)} className="px-4 py-2 text-white rounded-lg bg-[#4CAF4F] hover:bg-[#409f43] flex items-center">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
              {/* Show the Popup Only When Button is Clicked */}
              {isPopupOpen && <Edit id={club._id} onClose={() => setIsPopupOpen(false)} />}
          </div>
          </div>
        

        {/* Social Links */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex justify-center md:justify-start space-x-6">
            <a href={club.contact.facebook} target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-700 transition-colors" />
            </a>
            <a href={club.contact.insta} target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 text-pink-600 hover:text-pink-700 transition-colors" />
            </a>
            <a href={club.contact.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-500 transition-colors" />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-8">
          {/* About Us Section */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About Us</h2>
            <p className="text-gray-700 mb-4">
              {club.description}
            </p>
            
            {/* Meet Our Team Section */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Meet Our Team</h3>
            <div className="space-y-4">
              {/* Team Member Photos */}
              <div className="flex flex-wrap gap-2 mb-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className={`cursor-pointer transition-all duration-300 ${selectedTeamMember === index ? 'transform scale-110' : ''}`}
                    onClick={() => setSelectedTeamMember(index)}>
                    <img src={member.image} alt={member.role} className={`w-12 h-12 rounded-full border-2 ${selectedTeamMember === index ? 'border-[#4CAF4F]' : 'border-transparent'}`}/>
                  </div>
                ))}
              </div>
              
              {/* Selected Team Member Info */}
              <div className="text-left">
                <p className="font-medium text-[#4CAF4F]">{teamMembers[selectedTeamMember].name}</p>
                <p className="font-medium text-gray-600">{teamMembers[selectedTeamMember].post}</p>
                <p className="text-sm text-gray-600 mt-1">{teamMembers[selectedTeamMember].description}</p>
              </div>
            </div>
            
            {/* Contact Section */}
           <div className="mt-6 pt-6  border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <p>+977 {club.contact.phone}</p>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <p>{club.contact.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Updates Section */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Updates</h2>
              
              {/* Post Creation Section */}
              <div className="w-full max-w-2xl mx-auto">
                <div className="border rounded-lg p-3 md:p-4 mb-6 bg-white shadow-sm">
                  {!isExpanded ? (
                    <div className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50" onClick={handleClick}>
                      <div className="flex items-center space-x-3">
                        <img src={club.profilePicture} alt="Profile" className="w-8 h-8 md:w-10 md:h-10 rounded-full"/>
                        <div className="text-gray-500">Share an update...</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start space-x-3 mb-3">
                        <img src={club.profilePicture} alt="Profile" className="w-8 h-8 md:w-10 md:h-10 rounded-full"/>
                        <div className="flex-grow">
                          <textarea
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#4CAF4F] text-sm md:text-base min-h-[100px]"
                          />
                        </div>
                      </div>

                      {previewUrl && (
                        <div className="mb-3 px-11">
                          <div className="relative">
                            <img src={previewUrl} alt="Preview" className="max-h-60 rounded-lg object-cover"/>
                            <button
                              onClick={() => {
                                setPreviewUrl('');
                                setSelectedFile(null);
                                setSelectedFileName('');
                              }}
                              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70">
                              ×
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2 px-2 md:px-3">
                        <div className="flex items-center space-x-2">
                          <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*"/>
                          <button onClick={() => fileInputRef.current.click()} className="p-1.5 md:p-2 text-gray-600 hover:text-[#4CAF4F] rounded-lg flex items-center" title="Attach photo">
                            <ImagePlus className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="ml-1 text-sm hidden md:inline">Photo</span>
                          </button>
                          {selectedFileName && (
                            <span className="text-xs md:text-sm text-gray-600 truncate max-w-[150px] md:max-w-xs">
                              {selectedFileName}
                            </span>
                          )}
                        </div>
                        <div className="space-x-2">
                          <button onClick={() => setIsExpanded(false)} className="px-3 md:px-4 py-1.5 md:py-2 text-gray-600 rounded-lg border hover:bg-gray-50 text-sm md:text-base">
                            Cancel
                          </button>
                          <button onClick={handleCreatePost} className="px-3 md:px-4 py-1.5 md:py-2 text-white rounded-lg bg-[#4CAF4F] hover:bg-[#409f43] text-sm md:text-base">
                            Post
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Event Cards */}
              {notices.slice().reverse().map((post) => (
                <div key={post.id} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img src={club.profilePicture} alt="Event" className="w-10 h-10 rounded-full"/>
                      <div>
                        <h3 className="font-medium">{club.name}</h3>
                        <p className="text-sm text-gray-500">{post.description}</p>
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-gray-800">
                      <span className="text-xl">...</span>
                    </button>
                  </div>
                  <img src={post.image} alt={post.title} className="w-full h-800 object-cover rounded-lg mb-4"/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Club;
