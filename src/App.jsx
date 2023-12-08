import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import POS from './components/POS';
import Employees from './pages/Employees';
import Services from './pages/Services';
import Settings from './pages/settings/Settings';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';

const App = () => {
  const userType = 'admin';//BACKEND CHANGE ME
  /* userType VALUES SHOULD ONLY BE:
    - 'admin'
    - 'storeOwner'
    - 'storeEmployee'
    - 'customer'
  */
  const navbarData = [{ 
    currentPage: 'Dashboard', 
    name: 'Admin', 
    email: 'admin@usc.edu.ph'   
  }]//BACKEND CHANGE ME

  return (

    <div className='flex flex-row h-screen'>
      <div className='w-fit p-5'>
        <Sidebar userType={ userType } />
      </div>
      <div className="flex flex-col h-full w-11/12 p-5 rounded-t-3xl">
        <Navbar navbarData={ navbarData }/>
        {/* <Dashboard userType={ userType }/> */}
        {/* <Settings userType={ userType }/> */}
        {/* <POS/> */}
        {/* <Analytics/> */}
        {/* <Employees/> */}
        {/* <Orders/> */}
        <Analytics/>
    </div>
      {/* <SignUp/>
      <Login/> */}
    </div>
  )
}

export default App