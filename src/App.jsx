import React, { useState } from 'react'

import { AdminLayout } from './components/layouts/AdminLayout';
import {CustomerLayout} from './components/layouts/CustomerLayout';
import {StoreEmployeeLayout} from './components/layouts/StoreEmployeeLayout';
import {StoreOwnerLayout} from './components/layouts/StoreOwnerLayout';

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