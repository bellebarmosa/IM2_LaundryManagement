import { useEffect, useState } from 'react'
import Axios from 'axios'
import './App.css'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import PosPage from './components/posPage'
import popUPgarment from './components/PopUPgarment'
import Signup from './components/Signup'
import AdminOrders from './components/pages/AdminOrders'
import AdminCustomers from './components/pages/AdminCustomers'
import AdminEmployees from './components/pages/AdminEmployees'
import AdminServices from './components/pages/AdminServices'
import AdminDashboard from './components/pages/AdminDashboard'
import RecentOrders from './components/modules/admin-dashboard/RecentOrdersAdmin'
import OrderDetails from './components/OrderDetails'
import POS from './components/POS'

function App() {

  return (
  <Router>
    <div className='App'>

      <Routes>

      <Route exact path='/POS' Component={POS}/>
      <Route exact path='/OrderDetails/:id' Component={OrderDetails}/>
      <Route exact path='/AdminCustomers' Component={AdminCustomers}/>
      <Route exact path='/RecentOrders' Component={RecentOrders}/>
      <Route exact path='/AdminDashboard' Component={AdminDashboard}/>
        
      <Route exact path='/AdminServices' Component={AdminServices}/>
        <Route exact path='/AdminOrders' Component={AdminOrders}/>
        <Route exact path='/admin-employees' Component={AdminEmployees}/>

        <Route exact path='/' Component={Login}/>

        <Route exact path='/pos' Component={PosPage}/>

        <Route exact path='/signup' Component={Signup}/>
        
    

      </Routes>


    </div>
  </Router>
   
  )
}

export default App
