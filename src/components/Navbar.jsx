import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  const pageTitle = 'Dashboard';//BACK END MAKE ME DYNAMIC
  const name = 'User';//BACK END MAKE ME DYNAMIC
  const email = 'admin@usc.edu.ph'//BACK END MAKE ME DYNAMIC

  return (
    <div className='flex flex-row h-auto bg-brightYellow items-center pl-4 p-3 rounded-t-3xl'>
      <div className='flex flex-row items-center justify-start w-2/4'>
        <div className="text-darkBlue text-5xl font-black">{pageTitle}</div>
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
