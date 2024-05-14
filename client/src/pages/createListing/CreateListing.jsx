import React from "react";
import "./createListing.css";
const CreateListing = () => {
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
                    <input type="checkbox" id="sale"  />
                    <span>Sell</span>
                </div>
                <div className="check-box">
                    <input type="checkbox" id="rent"  />
                    <span>Rent</span>
                </div>
                <div className="check-box">
                    <input type="checkbox" id="parking"  />
                    <span>Parking Spot</span>
                </div>
                <div className="check-box">
                    <input type="checkbox" id="furnished"  />
                    <span>Furnished</span>
                </div>
                <div className="check-box">
                    <input type="checkbox" id="offer"  />
                    <span>Offer</span>
                </div>
            </div>

            <div className="rooms-container">
                <div className="rooms">
                    <input type="number" id="bedrooms" min="1" max="10" required/>
                    <p>Beds</p>
                </div>
                <div className="rooms">
                    <input type="number" id="bathrooms" min="1" max="10" required/>
                    <p>Baths</p>
                </div>
                <div className="rooms">
                    <input type="number" id="regularprice" min="1" max="10" required/>
                    <div>
                    <p>Regular Price</p>
                    <span>$ / months</span>
                    </div>
                </div>
                <div className="rooms">
                    <input type="number" id="discountprice" min="1" max="10" required/>
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
                <input type="file" id="images" accept="image/*" multiple/>
                <button className="upload-img-btn">Upload</button>
            </div>
          </div>

          <button className="create-listing-btn">Create Listing</button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
