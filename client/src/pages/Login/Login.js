import { useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post(
        'http://localhost:8080/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate('/dashboard');
        window.location.reload();
      }
    } catch (error) {}
  };
  return (
    <>
      <section className='login-section'>
        <div className='login-upper'>
          <h1 className='login-header'>PROVIDER LOGIN PAGE</h1>
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