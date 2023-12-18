import React from 'react'

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Dashboard from '../pages/Dashboard';
import POS from '../pages/POS';
import { NotFound } from '../pages/NotFound';
import { Route, Routes } from 'react-router';

export const StoreEmployeeLayout = ({ userType, navbarData }) => {
  return (
    <div className='flex flex-row h-screen'>
      <div className='w-fit p-5'>
        <Sidebar userType={ userType } />
      </div>
      <div className="flex flex-col h-full w-11/12 p-5 rounded-t-3xl">
        <Navbar navbarData={ navbarData }/>
        <Routes>
          <Route path="/dashboard" element={<Dashboard userType={ userType } />}/>
          <Route path="/pos" element={<POS/>}/>
          <Route path="/order" element={<POS/>}/>
          <Route path="/settings" element={<POS/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  )
}
