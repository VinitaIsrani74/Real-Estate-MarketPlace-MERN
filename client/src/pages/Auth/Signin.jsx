import React from 'react'
import {Link} from 'react-router-dom'
import './signin.css'
const Signin = () => {
  return (
    <div className='sign-in-container'>
    <div className="overlay-sign-in">
      <h1>Sign In</h1>
      <form className='sign-in-form'>

        <input
            type="email"
            placeholder="Email"
            className="sign-in-input"
            id="email"
            
          />
        <input type="password" placeholder='Password' className='sign-in-input'/>
        <button className='signin-btn'>Sign In</button>
      </form>
      <div className="sign-up-link-div">Don't have an account? <Link to="/sign-up" style={{textDecoration: "none"}}><span className='sign-up-link'>Sign Up</span></Link></div>
    </div>
  </div>
  )
}

export default Signin