import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const App = () => {
  const userType = 'customer';//BACKEND CHANGE ME

  return (
    <div className='flex flex-row'>
      <div className='w-fit p-5'>
        <Sidebar userType={userType} />
      </div>
      <div className="flex flex-col w-11/12 p-5 rounded-t-3xl">
        <Navbar/>
      </div>
    </div>
  )
}

export default App