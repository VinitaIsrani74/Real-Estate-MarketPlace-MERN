import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
const Signin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(data.message);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="overlay-sign-in">
        <h1>Sign Up</h1>
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
          Dont have an account?{" "}
          <Link to="/sign-up" style={{ textDecoration: "none" }}>
            <span className="sign-up-link">Sign Up</span>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Signin;
