import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import "./profile.css";
import { app } from "../../firebase";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

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
          <form className="profile-form">
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
  );
};

export default Profile;
