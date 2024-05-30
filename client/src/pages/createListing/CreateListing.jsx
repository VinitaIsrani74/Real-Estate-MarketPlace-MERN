import React, { useState } from "react";
import "./createListing.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
 
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
const {currentUser} = useSelector(state => state.user)
const navigate = useNavigate()
  const handleImageSubmit = (e) => {
    if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
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

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if(e.target.id === 'parking' || e.target.id === "furnished" || e.target.id === "offer"){
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }

    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    }
  };

  const handleSubmit =async (e) =>{
    e.preventDefault();
    try {
      if(formData.imageUrls.length < 1) return setError("You must upload atleast one image")
      if(+formData.regularPrice < +formData.discountPrice) return setError("Discount price must be lower than regular price")
      setLoading(true)
      setError(false)
      const res = await fetch(`/api/listing/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData,
          userRef: currentUser._id
        }),
      });
      const data = await res.json();
      setLoading(false)
      if (data.success === false) {
        setError(data.message)
        return;
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }
  return (
    <div className="create-listing">
      <div className="listing-upper">
        <div className="listing-overlay"></div>
      </div>
      <div className="listing-lower">
        <h1>Create Listing</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-left">
            <input
              type="text"
              placeholder="Name"
              className="listing-input"
              id="name"
              maxLength="62"
              minLength="10"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <textarea
              type="text"
              placeholder="Description..."
              className="listing-textarea"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="listing-input"
              id="address"
              name="address"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="check-box-container">
              <div className="check-box">
                <input
                  type="checkbox"
                  id="sale"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                  className="checkbox"
                />
                <span>Sell</span>
              </div>
              <div className="check-box">
                <input
                  type="checkbox"
                  id="rent"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                  className="checkbox"
                />
                <span>Rent</span>
              </div>
              <div className="check-box">
                <input
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                  className="checkbox"
                />
                <span>Parking Spot</span>
              </div>
              <div className="check-box">
                <input
                  type="checkbox"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                  className="checkbox"
                />
                <span>Furnished</span>
              </div>
              <div className="check-box">
                <input
                  type="checkbox"
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                  className="checkbox"
                />
                <span>Offer</span>
              </div>
            </div>

            <div className="rooms-container">
              <div className="rooms">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChange}
                  value={formData.bedrooms}
                  className="room-input"
                />
                <p>Beds</p>
              </div>
              <div className="rooms">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChange}
                  value={formData.bathrooms}
                  className="room-input"
                />
                <p>Baths</p>
              </div>
              <div className="rooms">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="1000000"
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                  className="room-input"
                />
                <div>
                  <p>Regular Price</p>
                  <span>$ / months</span>
                </div>
              </div>

              {formData.offer && (
                <div className="rooms">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="100000000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                  className="room-input"
                />
                <div>
                  <p>Discounted Price</p>
                  <span>$ / months</span>
                </div>
              </div>
              )}
              
            </div>
          </div>

          <div className="form-right">
            <p className="listing-images-heading">
              Images:
              <span> The first image will be the cover (max 6)</span>
            </p>
            <div className="listing-images-container">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="file-input"
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


            <p className="error-msg">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="uploading-container">
                <img src={url} alt="imageurl" className="listing-upload-img" />
                <button type="button" onClick={() => handleRemoveImage(index)} className="image-delete-btn">
                  Delete
                </button>
              </div>
            ))}
          <button  className="create-listing-btn" disabled={loading || uploading}>{loading ? "Loading" : "Create Listing"}</button>
          {error && <p className="error-msg">{error}</p>}
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
