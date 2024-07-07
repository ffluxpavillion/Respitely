import { useState } from 'react'
import './Register.scss'

export default function Register() {
  const [data, setdata] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <section className='register-section'>
        <div className='register-upper'>
          <h1 className='register-header'>DROP-IN SERVICE PROVIDER REGISTRATION PAGE</h1>
          <br />
          <p className='register-text'>
          Welcome to the Drop-In Service Provider Registration Page.
          <br />
          Please complete the form below to register your organization with Respitely.
          Once registered, you will be able to add your organization to the
          drop-in map, and update your information as needed.
        </p>
        </div>

        <form className='register-form' onSubmit={registerUser}>
          <label>Name:</label>
          <input type='text' placeholder='Enter your name' />
          <label>Email:</label>
          <input type='email' placeholder='Enter your email' />
          <label>Password</label>
          <input type='password' placeholder='Enter your password' />
          <button type='submit'>Submit</button>
        </form>
      </section>
    </>
  )
}
