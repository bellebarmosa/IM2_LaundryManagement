import React from 'react';
import Logo from '../assets/iWashify.png'
import { LiaHomeSolid, LiaCalculatorSolid, LiaUsersCogSolid, LiaUserTieSolid , LiaArchiveSolid, LiaUsersSolid, LiaChartBarSolid, LiaBoxSolid , LiaToolboxSolid  } from "react-icons/lia";

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
    title: "Archive",
    icon: <LiaArchiveSolid size={30} color={"#448DB8"}/>,
    link: "/archive"
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
    title: "Customer",
    icon: <LiaUsersSolid size={30} color={"#448DB8"}/>,
    link: "/customer"
  },
  {
    title: "Services",
    icon: <LiaBoxSolid size={30} color={"#448DB8"}/>,
    link: "/service"
  },
  {
    title: "Tools",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/tool"
  }
]

const VendorOwnerSidebarData = [
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
    title: "Archive",
    icon: <LiaArchiveSolid size={30} color={"#448DB8"}/>,
    link: "/archive"
  },
  {
    title: "Customer",
    icon: <LiaUsersSolid size={30} color={"#448DB8"}/>,
    link: "/customer"
  },
  {
    title: "Employees",
    icon: <LiaUserTieSolid size={30} color={"#448DB8"}/>,
    link: "/employee"
  },
  {
    title: "Analytics",
    icon: <LiaChartBarSolid size={30} color={"#448DB8"}/>,
    link: "/analytics"
  },
  {
    title: "Services",
    icon: <LiaBoxSolid size={30} color={"#448DB8"}/>,
    link: "/services"
  },
  {
    title: "Tools",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/tools"
  }
]

const VendorEmployeeSidebarData = [
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
    title: "Archive",
    icon: <LiaArchiveSolid size={30} color={"#448DB8"}/>,
    link: "/archive"
  },
  {
    title: "Customer",
    icon: <LiaUsersSolid size={30} color={"#448DB8"}/>,
    link: "/customer"
  },
  {
    title: "Services",
    icon: <LiaBoxSolid size={30} color={"#448DB8"}/>,
    link: "/services"
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
    title: "Archive",
    icon: <LiaArchiveSolid size={30} color={"#448DB8"}/>,
    link: "/archive"
  }
]

const AdminSidebar = () => {
  return (
    <div className='flex flex-col items-center w-fit'>

      <img src={Logo} className='w-28 rounded-3xl'/>
      <p className='font-semibold text-darkBlue text-5xl font-alegreya-sans '>iWashify</p>
      <p className='font-medium text-xs text-darkBlue'>POINT OF SALE SYSTEM</p>

      <div className='flex flex-col items-start pt-4'>
        {AdminSidebarData.map((val, key) =>{
          return <div key={key} onClick={()=>{window.location.pathname = val.link}} className='flex flex-row items-center pt-5'>{" "}
              {val.icon}
              <p className='text-darkBlue text-2xl pl-3'>{val.title}</p>
            </div>
        })
        }
      </div>
    </div>
  )
}


const VendorOwnerSidebar = () => {
  return (
    <div className='flex flex-col items-center w-fit'>

      <img src={Logo} className='w-28 rounded-3xl'/>
      <p className='font-semibold text-darkBlue text-5xl font-alegreya-sans '>iWashify</p>
      <p className='font-medium text-xs text-darkBlue'>POINT OF SALE SYSTEM</p>

      <div className='flex flex-col items-start pt-4'>
        {VendorOwnerSidebarData.map((val, key) =>{
          return <div key={key} onClick={()=>{window.location.pathname = val.link}} className='flex flex-row items-center pt-5'>{" "}
              {val.icon}
              <p className='text-darkBlue text-2xl pl-3'>{val.title}</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

const VendorEmployeeSidebar = () => {
  return (
    <div className='flex flex-col items-center w-fit'>

      <img src={Logo} className='w-28 rounded-3xl'/>
      <p className='font-semibold text-darkBlue text-5xl font-alegreya-sans '>iWashify</p>
      <p className='font-medium text-xs text-darkBlue'>POINT OF SALE SYSTEM</p>

      <div className='flex flex-col items-start pt-4'>
        {CustomerSidebarData.map((val, key) =>{
          return <div key={key} onClick={()=>{window.location.pathname = val.link}} className='flex flex-row items-center pt-5'>{" "}
              {val.icon}
              <p className='text-darkBlue text-2xl pl-3'>{val.title}</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

const CustomerSidebar = () => {
  return (
    <div className='flex flex-col items-center w-fit'>

    <img src={Logo} className='w-28 rounded-3xl'/>
    <p className='font-semibold text-darkBlue text-5xl font-alegreya-sans '>iWashify</p>
    <p className='font-medium text-xs text-darkBlue'>POINT OF SALE SYSTEM</p>

    <div className='flex flex-col items-start pt-4'>
      {CustomerSidebarData.map((val, key) =>{
        return <div key={key} onClick={()=>{window.location.pathname = val.link}} className='flex flex-row items-center pt-5'>{" "}
            {val.icon}
            <p className='text-darkBlue text-2xl pl-3'>{val.title}</p>
          </div>
        })
      }
    </div>

    </div>
  )
}


const Sidebar = ({ userType }) => {
  return (
    <div>
      {userType === 'admin' && <AdminSidebar/>}
      {userType === 'storeOwner' && <VendorOwnerSidebar/>}
      {userType === 'storeEmployee' && <VendorEmployeeSidebar/>}
      {userType === 'customer' && <CustomerSidebar/>}
    </div>
  )
}

export default Sidebar;