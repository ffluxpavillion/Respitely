import React from 'react'
import './Login.scss'

export default function Login() {

  const loginUser = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <section className='login-section'>
        <h1 className='login-header'>LOGIN PAGE</h1>
        <form onSubmit={loginUser}>
          <label>Email</label>
          <input type='email' placeholder='Enter your email' />
          <label>Password</label>
          <input type='password' placeholder='Enter your password' />
          <button type='submit'>Login</button>
        </form>
      </section>
    </>
  )
}
