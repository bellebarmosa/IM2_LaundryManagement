import React from 'react'
import Orders from '../pages/Orders';
import Services from '../pages/Services';
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Dashboard from '../pages/Dashboard';
import POS from '../pages/POS';
import StoreOwnerSettingsData from '../pages/settings/StoreOwnerSettingsData'
import Employees from '../pages/Employees';
import { NotFound } from '../pages/NotFound';
import { Route, Routes } from 'react-router';

export const StoreOwnerLayout = ({ userType, navbarData }) => {
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
          <Route path="/order" element={<Orders/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/analytics" element={<POS/>}/>
          <Route path="/employee" element={<Employees/>}/>
          <Route path="/settings" element={<StoreOwnerSettingsData/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  )
}
