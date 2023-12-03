import React from 'react';
import { VscMenu } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  const name = 'User';//FRONT END MAKE ME DYNAMIC
  const email = 'admin@usc.edu.ph'//FRONT END MAKE ME DYNAMIC

  return (
    <div className='flex flex-row h-auto w-full bg-fadedYellow items-center pl-8 p-3'>
      <div className='flex flex-row items-center justify-start w-2/4'>
        <VscMenu size={50} color={"#448DB8"}  />
        <div className="text-darkBlue text-5xl font-black ml-2 pl-3">Dashboard</div>
      </div>

      <div className='flex flex-row items-center justify-end w-2/4 pr-8 gap-5'>
        <IoMdNotificationsOutline color={"#448DB8"} size={40} />
        <IoPersonCircle color={"#448DB8"} size={60}  />
        <div className='flex flex-col text-darkBlue'>
          <p className='text-xl font-extrabold'>{name}</p>
          <p className='font-medium'>{email}</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
