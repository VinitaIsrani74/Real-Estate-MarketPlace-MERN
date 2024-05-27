import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "./home.css";
import "swiper/css/bundle";
import ListingItem from "../../Components/ListingItem/ListingItem";
const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(saleListings);
  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  }, []);
  return (
    <div className="home-page-container">
      {/* top */}
      <div className="home-top">
        <h1 className="home-top-h1">
          Find your <span>space</span>
          <br />
          Love where you live.
        </h1>
        <p className="home-top-p">
          PropertyPulse will help you find your home fast, easy and comfortable.{" "}
          <br />
          Our expert support is always available.
        </p>
        <Link style={{ textDecoration: "none", width: "100%" , color: "blue"}} to={`/search`}>
          Let's start now --{">"}
        </Link>
        <div></div>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide   key={listing._id}>
              <div
                className="image-slider"
              
                style={{
                  background: `url(${listing.imageUrls[0]}) no-repeat center`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className="listing-results-container">
        {offerListings && offerListings.length > 0 && (
          <div className="offer-result">
            <div>
              <h2 style={{color: "black", padding: "1rem", textTransform: "capitalize"}}>Recent Offers</h2>
              <Link
                style={{ textDecoration: "none", width: "100%" ,padding: "1rem",color: "blue" }}
                to={`/search?offer=true`}
              >
                Show More Offers
              </Link>
              <div className="listings-results">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* rent listings */}
        {rentListings && rentListings.length > 0 && (
          <div className="offer-result">
            <div>
              <h2 style={{color: "black",  padding: "1rem", textTransform: "capitalize"}}>Recent places for rent</h2>
              <Link
                style={{ textDecoration: "none", width: "100%",padding: "1rem" ,color: "blue" }}
                to={`/search?type=rent`}
              >
                Show More Places for rent
              </Link>
              <div className="listings-results">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* sale listings */}
        {saleListings && saleListings.length > 0 && (
          <div className="offer-result">
            <div>
              <h2 style={{color: "black",  padding: "1rem", textTransform: "capitalize"}}>Recent places for Sale</h2>
              <Link
                style={{ textDecoration: "none", width: "100%",padding: "1rem",color: "blue" }}
                to={`/search?type=sale`}
              >
                Show More Places for sale
              </Link>
              <div className="listings-results">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
