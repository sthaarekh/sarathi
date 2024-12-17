import React from 'react'
import img from '../assets/Illustration.svg'
const Home = () => {
  return (
      <div className='showarea'>
        <div className="py-[100px] bg-[#F5F7FA] flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">

        <div className="text-center md:text-left mx-[50px]">
          <h1 className="text-[64px] w-[600px] font-semibold text-[#4D4D4D]">
            Manage your entire club in a single system
          </h1>
          <p className="text-gray-500 mb-6">
            A one stop platform for all your club needs.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Register
          </button>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          {/* Replace this placeholder with your image */}
          <img
            src={img}
            alt="Club Management Illustration"
            className=""
          />
        </div>
      </div>
    </div>
</div>
  )
}

export default Home
