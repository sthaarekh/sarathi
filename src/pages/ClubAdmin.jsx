import React, { useState, useRef, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Camera,
  Edit2,
  Twitter,
  Phone,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import Edit from "../components/Edit.jsx";
import { useParams } from "react-router-dom";
import { getAllClubs, getAllNotices } from "../utils/api";
import Loading from "../components/Loading";
import useAuth from "../context/Hook/useAuth.js";
import moment from "moment/moment.js";

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
  const { auth } = useAuth();
  // const { id } = useParams();
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
        <div className="relative h-64 bg-gray-300">
          <img
            src={club.coverPicture}
            alt="Cover"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Profile Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative -mt-20 mb-4 flex flex-col md:flex-row md:items-end">
            <div className="relative mx-auto md:mx-0">
              <img
                src={club.profilePicture}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
              />
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
              <a
                href={club.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-700 transition-colors" />
              </a>
              <a
                href={club.contact.insta}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 text-pink-600 hover:text-pink-700 transition-colors" />
              </a>
              <a
                href={club.contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            {/* About Us Section */}
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About Us
              </h2>
              <p className="text-gray-700 mb-4">{club.description}</p>

              {/* Meet Our Team Section */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Meet Our Team
              </h3>
              <div className="space-y-4">
                {/* Team Member Photos */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedTeamMember === index
                          ? "transform scale-110"
                          : ""
                      }`}
                      onClick={() => setSelectedTeamMember(index)}
                    >
                      <img
                        src={member.image}
                        alt={member.role}
                        className={`w-12 h-12 rounded-full border-2 ${
                          selectedTeamMember === index
                            ? "border-[#4CAF4F]"
                            : "border-transparent"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Selected Team Member Info */}
                <div className="text-left">
                  <p className="font-medium text-[#4CAF4F]">
                    {teamMembers[selectedTeamMember].name}
                  </p>
                  <p className="font-medium text-gray-600">
                    {teamMembers[selectedTeamMember].role}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {teamMembers[selectedTeamMember].description}
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-6 pt-6  border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Us
                </h2>
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
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                {/* Event Cards */}
                {notices.map((post) => (
                  <div key={post._id} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={club.profilePicture}
                          alt="Event"
                          className="w-10 h-full rounded-full"
                        />
                        <div>
                          <div className="flex">
                            <h3 className="font-medium">{club.name}</h3>
                            <h4> {moment(post.createdAt).fromNow()}</h4>
                          </div>
                          <p className="text-sm text-gray-500">
                            {post.description}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-600 hover:text-gray-800">
                        <span className="text-xl">...</span>
                      </button>
                    </div>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-lg mb-4"
                    />
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
