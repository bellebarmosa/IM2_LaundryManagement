import React, { useEffect, useState} from 'react'
import Axios from 'axios';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './components/Dashboard'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import PosPage from './components/posPage'

const App = () => {
  // const userType = 'storeOwner';//BACKEND CHANGE ME
  /* userType VALUES SHOULD ONLY BE:
    - 'admin'
    - 'storeOwner'
    - 'storeEmployee'
    - 'customer'
  */
  // const navbarData = [{ 
  //   currentPage: 'Dashboard', 
  //   name: 'Admin', 
  //   email: 'admin@usc.edu.ph'   
  // }]//BACKEND CHANGE ME


  //example accounts
  //"employee_eMail": "storeOwner@gmail.com", //storeOwner
  // "employee_password": "092"

  <Routes>
 <Route exact path='/pos' Component={PosPage}/>
  </Routes>



  const [userType, setUserType] = useState(null);
  const [navbarData, setNavbarData] = useState(null);
  Axios.defaults.withCredentials = true;
  useEffect(() => {
  
    const checkToken = async () => {
      try {
        // 
        const response = await Axios.get('http://localhost:3001/user/profile', { withCredentials: true });
        if (response.data.user) {
          // Token exists, set user type and navbar data
          setUserType(response.data.user.employee_role);
          setNavbarData([
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
      }
    };
    checkToken();
   }, []);




  return (

    <div className='flex flex-row h-screen'>
      {userType && <div className='w-fit p-5'>
        <Sidebar userType={ userType }/>
      </div> }
      {navbarData && <div className="flex flex-col h-full w-11/12 p-5 rounded-t-3xl">
       <Navbar navbarData={ navbarData }/>
        <Dashboard userType={ userType }/>
      </div> }
      {/* <SignUp/>  */}
       <Login/> 
    </div>
  )
}

export default App