import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 md:px-10">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-black">
          Hey, We're <span className="text-black">Team Sarathi.</span>
        </h1>
        <h2 className="text-2xl font-semibold mt-2 text-gray-800">
          We're a <span className="text-[#4CAF4F]">Full Stack Development Team</span>
        </h2>
        <p className="mt-4 text-gray-700 max-w-lg">
          We are a team of passionate students from KU dedicated to building complete, high-quality websites. From intuitive UI/UX design and responsive front-end development to robust back-end systems and database management, we handle it all ensuring smooth UX experience. Leveraging the latest technologies and a collaborative approach, we turn ideas into functional, scalable, and visually appealing digital solutions.
        </p>
        <Link to='/contacts' className="mt-6 px-6 py-3 bg-[#4CAF4F] hover:bg-[#409f43] text-white rounded-lg shadow-md">
          Contact us
        </Link>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default About;
