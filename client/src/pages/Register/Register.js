import { useState } from 'react';
import './Register.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password } = data;
    try {
      const response = await axios.post('http://localhost:8080/register', {
        name,
        email,
        password,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success('Registration Sucessful. Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };
  return (
    <>
      <section className='register-section'>
        <div className='register-upper'>
          <h1 className='register-header'>
            PROVIDER REGISTRATION PAGE
          </h1>
          <br />
          <p className='register-text'>
            Welcome to the Drop-In Service Provider Registration Page.
            <br />
            <br />
            Please complete the form below to register your organization with
            Respitely. Once registered, you will be able to add your
            organization to the drop-in map, and update your information as
            needed.
          </p>
        </div>

        <form className='register-form' onSubmit={registerUser}>
          <label>Organization Name:</label>
          <input
            className='register-input'
            type='text'
            placeholder='Enter organization name'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label>Organization Email:</label>
          <input
            className='register-input'
            type='email'
            placeholder='Enter email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Password</label>
          <input
            className='register-input'
            type='password'
            placeholder='Enter password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button type='submit'>Submit</button>
        </form>
      </section>
    </>
  );
}
