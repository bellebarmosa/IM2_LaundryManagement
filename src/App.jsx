import { useEffect, useState } from 'react'
import Axios from 'axios'
import './App.css'
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import PosPage from './components/posPage'
import popUPgarment from './components/PopUPgarment'
import Signup from './components/Signup'


function App() {
  


  return (
  <Router>
    <div className='App'>

      <Routes>
        <Route exact path='/' Component={Login}/>

        <Route exact path='/pos' Component={PosPage}/>

        <Route exact path='/signup' Component={Signup}/>
        
    

      </Routes>


    </div>
  </Router>
   
  )
}

export default App
