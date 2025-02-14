import React, { useState, useRef, useEffect } from "react";
import { Facebook, Instagram, Linkedin, Camera, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import Edit from "../components/Edit.jsx";
import { useParams } from "react-router-dom";
import { getAllClubs, getAllNotices } from "../utils/api";
import Loading from "../components/Loading";

const Club = () => {
  const { clubId } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedTeamMember, setSelectedTeamMember] = useState(0);
  const [club, setClub] = useState({});
  const [notices, setNotices] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [postText, setPostText] = useState();
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubs = await getAllClubs();
        console.log(clubs);
        console.log(clubId);

        const club = clubs.data.data.clubs.find(
          (club) => club.admin === clubId
        );
        console.log(`vetiyeko club is : ${club}`);

        if (club) {
          setClub(club);

          const notices = await getAllNotices(club._id);
          setNotices(notices.data.data);

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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const handleCreatePost = () => {
    console.log("Creating post:", { text: postText, file: selectedFileName });
    setPostText("");
    setSelectedFileName("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Cover Photo Section */}
        {club.coverPicture && (
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
        )}

        {/* Profile Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative -mt-20 mb-4 flex flex-col md:flex-row md:items-end">
            <div className="relative mx-auto md:mx-0">
              {club.profilePicture && (
                <img
                  src={club.profilePicture}
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                />
              )}
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 mb-6 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
              <p className="text-gray-600">{club.department}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-auto mb-6 flex justify-center md:justify-end">
              <button
                onClick={() => setIsPopupOpen(true)}
                className="px-4 py-2 text-white rounded-lg bg-[#4CAF4F] hover:bg-[#409f43] flex items-center"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              {/* Show the Popup Only When Button is Clicked */}
              {isPopupOpen && (
                <Edit id={club._id} onClose={() => setIsPopupOpen(false)} />
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-center md:justify-start space-x-6">
              {club.contact && club.contact.facebook && (
                <a
                  href={club.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                </a>
              )}
              {/* Other social media links */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Club;
