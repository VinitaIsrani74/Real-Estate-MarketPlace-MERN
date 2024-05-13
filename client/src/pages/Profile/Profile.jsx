import React from "react";
import { useSelector } from "react-redux";

import "./profile.css";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="profile-container">
      <div className="ovaerlay-profile">
        <div className="left-container">
          <div className="profile-right">
            <div className="profile-bg">
            <img src={currentUser.avatar} alt="profile" className="profile-img"/>
            </div>
            <form className="profile-form">
              <input
                type="text"
                placeholder="Username"
                className="profile-input"
                id="username"
              />
              <input
                type="email"
                placeholder="Email"
                className="profile-input"
                id="email"
              />
              <input
                type="password"
                placeholder="Password"
                className="profile-input"
                id="password"
              />
              <button className="profile-btn">Update</button>
            </form>
            <div className="profile-actions">
              <div className="delete-account">Delete Account</div>
              <div className="log-out-account">Log Out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
