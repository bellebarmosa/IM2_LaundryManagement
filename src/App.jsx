import React, { useState } from 'react'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './components/pages/Dashboard';
import POS from './components/pages/POS';
import { AdminLayout } from './components/layouts/AdminLayout';
import AppRouter from './components/AppRouter'


const App = () => {
  const [userType, setUserType] = useState('admin');
  const [loggedIn, setLoggedIn] = useState(true);
  // const userType = 'storeOwner';//BACKEND CHANGE ME
  /* userType VALUES SHOULD ONLY BE:
    - 'admin'
    - 'storeOwner'
    - 'storeEmployee'
    - 'customer'
  */
  const handleLogin = (userType) => {
    setUserType(userType);
  };
  const navbarData = [{ 
    currentPage: 'Dashboard', 
    name: 'Admin', 
    email: 'admin@usc.edu.ph'   
  }]//BACKEND CHANGE ME

  const renderLayout = () => {
    switch (userType) {
      case 'admin':
        return <AdminLayout userType={userType} navbarData={navbarData}/>;
      case 'customer':
        return <CustomerLayout />;
      case 'storeOwner':
        return <StoreOwnerLayout />;
      case 'storeEmployee':
        return <StoreEmployeeLayout />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderLayout()}
    </>
  )
}

export default App