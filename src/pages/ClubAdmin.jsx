import React, { useState, useRef,useEffect, useParams, useContext } from 'react';
import { Facebook, Instagram, Linkedin, Camera, Edit2, ImagePlus, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import profilepic from '../assets/profilepic.webp';
import { motion } from "framer-motion";
import Edit from '../components/edit.jsx'
import SarathiContext from '../context/SarathiContext';



const Club = () => {
  const id = "678f4c06c1c80b6518063f85"; // Assigning the fixed id
  // const { id } = useParams();
  const [selectedTeamMember, setSelectedTeamMember] = useState(0);
  const context = useContext(SarathiContext);
  const { clubs, fetchClubs, notices, getNoticesOfClub } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("running")
        await fetchClubs(); 
        await getNoticesOfClub(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const [postText, setPostText] = useState('');
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const clubs22= [
    {
        "contact": {
            "phone": 1234567890,
            "email": "kajkldfjaklhdkjfhasd@gmail.com",
            "facebook": "hfkjahsdkfjhasd",
            "twitter": "oifhjadioshnf",
            "insta": "fdafsasd"
        },
        "ourTeam": {
            "firstPerson": {
                "name": "fgsadg",
                "post": "President",
                "description": "gsfdgsdfkugdjhsiudfhgkbskdfg",
                "image": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832152/avcwgvd0wwulnd2eg71h.png"
            },
            "secondPerson": {
                "name": "gfsdg",
                "post": "Vice President",
                "description": "disufhgiuoshdnfkjgndksfg",
                "image": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832153/oeev8bpwhnrhdvujjtzn.png"
            },
            "thirdPerson": {
                "name": "dsf",
                "post": "Secretary",
                "description": "goisndifognsjndf",
                "image": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832154/oobcbd0l4c3kw1lj3ul4.png"
            }
        },
        "_id": "6776b2557ea24285fa4d1bad",
        "name": "Tech Club",
        "department": "DoCSE",
        "description": "performs tech things",
        "admin": "6745ba692f58408217bcf164",
        "adminVerified": false,
        "profilePicture": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832150/hsftwargmbmb7fvq2urf.png",
        "coverPicture": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832151/w5xjug1fltsbry0h7pqa.png",
        "formLink": "hello",
        "__v": 0
    },
    {
        "contact": {
            "phone": 1234567890,
            "email": "kajkldfjaklhdkjfhasd@gmail.com",
            "facebook": "hfkjahsdkfjhasd",
            "twitter": "oifhjadioshnf",
            "insta": "fdafsasd"
        },
        "ourTeam": {
            "firstPerson": {
                "name": "fgsadg",
                "post": "President",
                "description": "gsfdgsdfkugdjhsiudfhgkbskdfg",
                "image": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832917/zvquuseslvnfulaw36x8.png"
            },
            "secondPerson": {
                "name": "gfsdg",
                "post": "Vice President",
                "description": "disufhgiuoshdnfkjgndksfg",
                "image": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832918/hewvlttbw9er1xxojsrh.png"
            },
            "thirdPerson": {
                "name": "dsf",
                "post": "Secretary",
                "description": "goisndifognsjndf",
                "image": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832920/dzo8kixn5ixhttzwpl3a.png"
            }
        },
        "_id": "6776b55214987081cfb2edd1",
        "name": "Tech Club",
        "department": "DoCSE",
        "description": "performs tech things",
        "admin": "6745c9f270cc7b9e87ead564",
        "adminVerified": false,
        "profilePicture": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832915/sd24qofpvz6lbkjgc7xw.png",
        "coverPicture": "https://res.cloudinary.com/dbqlchapr/image/upload/v1735832916/lzwnsk6c2v5kacg79xbx.png",
        "formLink": "hello",
        "__v": 0
    },
    {
        "contact": {
            "phone": 9865599415,
            "email": "kucc@ku.edu.np",
            "facebook": "https://www.facebook.com/kucc1997",
            "twitter": "https://x.com/kucc1997",
            "insta": "https://instagram.com/kucc1997"
        },
        "ourTeam": {
            "firstPerson": {
                "name": "Nirjal Bhurtel",
                "post": "President",
                "description": "qwertyuiop",
                "image": "https://res.cloudinary.com/dbqlchapr/image/upload/v1737444355/vzd836kwod25ds9qh8it.webp"
            },
            "secondPerson": {
                "name": "Abhiyan Dhakal",
                "post": "Vice President",
                "description": "asdfghjkl",
                "image": "https://res.cloudinary.com/dbqlchapr/image/upload/v1737444356/lwwibfclo86bzjix5w3h.webp"
            },
            "thirdPerson": {
                "name": "Jenish Khulal",
                "post": "Secretary",
                "description": "zxcvbnm",
                "image": "https://res.cloudinary.com/dbqlchapr/image/upload/v1737444357/oijoyexricaxvemxqqru.webp"
            }
        },
        "_id": "678f4c06c1c80b6518063f85",
        "name": "Kathmandu University Computer Club",
        "department": "Department of Computer Science and Engineering",
        "description": "KUCC is a non-profit, independent club formed by students of the Department of Computer Science and Engineering in the year 1997. Being registered as the first club of Kathmandu University with the registration number 001/1997 in the Student Welfare, KUCC has worked in the field of ICT for twenty years. KUCC has more than 1000 members from Department of Computer Science and Engineering. Kathmandu University Computer Club (KUCC) is a student wing of the Department of Computer Science and Engineering which was established with a goal to engage and aware students in the technological research and development, most prominently in the ICT field and at the same time provides a common platform for young and aspiring individuals to exhibit their ideas. Every year KUCC cooperates and organizes numerous competitive as well as non-competitive events like seminars, exhibitions, hackathon, skill development program and tutorial sessions to name a few, with an unwavering intention to promote, develop and encourage emerging technological advancement.",
        "admin": "6745ba692f58408217bcf164",
        "adminVerified": false,
        "profilePicture": "https://res.cloudinary.com/dbqlchapr/image/upload/v1737444347/wpaxc9gtaporeitewkpo.png",
        "coverPicture": "https://res.cloudinary.com/dbqlchapr/image/upload/v1737444350/kc82ahfaqynpgbqhjjiq.webp",
        "formLink": "hello",
        "__v": 0
    }
]

  const club = clubs22.find((club) => club._id === id);
  const teamMembers = Object.values(club.ourTeam);


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
              {isPopupOpen && <Edit onClose={() => setIsPopupOpen(false)} />}
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
                  <div key={index} className={`cursor-pointer transition-all duration-300 ${selectedTeamMember === index ? 'transform scale-110' : ''}`}
                    onClick={() => setSelectedTeamMember(index)}>
                    <img src={member.image} alt={member.role} className={`w-12 h-12 rounded-full border-2 ${selectedTeamMember === index ? 'border-[#4CAF4F]' : 'border-transparent'}`}/>
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
              {notices.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img src={profilepic} alt="Event" className="w-10 h-10 rounded-full"/>
                      <div>
                        <h3 className="font-medium">Kathmandu University Computer Club</h3>
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