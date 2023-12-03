import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

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
    <div className='flex flex-row'>
      <div className='w-fit p-5'>
        <Sidebar userType={ userType } />
      </div>
      <div className="flex flex-col w-11/12 p-5 rounded-t-3xl">
        <Navbar navbarData={ navbarData }/>
      </div>
    </div>
  )
}

export default App