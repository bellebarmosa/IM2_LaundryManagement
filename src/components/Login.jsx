import { useEffect, useState } from 'react'
import Axios from 'axios'
import '../App.css'
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const[loginStatus,setLoginStatus]= useState("")
    const [select, setSelect] = useState();
  
    Axios.defaults.withCredentials = true;
  
    const login = (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      Axios.post('http://localhost:3001/user/login', {
        employee_eMail: email,
        employee_password: password,
      })
        .then((response) => {
          console.log(response);
  
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            console.log(response.data[0]);
            // setLoginStatus(response.data[0].employee_name);
            navigate('/pos'); // Navigate to /pos after successful login
          }
        })
        .catch((error) => {
          console.error('Login error:', error);
          setLoginStatus('An error occurred during login.');
        });
    };
  
    useEffect(() => {
      Axios.get('http://localhost:3001/user/login').then((response) => {
        if (response.data.loggedIn === true) {
          navigate('/pos');
        }
      });
    }, [navigate]);
  


    return ( 
<div className='App'>
    

<h1>Login</h1>
      <p>Welcome! Log in to your account to access iWASHIFY.</p>
      <form onSubmit={login}>
        <label htmlFor="email" className="inputlabel">Email Address:</label>
        <input
          className="input"
          type="email"
          id="email"
          // ref={userRef}
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
          <option value="Customer">Customer</option>
          <option value="Vendor">Vendor</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit"className="submitlogin">
          Login
          </button>
      </form>
      <p>
        Don't have an account? 
        <span className="line">
          <Link to="./components/Signup"> Sign Up</Link>
        </span>
      </p>   
    <h1>{loginStatus}</h1>  
    </div>
     );
}
 
export default Login;