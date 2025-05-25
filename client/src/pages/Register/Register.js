import { useState } from 'react';
import './Register.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    orgName: '',
    email: '',
    phoneNumber: '',
    website: '',
    affiliatedService: '',
    proof: '',
    // password: '',
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
            Welcome to the Provider Registration Page.
            <br />
            <br />
            Please complete the form below to request access. Once verified and registered, you can add your
            meal service to the platform and update details as needed.
          </p>
        </div>
        <br />

        <form className='register-form' onSubmit={registerUser}>
        <label>First Name:</label>
          <input
            className='register-input'
            type='text'
            placeholder='Enter first name'
            value={data.name}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          <label>Last Name:</label>
          <input
            className='register-input'
            type='text'
            placeholder='Enter last name'
            value={data.name}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
          <label>Organization Name:</label>
          <input
            className='register-input'
            type='text'
            placeholder='Enter organization name'
            value={data.name}
            onChange={(e) => setData({ ...data, orgName: e.target.value })}
          />
          <label>Organization Email:</label>
          <input
            className='register-input'
            type='email'
            placeholder='Enter organization email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Phone Number:</label>
          <input
            className='register-input'
            type='text'
            placeholder='Enter phone number'
            value={data.name}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
          <label>Website:</label>
          <input
            className='register-input'
            type='text'
            placeholder='Enter URL'
            value={data.name}
            onChange={(e) => setData({ ...data, website: e.target.value })}
          />
          <label>Which meal service are you affiliated with?</label>
          <input
            className='register-input'
            type='text'
            placeholder='DROP DOWN MENU HERE'
            value={data.name}
            onChange={(e) => setData({ ...data, affiliatedService: e.target.value })}
          />
          <label>Proof of Affiliation</label>
          <input
            className='register-input'
            type='text'
            placeholder='FILE UPLOAD OR EXPLANATION HERE'
            value={data.name}
            onChange={(e) => setData({ ...data, proof: e.target.value })}
          />
          {/* <label>Password</label>
          <input
            className='register-input'
            type='password'
            placeholder='Enter password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          /> */}
          <button type='submit'>Submit</button>
        </form>
      </section>
    </>
  );
}
