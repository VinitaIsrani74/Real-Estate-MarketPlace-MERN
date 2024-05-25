import React from "react";
import { Link } from "react-router-dom";
import "./listingItem.css";

import { IoLocation } from "react-icons/io5";
const ListingItem = ({ listing }) => {
  return (
    <div className="listing-item-container">
      <Link to={`/listing/${listing._id}`} style={{ textDecoration: "none" }} className="list-item">
        <img
          src={listing.imageUrls[0] || "https://www.orientalrealty.com.my/wp-content/uploads/2020/11/Successful-Real-Estate-Investors-Share-These-6-Traits-Precursors.jpg"}
          alt="listingcover"
          className="listing-cover-image"
        />
        <div className="listing-detail-container">
          <p className="listitem-name">{listing.name}</p>
          <div className="listing-address">
            <IoLocation />
            <p className="address">{listing.address}</p>
          </div>
       
        <div className="listing-des">
            {listing.description}
        </div>
        <div className="listing-item-price">
            {listing.offer ?<p className="listing-regular-price">$ {listing.regularPrice }</p> : ""}
            $ {listing.offer ? listing.discountPrice.toLocaleString('en-US') 
            : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
        </div>
        <div className="bed-bath">
            <div className="beds">
                {listing.bedrooms >1 ? `${listing.bedrooms} Beds`: `${listing.bedrooms} Bed`}
            </div>
            <div className="bath">
                {listing.bathrooms >1 ? `${listing.bathrooms} Baths`: `${listing.bathrooms} Bath`}
            </div>
        </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
