// NOT FINAL LACKING SM SHIT

import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoplaceholder from './assets/logo-placeholder.png';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [select, setSelect] = useState();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="loginbox">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <img src={logoplaceholder} className="logo"/>
      <h1>Login</h1>
      <p>Welcome! Log in to your account to access iWASHIFY.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="inputlabel">Email Address:</label>
        <input
          className="input"
          type="email"
          id="email"
          ref={userRef}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password" className="inputlabel">Password:</label>
        <input
          className="input"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <label htmlFor="login-as" className="inputlabel">Login as:</label>
        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          <option>Customer</option>
          <option>Vendor</option>
        </select>

        <button className="submitlogin">Login</button>
      </form>
      <p>
        Don't have an account? 
        <span className="line">
          <Link to="/signup"> Sign Up</Link>
        </span>
      </p>
    </div>
  )
}

export default Login
