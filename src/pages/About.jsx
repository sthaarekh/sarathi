import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Linkedin, Github, ArrowRight } from "lucide-react";
import arekh from '../assets/arekh.png'
import aashutosh from '../assets/aashutosh.png'
import shubham from '../assets/shubham.png'
import risham from '../assets/risham.jpg'
import saimon from '../assets/saimon.webp'

const teamMembers = [
  {
    name: "Aashutosh Sapkota Upadhyaya",
    image: aashutosh,
    description: "Backend Developer",
    skills: ["Javascript", "Django", ""],
    socials: { facebook: "#", instagram: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Arekh Shrestha",
    image: arekh,
    description: "Full Stack Developer",
    skills: ["MERN", "React-Native", "Taiwlind",],
    socials: { facebook: "https://facebook.com/sthaarekh", instagram: "https://instagram.com/sthaarekh", linkedin: "https://www.linkedin.com/in/sthaarekh/", github: "https://github.com/sthaarekh" },
  },
  {
    name: "Risham Raj Byahut",
    image: risham,
    description: "Frontend Developer",
    skills: ["Java", "C#", "Javascript"],
    socials: { facebook: "#", instagram: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Saimon Neupane",
    image: saimon,
    description: "Backend Developer",
    skills: ["MERN", "Photoshop", "API Design"],
    socials: { facebook: "#", instagram: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Shubham Yadav",
    image: shubham,
    description: "Frontend Developer",
    skills: ["UI/UX", "React", "Figma"],
    socials: { facebook: "https://www.facebook.com/profile.php?id=100009470869288", instagram: "https://www.instagram.com/shuuubhaam_/", linkedin: "https://www.linkedin.com/in/shubham-yadav-79a6a0339/", github: "https://github.com/ishubhcodes" },
  },
];

const About = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and set mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial screen size
    checkMobileView();

    // Add event listener for resize
    window.addEventListener('resize', checkMobileView);

    // Clean up event listener
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Auto-change team member
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prevActive) => 
        (prevActive + 1) % teamMembers.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Define social icons with their corresponding keys in the socials object
  const socialIcons = [
    { Icon: Facebook, key: "facebook", color: "text-blue-500 hover:text-blue-800" },
    { Icon: Instagram, key: "instagram", color: "text-pink-600 hover:text-pink-800" },
    { Icon: Linkedin, key: "linkedin", color: "text-blue-600 hover:text-blue-700" },
    { Icon: Github, key: "github", color: "text-gray-700 hover:text-black" },
  ];

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* Team Introduction Section */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 md:space-y-6 text-center md:text-left"
        >
          <div className="bg-[#4CAF4F]/10 p-3 md:p-4 rounded-xl inline-block">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Team <span className="text-[#4CAF4F]">Sarathi</span>
            </h1>
          </div>
          
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Crafting Digital Solutions with Passion
          </h2>
          
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            We are more than just developers. We are innovators, problem solvers, and dreamers committed to transforming complex challenges into elegant digital experiences.
          </p>
          
          <div className="flex justify-center md:justify-start items-center space-x-4">
            <button 
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#4CAF4F] text-white rounded-lg hover:bg-[#409f43] transition-colors group text-sm md:text-base cursor-pointer"
            >
              Learn More 
              <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </motion.div>

        {/* Team Members Carousel */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-md mx-auto"
        >
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-500">
            {/* Active Member Card */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCard}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img 
                  src={teamMembers[activeCard].image} 
                  alt={teamMembers[activeCard].name}
                  className="w-full h-[300px] md:h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 md:p-6">
                  <h3 className="text-lg md:text-2xl font-bold">{teamMembers[activeCard].name}</h3>
                  <p className="text-xs md:text-base text-gray-300">{teamMembers[activeCard].description}</p>
                  
                  {/* Skills Chips */}
                  <div className="flex gap-1 md:gap-2 mt-2 md:mt-3 flex-wrap">
                    {teamMembers[activeCard].skills.map((skill, index) => (
                      skill && (
                        <span 
                          key={index} 
                          className="bg-[#4CAF4F]/20 text-[#4CAF4F] px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm"
                        >
                          {skill}
                        </span>
                      )
                    ))}
                  </div>
                  
                  {/* Social Icons */}
                  <div className="flex gap-3 md:gap-4 mt-2 md:mt-4">
                    {socialIcons.map(({ Icon, key, color }, index) => {
                      const socialUrl = teamMembers[activeCard].socials[key];
                      return (
                        <a 
                          key={index} 
                          href={socialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${color} transition-colors duration-300 transform hover:scale-110 cursor-pointer`}
                          style={{ display: 'inline-block' }}
                        >
                          <Icon size={isMobile ? 18 : 24} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Member Thumbnails with Progress Indicator */}
            <div className="flex justify-center p-2 bg-gray-100 relative">
              {/* Progress Bar */}
              <div 
                className="absolute top-0 left-0 h-1 bg-[#4CAF4F] transition-all duration-5000"
                style={{ 
                  width: '100%', 
                  animation: 'progress 5s linear infinite' 
                }}
              />
              
              {teamMembers.map((member, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCard(index)}
                  className={`w-10 h-10 md:w-16 md:h-16 mx-1 md:mx-2 rounded-full border-2 transform transition-all duration-300 cursor-pointer
                    ${activeCard === index 
                      ? 'border-[#4CAF4F] scale-110' 
                      : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for progress bar animation */}
      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default About;