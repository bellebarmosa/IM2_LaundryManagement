import React, { useState,useEffect } from 'react'
import Login from './components/pages/Login'
import Axios from 'axios';
import { AdminLayout } from './components/layouts/AdminLayout';
import {CustomerLayout} from './components/layouts/CustomerLayout';
import {StoreEmployeeLayout} from './components/layouts/StoreEmployeeLayout';
import {StoreOwnerLayout} from './components/layouts/StoreOwnerLayout';
import { Route, Routes, useNavigate } from 'react-router';

const App = () => {
  const navigate =useNavigate()
  const [userType, setUserType] = useState('');
  const [loggedIn, setLoggedIn] = useState();
  const [navbarData, setnavbarData] = useState({});

  Axios.defaults.withCredentials = true;
  useEffect(() => {
  
    const checkToken = async () => {
      try {
        // 
        const response = await Axios.get('http://localhost:3001/user/profile', { withCredentials: true });
        if (response.data.user) {
          // Token exists, set user type and navbar data
          setUserType(response.data.user.employee_role);
          setnavbarData([
            {
              currentPage: 'Dashboard', //idk onsa dri??
              name: response.data.user.employee_name,
              email: response.data.user.employee_eMail,
            },
          ]);
        }
        console.log(response.data.user)
      } catch (error) {
        console.error('Token check error:', error);
        navigate('/')

      }
    };
    checkToken();
   }, []);

  

  
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
  // setnavbarData[{ 
  //   currentPage: 'Dashboard', 
  //   name: 'storeOwner', 
  //   email: 'admin@usc.edu.ph'   
  // }]//BACKEND CHANGE ME

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
        return <Login/>;
    }
  };

  return (
    <>
        
    
    <div className="wrapper"></div>
      {renderLayout()}
    </>
  )
}

export default App