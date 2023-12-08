import React from 'react';
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
    title: "Settings",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/accountSettings"
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
    title: "Settings",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/accountSettings"
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
  },
  {
    title: "Settings",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/accountSettings"
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
  },
  {
    title: "Settings",
    icon: <LiaToolboxSolid size={30} color={"#448DB8"}/>,
    link: "/accountSettings"
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

      <img src={Logo} className='w-28 rounded-3xl select-none'/>
      <p className='font-semibold text-darkBlue text-5xl font-alegreya-sans select-none'>iWashify</p>
      <p className='text-xs text-black select-none font-bold tracking-widest'>POINT OF SALE SYSTEM</p>

      <div className='flex flex-col items-start pt-4 gap-2'>

        {SidebarData.map(( val, key ) => { //This renders all the possible sidebar navigational items for each user type
          return  <div 
                    key={ key } 
                    onClick={ ()=>{ window.location.pathname = val.link } } 
                    //Change onclick() so that when the div of the item is clicked, it changes the body and the navbar
                    className='flex flex-row items-center select-none h-fit w-full rounded-full py-2 px-6 hover:bg-brightYellow '
                  >{" "}
              { val.icon }
              <p className='text-darkBlue text-2xl pl-3 font-semibold'>{ val.title }</p>
            </div>
          })
        }

          <div  
            className='flex flex-row items-center select-none h-fit w-full rounded-full py-2 px-6 hover:bg-brightYellow ' 
            //onClick={()=>{window.location.pathname = val.link}} CHANGE THIS TO MAKE LOGOUT FUNCTIONAL 
          >
            <LiaSignOutAltSolid  size={30} color={"#D4092E"} style={{ strokeWidth: 0.8 }}/>
            <p className='text-warningRed font-bold text-2xl pl-3'>Logout</p>
          </div>
      </div>
    </div>
  )
}

export default Sidebar;