import React from 'react'
import {Link} from 'react-router-dom'
import './signUp.css'
const SignUp = () => {
  return (
    <div className='sign-up-container'>
      <div className="overlay-sign-up">
        <h1>Sign Up</h1>
        <form className='sign-up-form'>
          <input type="text" placeholder='Username' className='sign-up-input'/>
          <input type="email"  placeholder='Email' className='sign-up-input'/>
          <input type="password" placeholder='Password' className='sign-up-input'/>
          <button className='signup-btn'>Sign Up</button>
        </form>
        <div className="sign-in-link-div">Already have an account? <Link to="/sign-in" style={{textDecoration: "none"}}><span className='sign-in-link'>Sign In</span></Link></div>
      </div>
    </div>
  )
}

export default SignUp