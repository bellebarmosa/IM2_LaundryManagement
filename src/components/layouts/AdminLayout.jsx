import React from 'react'
import { Route, Routes } from 'react-router';

import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Dashboard from '../pages/Dashboard';
import POS from '../pages/POS';
import Orders from '../pages/Orders';
import Services from '../pages/Services';
import Analytics from '../pages/Orders';
import AdminSettings from '../pages/settings/AdminSettingsData';
import Employee from '../pages/Employees';

import { NotFound } from '../pages/NotFound';

export const AdminLayout = ({ userType, navbarData }) => {
  return (
    <div className='flex flex-row h-screen'>
      <div className='w-fit p-5'>
        <Sidebar userType={ userType } />
      </div>
      <div className="flex flex-col h-full w-11/12 p-5 rounded-t-3xl">
        <Navbar navbarData={ navbarData }/>
        <Routes>
          <Route path="/" element={<Dashboard userType={ userType } />}/>
          <Route path="/dashboard" element={<Dashboard userType={ userType } />}/>
          <Route path="/pos" element={<POS/>}/>
          <Route path="/order" element={<Orders/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/analytics" element={<NotFound/>}/>
          <Route path="/user" element={<Employee/>}/>
          <Route path="/settings" element={<AdminSettings/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  )
}
