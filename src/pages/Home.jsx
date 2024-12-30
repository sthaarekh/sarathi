import React from 'react'
import img from '../assets/Illustration.svg'
const Home = () => {
  return (
    <div className='showarea'>
    <div className=" bg-[#F5F7FA] pt-[100px] flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        {/* Text Section */}
        <div className="text-center md:text-left md:w-1/2 mx-4 md:mx-[50px]">
          <h1 className="text-[32px] md:text-[48px] lg:text-[64px] md:w-auto font-semibold text-[#4D4D4D]">
            Manage your entire club in a single system
          </h1>
          <p className="text-gray-500 mb-6 text-sm md:text-base">
            A one stop platform for all your club needs.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Register
          </button>
        </div>
  
        {/* Image Section */}
        <div className="flex justify-center md:w-1/2 mt-8 md:mt-0">
          <img
            src={img}
            alt="Club Management Illustration"
            className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[400px]"
          />
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Home
