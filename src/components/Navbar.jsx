import React from 'react';
import { IoMenu } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  return(
    <div className="flex-row text-darkBlue-500">
      <IoMenu />
      <div className="text-3xl text-darkBlue-500">Dashboard</div>
      <IoMdNotificationsOutline />
    </div>
  )
}

export default Navbar;