import React, { useState } from 'react'

import { AdminLayout } from './components/layouts/AdminLayout';
import {CustomerLayout} from './components/layouts/CustomerLayout';
import {StoreEmployeeLayout} from './components/layouts/StoreEmployeeLayout';
import {StoreOwnerLayout} from './components/layouts/StoreOwnerLayout';

const App = () => {
  const [userType, setUserType] = useState('storeOwner');
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
    name: 'storeOwner', 
    email: 'admin@usc.edu.ph'   
  }]//BACKEND CHANGE ME

  const renderLayout = () => {
    switch (userType) {
      case 'admin':
        return <AdminLayout userType={userType} navbarData={navbarData}/>;
      case 'customer':
        return <CustomerLayout userType={userType} navbarData={navbarData}/>;
      case 'storeOwner':
        return <StoreOwnerLayout userType={userType} navbarData={navbarData}/>;
      case 'storeEmployee':
        return <StoreEmployeeLayout userType={userType} navbarData={navbarData}/>;
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