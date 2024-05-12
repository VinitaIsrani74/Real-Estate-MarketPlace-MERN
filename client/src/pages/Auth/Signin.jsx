import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import { signInStart, signInSuccess, signInFailure } from "../../Redux/user/userSlice";
import "./signin.css";
const Signin = () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="sign-in-container">
      <div className="overlay-sign-in">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="sign-in-form">
         
          <input
            type="email"
            placeholder="Email"
            className="sign-in-input"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="sign-in-input"
            id="password"
            onChange={handleChange}
          />
          <button disabled={loading} className="signup-btn">
            {loading ? "Loading" : "Sign In"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="sign-up-link-div">
          Dont have an account?
          <Link to="/sign-up" style={{ textDecoration: "none" }}>
            <span className="sign-up-link">Sign Up</span>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Signin;
