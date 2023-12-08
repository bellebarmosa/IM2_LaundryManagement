import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../assets/iWashify.png'
import { LiaHomeSolid, LiaCalculatorSolid, LiaUsersCogSolid, LiaUserTieSolid , LiaArchiveSolid, LiaUsersSolid, LiaChartBarSolid, LiaBoxSolid , LiaToolboxSolid, LiaSignOutAltSolid   } from "react-icons/lia";

const AdminSidebarData = [
  {
    title: "Dashboard",
    icon: <LiaHomeSolid size={30} color={"#448DB8"}/>,
    link: "/dashboard"
  },
  {
    title: "POS",
    icon: <LiaCalculatorSolid size={30} color={"#448DB8"}/>,
    link: "/pos"
  },
  {
    title: "Orders",
    icon: <LiaArchiveSolid size={30} color={"#448DB8"}/>,
    link: "/order"
  },
  {
    title: "Services",
    icon: <LiaBoxSolid size={30} color={"#448DB8"}/>,
    link: "/services"
  },
  {
    title: "Analytics",
    icon: <LiaChartBarSolid size={30} color={"#448DB8"}/>,
    link: "/analytics"
  },
  {
    title: "Users",
    icon: <LiaUsersCogSolid size={30} color={"#448DB8"}/>,
    link: "/user"
  },
  {
    title: "Settings",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/settings"
  }
]

const StoreOwnerSidebarData = [
  {
    title: "Dashboard",
    icon: <LiaHomeSolid size={30} color={"#448DB8"}/>,
    link: "/dashboard"
  },
  {
    title: "POS",
    icon: <LiaCalculatorSolid size={30} color={"#448DB8"}/>,
    link: "/pos"
  },
  {
    title: "Orders",
    icon: <LiaArchiveSolid size={30} color={"#448DB8"}/>,
    link: "/order"
  },
  {
    title: "Services",
    icon: <LiaUserTieSolid size={30} color={"#448DB8"}/>,
    link: "/services"
  },
  {
    title: "Analytics",
    icon: <LiaChartBarSolid size={30} color={"#448DB8"}/>,
    link: "/analytics"
  },
  {
    title: "Employees",
    icon: <LiaUsersCogSolid size={30} color={"#448DB8"}/>,
    link: "/employee"
  },
  {
    title: "Settings",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/settings"
  }
]

const StoreEmployeeSidebarData = [
  {
    title: "Dashboard",
    icon: <LiaHomeSolid size={30} color={"#448DB8"}/>,
    link: "/dashboard"
  },
  {
    title: "POS",
    icon: <LiaCalculatorSolid size={30} color={"#448DB8"} />,
    link: "/pos"
  },
  {
    title: "Orders",
    icon: <LiaArchiveSolid size={30} color={"#448DB8"}/>,
    link: "/order"
  },
  {
    title: "Settings",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/settings"
  }
]

const CustomerSidebarData = [
  {
    title: "Dashboard",
    icon: <LiaHomeSolid size={30} color={"#448DB8"}/>,
    link: "/dashboard"
  },
  {
    title: "POS",
    icon: <LiaCalculatorSolid size={30} color={"#448DB8"}/>,
    link: "/pos"
  },
  {
    title: "Orders",
    icon: <LiaArchiveSolid size={30} color={"#448DB8"}/>,
    link: "/order"
  },
  {
    title: "Settings",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/settings"
  }
]

const Sidebar = ({ userType }) => {
  var SidebarData;
  if(userType === 'admin'){
    SidebarData = AdminSidebarData;
  }else if(userType === 'storeOwner'){
    SidebarData = StoreOwnerSidebarData;
  }else if(userType === 'storeEmployee'){
    SidebarData = StoreEmployeeSidebarData;
  }else if(userType === 'customer'){
    SidebarData = CustomerSidebarData;
  }

  return (
    <div className='flex flex-col items-center w-fit'>
      {/* ... (your existing Sidebar code) */}
      <div className='flex flex-col items-start pt-4 gap-2'>
        {SidebarData.map((val, key) => (
          <NavLink
            key={key}
            to={val.link}
            className='flex flex-row items-center select-none h-fit w-full rounded-full py-2 px-6 hover:bg-brightYellow '
            activeClassName='active-link'
          >
            {val.icon}
            <p className='text-darkBlue text-2xl pl-3 font-semibold'>{val.title}</p>
          </NavLink>
        ))}
        {/* Logout link using NavLink */}
        <NavLink
          to='/logout'
          className='flex flex-row items-center select-none h-fit w-full rounded-full py-2 px-6 hover:bg-brightYellow '
          // onClick={()=>{window.location.pathname = val.link}} CHANGE THIS TO MAKE LOGOUT FUNCTIONAL
        >
          <LiaSignOutAltSolid size={30} color={"#D4092E"} style={{ strokeWidth: 0.8 }} />
          <p className='text-warningRed font-bold text-2xl pl-3'>Logout</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;