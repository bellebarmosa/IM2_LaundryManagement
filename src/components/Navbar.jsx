import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = ({ navbarData }) => {

  return (
    <div className='flex flex-row h-auto bg-brightYellow items-center pl-8 p-3 rounded-t-3xl'>
      <div className='flex flex-row items-center justify-start w-2/4'>
        <div className="text-darkBlue text-5xl font-black select-none">
          {navbarData.length > 0 ? navbarData[0].currentPage : console.error("navbarData error 1: currentPage")}
        </div>
      </div>

      <div className='flex flex-row items-center justify-end w-2/4 pr-8 gap-5'>
        <IoMdNotificationsOutline color={"#448DB8"} size={40} />
        <IoPersonCircle color={"#448DB8"} size={60}  />
        <div className='flex flex-col text-darkBlue'>
          <p className='text-xl font-extrabold'>
            {navbarData.length > 0 ? navbarData[0].name : console.error("navbarData error 2: name")}
          </p>
          <p className='font-medium'>
            {navbarData.length > 0 ? navbarData[0].email : console.error("navbarData error 3: email")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navbar;