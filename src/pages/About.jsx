import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import saimon from '../assets/saimon.webp'
import arekh from '../assets/pic1.webp'
import risham from '../assets/pic2.webp'
// import shubham from '../assets/saimon.webp'
// import aashutosh from '../assets/saimon.webp'

const teamMembers = [
  {
    name: "Aashutosh Sapkota Upadhyaya",
    image: "https://via.placeholder.com/200x250",
    description: "Backend Developer",
    socials: { facebook: "#", instagram: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Arekh Shrestha",
    image: arekh,
    description: "Backend/Frontend",
    socials: { facebook: "#", instagram: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Risham Raj Byahut",
    image: risham,
    description: "Frontend Developer",
    socials: { facebook: "#", instagram: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Saimon Neupane",
    image: saimon,
    description: "Backend Developer",
    socials: { facebook: "#", instagram: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Shubham Yadav",
    image: "../assets/saimon.webp",
    description: "Frontend Developer",
    socials: { facebook: "#", instagram: "#", linkedin: "#", github: "#" },
  },
];

const fadeInAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <div className="w-full">
      <motion.div initial="hidden" animate="visible" variants={fadeInAnimation} className="flex items-center justify-center h-screen bg-gray-100 px-6 md:px-10">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-black">
            Hey, We're <span className="text-black">Team Sarathi.</span>
          </h1>
          <h2 className="text-2xl font-semibold mt-2 text-gray-800">
            We're a <span className="text-[#4CAF4F]">Full Stack Development Team</span>
          </h2>
          <p className="mt-4 text-gray-700 max-w-lg">
            We are a team of passionate students from KU dedicated to building complete, high-quality websites. From intuitive UI/UX design and responsive front-end development to robust back-end systems and database management, we handle it all ensuring smooth UX experience. Leveraging the latest technologies and a collaborative approach, we turn ideas into functional, scalable, and visually appealing digital solutions.
          </p>
          <Link to="/contacts" className="mt-8 px-6 py-3 bg-[#4CAF4F] hover:bg-[#409f43] text-white rounded-lg shadow-md inline-block">
            Contact us
          </Link>
        </div>
      </motion.div>


      <div className="text-center overflow-x-auto bg-gray-100 py-10 ">
        <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2 }}  className="flex space-x-6 px-10 min-w-max">
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={fadeInAnimation} className="bg-white shadow-md rounded-lg p-4 w-64 flex flex-col text-center flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3">{member.name}</h2>
              <p className="text-gray-600 mt-2 flex-grow">{member.description}</p>
              <div className="flex justify-center gap-3 mt-4">
                <a href={member.socials.facebook} target="_blank">
                  <Facebook className="text-blue-400 hover:text-blue-600 transition-colors" />
                </a>
                <a href={member.socials.instagram} target="_blank">
                  <Instagram className="text-pink-500 hover:text-pink-700 transition-colors" />
                </a>
                <a href={member.socials.linkedin} target="_blank">
                  <Linkedin className="text-blue-500 hover:text-blue-700 transition-colors" />
                </a>
                <a href={member.socials.github} target="_blank">
                  <Github className="text-gray-700 hover:text-gray-900 transition-colors" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
