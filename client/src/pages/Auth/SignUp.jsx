import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.css";
import OAuth from "../../Components/OAuth/OAuth";
const SignUp = () => {
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
      const res = await fetch("/api/auth/signup", {
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
      navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(data.message);
    }
  };
  console.log(formData);
  return (
    <div className="sign-up-container">
      <div className="overlay-sign-up">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <input
            type="text"
            placeholder="Username"
            className="sign-up-input"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="sign-up-input"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="sign-up-input"
            id="password"
            onChange={handleChange}
          />
          <button disabled={loading} className="signup-btn">
            {loading ? "Loading" : "Sign Up"}
          </button>
          <OAuth />
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="sign-in-link-div">
          Already have an account? {" "}
          <Link to="/sign-in" style={{ textDecoration: "none" }}>
            <span className="sign-in-link">Sign In</span>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default SignUp;
