import React from 'react'
import Logo from '../iWashify.png'

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
        <div className='flex flex-col items-center justify-center bg-brightYellow rounded-3xl p-10 w-3/12'>
          <img src={Logo} className='w-28 rounded-3xl select-none'/>
          <p className='font-semibold text-darkBlue text-5xl font-alegreya-sans select-none'>iWashify</p>
          <p className="text-3xl text-center font-semibold text-darkBlue pb-7 pt-6">Login</p>
          <form>
            <div className="flex flex-col items-center gap-5">

              <div className="flex flex-col w-full">
                  <p className="text-base text-darkBlue font-semibold pl-2 select-none">Email Address</p>
                  <input type="email" className='bg-blue-100 h-9 rounded-xl outline-none pl-2'/>
              </div>

              <div className="flex flex-col w-full pb-5">
                  <p className="text-base text-darkBlue font-semibold pl-2 select-none">Password</p>
                  <input type="text" className='bg-blue-100 h-9 rounded-xl outline-none pl-2'/>
              </div>

              <button className='h-12 w-1/2 bg-darkBlue rounded-2xl px-7 text-s font-semibold text-brightYellow'>Login</button>
              <p>Dont have an account? <a>Sign Up</a></p>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Login