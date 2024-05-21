import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaBath } from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";
import { PiArmchairFill } from "react-icons/pi";
import { IoLocation } from "react-icons/io5";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "./listing.css";
import Contact from "../../Components/Contact/Contact";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  //swiper

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setListingError(true);
          return;
        }
        setListing(data);
        setLoading(false);
        setListingError(false);
      } catch (error) {
        setListingError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div className="list">
      {loading && <p>Loading...</p>}
      {listingError && <p>Something went wrong</p>}
      {listing && !loading && !listingError && (
        <div className="list-container">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="image-slider"
                  style={{
                    background: `url(${url}) no-repeat center`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="list-desc">
            <div className="listing-name">{listing.name}</div>
            <div className="listing-address">
              <IoLocation style={{ color: "green" }} />
              {listing.address}
            </div>

            <div className="type-price-container">
              <div className="listing-type">For {listing.type}</div>
              <div className="listing-price">
                {listing.offer ? (
                  <div>${+listing.regularPrice - +listing.discountPrice}</div>
                ) : (
                  listing.regularPrice
                )}
              </div>
            </div>
            <div className="listing-desc">
              <strong>Description - </strong> {listing.description}
            </div>
            <div className="listing-features">
              <ul className="listing-detail">
                <li>
                  <MdOutlineBedroomParent style={{ color: "green" }} />{" "}
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Beds`
                    : `${listing.bedrooms} Bed`}
                </li>
                <li>
                  <FaBath style={{ color: "green" }} />{" "}
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Baths`
                    : `${listing.bathrooms} Bath`}
                </li>
                <li>
                  <FaSquareParking style={{ color: "green" }} />{" "}
                  {listing.parking ? "Parking" : "No Parking"}
                </li>
                <li>
                  <PiArmchairFill style={{ color: "green" }} />{" "}
                  {listing.furnished ? " Furnished" : "Not Furnished"}{" "}
                </li>
              </ul>
            </div>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="contact-landlord-btn"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
