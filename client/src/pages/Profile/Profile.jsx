import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRef } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import "./profile.css";
import { app } from "../../firebase";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../../Redux/user/userSlice";
const Profile = () => {
  const { currentUser , loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  
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
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)

    } catch (error) {
      dispatch(updateUserFailure(error.message))
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

  const handleDeleteUser = async () =>{
    try {
      deleteUserStart()
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })
const data = await res.json()
if(data.success === false){
  dispatch(deleteUserFailure(data.message))
  return
}

dispatch(deleteUserSuccess())


    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () =>{
    try {
      dispatch(signOutStart())
      const res = await fetch("/api/auth/signout");
      const data = await res.json()
      if(data.success === false){
        dispatch(signOutFailure(data.message))
        return
      }

      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(error.message))
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
          </form>
          <div className="profile-actions">
            <div onClick={handleDeleteUser} className="delete-account">Delete Account</div>
            <div className="log-out-account" onClick={handleSignOut}>Log Out</div>
          </div>
          {error && <p className="error-message">{error}</p>}
          {updateSuccess && <p className="success-message">User is Updated Successfully</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
