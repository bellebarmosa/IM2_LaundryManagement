import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Sidebar/>
      <h1>Hi belle</h1>
    </>
  )
}

export default App
