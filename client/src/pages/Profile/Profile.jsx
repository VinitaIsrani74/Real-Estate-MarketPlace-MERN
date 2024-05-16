import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import "./profile.css";
import { app } from "../../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../Redux/user/userSlice";
const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
          setFormData({ ...formData, avatar: downloadurl });
        });
      }
    );
  };

  const handleDeleteUser = async () => {
    try {
      deleteUserStart();
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) =>{
try {
  const res = await fetch(`/api/listing/delete/${listingId}`,{
    method: 'DELETE'
  })
  const data = await res.json()
  if(data.success===false){
    console.log(data.message);
    return
  }
  setUserListings((prev) => prev.filter((listing) => listing._id !==listingId))
} catch (error) {
  console.log(error);
}
  }
  return (
    <div className="profile-container">
      <div className="right-container">
        <div className="profile-right">
          <div className="profile">
            <div className="profile-bg">
              <img
                src={formData.avatar || currentUser.avatar}
                alt="profile"
                className="profile-img"
                onClick={() => fileRef.current.click()}
              />
            </div>
            <p>
              {fileUploadError ? (
                <span style={{ color: "red" }}>
                  Error While Uploading the image (Image must be less than 2MB)
                </span>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <span>{`Uploading ${filePercentage}`}</span>
              ) : filePercentage === 100 ? (
                <span style={{ color: "green" }}>
                  Image Successfully Uploaded
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="profile-form">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              id="file"
              accept="image/*"
            />
            <input
              type="text"
              placeholder="Username"
              className="profile-input"
              defaultValue={currentUser.username}
              id="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="profile-input"
              defaultValue={currentUser.email}
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="profile-input"
              id="password"
              onChange={handleChange}
            />
            <button disabled={loading} className="profile-btn">
              {loading ? "Loading" : "Update"}
            </button>
            <Link
              style={{ textDecoration: "none" }}
              to="/create-listing"
              className="listing-link"
            >
              Create Listing
            </Link>
          </form>
          <div className="profile-actions">
            <div onClick={handleDeleteUser} className="delete-account">
              Delete Account
            </div>
            <div className="log-out-account" onClick={handleSignOut}>
              Log Out
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          {updateSuccess && (
            <p className="success-message">User is Updated Successfully</p>
          )}
        </div>
      </div>
      <button onClick={handleShowListings} className="show-listing-btn">
        Show Listings
      </button>
      {showListingsError && (
        <p className="error-message">{showListingsError}</p>
      )}
      <div className="listing-container">
        {userListings &&
          userListings.length > 0 &&
          userListings.map((listing) => (
            <div key={listing._id} className="listing">
              <div className="list-left">
              <Link
                style={{ textDecoration: "none" }}
                to={`/listing/${listing._id}`}
                className="show-listing-link"
              >
                <img
                  src={listing.imageUrls[0]}
                  alt="listingcover"
                  className="listing-img"
                />
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                to={`/listing/${listing._id}`}
                className="show-listing-link"
              >
                <p className="list-title">{listing.name}</p>
              </Link>
              </div>
<div className="listing-action-btn">
              <button onClick={() => handleListingDelete(listing._id)} className="list-delete-btn">
                Delete
              </button>
              <Link
                style={{ textDecoration: "none" }}
                to={`/update-listing/${listing._id}`}
                className="show-listing-link"
              >
              <button className="list-edit-btn">

                Edit
              </button>
              </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
