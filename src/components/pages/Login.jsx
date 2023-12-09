
import Logo from '../pages/iWashify.png';
import React, { useState } from 'react';
import Axios from 'axios';

const Login = () => {
  // State to manage form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
Axios.defaults.withCredentials = true;
  // State to manage login status and error messages
  const [loginStatus, setLoginStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  Axios.defaults.withCredentials = true;
  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:3001/user/login', {
        employee_eMail: email,
        employee_password: password,
      });
      if (response.data.token) {
        console.log('response.data.token');
        Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setUserType(response.data.user.employee_role);
        setnavbarData([
          {
            currentPage: 'Dashboard',
            name: response.data.user.employee_name,
            email: response.data.user.employee_eMail,
          },
        ]);
      } else {
        console.log('i went not here');
        setLoginStatus('error');
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('error');
      setErrorMessage('Internal Server Error');
    }
  };


  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className='flex flex-col items-center justify-center bg-brightYellow rounded-3xl p-10 w-3/12'>
        <img src={Logo} className='w-28 rounded-3xl select-none' alt="iWashify Logo" />
        <p className='font-semibold text-darkBlue text-5xl font-alegreya-sans select-none'>iWashify</p>
        <p className="text-3xl text-center font-semibold text-darkBlue pb-7 pt-6">Login</p>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col w-full">
              <p className="text-base text-darkBlue font-semibold pl-2 select-none">Email Address</p>
              <input
                type="email"
                className='bg-blue-100 h-9 rounded-xl outline-none pl-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-full pb-5">
              <p className="text-base text-darkBlue font-semibold pl-2 select-none">Password</p>
              <input
                type="password"
                className='bg-blue-100 h-9 rounded-xl outline-none pl-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className='h-12 w-1/2 bg-darkBlue rounded-2xl px-7 text-s font-semibold text-brightYellow' type="submit">Login</button>
            {loginStatus === 'error' && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <p>Dont have an account? <a href="/">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login