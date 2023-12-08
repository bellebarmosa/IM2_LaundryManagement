import React from 'react'

const SignUp = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center w-full p-10">
        <div className='bg-brightYellow rounded-3xl p-10 h-3/5'>
          <p className="text-3xl text-center font-semibold text-darkBlue pb-7">Sign Up</p>
          <form>
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-row items-center gap-4">
                <div className='w-1/2'>
                  <p className="text-base text-darkBlue font-semibold pl-2">First Name <span style={{ color: 'red' }}>*</span></p>
                  <input type="text" className='bg-blue-100 h-9 rounded-xl outline-none pl-2'/>
                </div>
                <div className='w-1/2'>
                  <p className="text-base text-darkBlue font-semibold pl-2">Last Name <span style={{ color: 'red' }}>*</span></p>
                  <input type="text" className='bg-blue-100 h-9 rounded-xl outline-none pl-2'/>
                </div>
              </div>

              <div className="flex flex-col w-full">
                  <p className="text-base text-darkBlue font-semibold pl-2 select-none">Email Address <span style={{ color: 'red' }}>*</span></p>
                  <input type="email" className='bg-blue-100 h-9 rounded-xl outline-none pl-2'/>
              </div>

              <div className="flex flex-col w-full">
                  <p className="text-base text-darkBlue font-semibold pl-2 select-none">Phone Number <span style={{ color: 'red' }}>*</span></p>
                  <input type="text" className='bg-blue-100 h-9 rounded-xl outline-none pl-2'/>
              </div>

              <div className="flex flex-col w-full">
                  <p className="text-base text-darkBlue font-semibold pl-2 select-none">Current Address <span style={{ color: 'red' }}>*</span></p>
                  <textarea className='bg-blue-100  rounded-xl outline-none h-20 pl-2 pt-2'/>
              </div>

              <div className="flex flex-col w-full">
                  <p className="text-base text-darkBlue font-semibold pl-2 select-none">Password <span style={{ color: 'red' }}>*</span></p>
                  <input type="password" className='bg-blue-100 h-9 rounded-xl outline-none pl-2'/>
              </div>

              <div className="flex flex-col w-full">
                  <p className="text-base text-darkBlue font-semibold pl-2 select-none">Confirm Password <span style={{ color: 'red' }}>*</span></p>
                  <input type="password" className='bg-blue-100 h-9 rounded-xl outline-none pl-2'/>
              </div>


              <button className='h-9 w-fit bg-darkBlue rounded-2xl px-4 text-s font-semibold text-brightYellow'>Sign Up</button>
              <p>Already have an account?<a> Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp