import { useState } from 'react';
import './Login.scss';
import axios from 'axios';

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.get('http://localhost:8080');
    axios.defaults.withCredentials = true;
  };
  return (
    <>
      <section className='login-section'>
        <div className='login-upper'>
          <h1 className='login-header'>LOGIN PAGE</h1>
          <br />
          <p className='login-text'>
            Welcome to the Drop-In Service Provider Login Page.
            <br />
            <br />
            Please login below to access your organization's information.
          </p>
        </div>
        <div className='login-lower'>
          <form className='login-form' onSubmit={loginUser}>
            <label>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button type='submit'>Login</button>
          </form>
        </div>
      </section>
    </>
  );
}
