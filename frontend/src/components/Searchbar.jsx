import React from 'react'
import { CiSearch } from "react-icons/ci";

const Searchbar = () => {
  return (
    <div className='font-sans'>
        <div className='h-[35px] w-[200px] sm:[300px] md:w-[400px]  lg:w-[500px] bg-[#f8f8f8] rounded-xl border-[1px] border-gray-300 flex items-center pl-1'>
                <CiSearch size={24} />
                <input  type="text" className='outline-none h-[100%] w-[100%] pl-4 rounded-xl decoration-none ' placeholder='search clubs ' autoCorrect='none'  style={{
                  textDecoration:'none'
                }}   />
        </div>
    </div>
  )
}

export default Searchbar