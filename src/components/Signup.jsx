import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomInput = ({ label, type, value, onChange, required }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} required={required} />
  </div>
);

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // password match 
    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }

    // form submit?
    console.log({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password,
    });
  };

  return (
    <div className="signupbox">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput className="form1"
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <CustomInput className="form2"
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <CustomInput className="form1"
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <CustomInput className="form2"
          label="Phone Number"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <CustomInput className="form1"
          label="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <CustomInput className="form1"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <CustomInput className="form2"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="button1" type="submit">
          Create Account
        </button>

        <p>
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
