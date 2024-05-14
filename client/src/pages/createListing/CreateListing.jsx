import React, { useState } from "react";
import "./createListing.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
const CreateListing = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log(formData);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);


  const handleImageSubmit = (e) => {
    if (images.length > 0 && images.length + formData.imageUrls.length< 7) {
      setUploading(true)
      setImageUploadError(false)
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false)
        setUploading(false)
      }).catch((err) =>{
        setImageUploadError('Image upload failed (2 mb max per image)')
        setUploading(false)
      })
    }
    else{
      setImageUploadError("You can only upload 6 images per listing")
      setUploading(false)
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(Math.round(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
            resolve(downloadurl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) =>{
setFormData({
  ...formData ,
  imageUrls: formData.imageUrls.filter((_, i) => i !== index)
})
  }
  return (
    <div className="create-listing">
      <div className="listing-upper">
        <div className="listing-overlay"></div>
      </div>
      <div className="listing-lower">
        <h1>Create Listing</h1>
        <form>
          <div className="form-left">
            <input
              type="text"
              placeholder="Name"
              className="listing-input"
              id="lname"
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              type="text"
              placeholder="Description..."
              className="listing-textarea"
              id="ldesc"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="listing-input"
              id="laddress"
              name="address"
              maxLength="62"
              minLength="10"
              required
            />
            <div className="check-box-container">
              <div className="check-box">
                <input type="checkbox" id="sale" />
                <span>Sell</span>
              </div>
              <div className="check-box">
                <input type="checkbox" id="rent" />
                <span>Rent</span>
              </div>
              <div className="check-box">
                <input type="checkbox" id="parking" />
                <span>Parking Spot</span>
              </div>
              <div className="check-box">
                <input type="checkbox" id="furnished" />
                <span>Furnished</span>
              </div>
              <div className="check-box">
                <input type="checkbox" id="offer" />
                <span>Offer</span>
              </div>
            </div>

            <div className="rooms-container">
              <div className="rooms">
                <input type="number" id="bedrooms" min="1" max="10" required />
                <p>Beds</p>
              </div>
              <div className="rooms">
                <input type="number" id="bathrooms" min="1" max="10" required />
                <p>Baths</p>
              </div>
              <div className="rooms">
                <input
                  type="number"
                  id="regularprice"
                  min="1"
                  max="10"
                  required
                />
                <div>
                  <p>Regular Price</p>
                  <span>$ / months</span>
                </div>
              </div>
              <div className="rooms">
                <input
                  type="number"
                  id="discountprice"
                  min="1"
                  max="10"
                  required
                />
                <div>
                  <p>Discounted Price</p>
                  <span>$ / months</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-right">
            <p className="listing-images-heading">
              Images:
              <span>The first image will be the cover (max 6)</span>
            </p>
            <div className="listing-images-container">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={(e) => setImages(e.target.files)}
              />
              <button
              disabled={uploading}
                type="button"
                onClick={handleImageSubmit}
                className="upload-img-btn"
              >
                {uploading ? "Uploading" : "Upload"}
              </button>
            </div>
           
          </div>
          <p>{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) =>(
              <div key={url}>
              <img src={url} alt="imageurl" className="listing-upload-img"/>
              <button type="button" onClick={() => handleRemoveImage(index)}>Delete</button>
              </div>
            ))
          }
          <button className="create-listing-btn">Create Listing</button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
