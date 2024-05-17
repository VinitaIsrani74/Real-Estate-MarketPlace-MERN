import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import './listing.css'

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listingError, setListingError] = useState(false);
  const params = useParams();

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
    <div>
      {loading && <p>Loading...</p>}
      {listingError && <p>Something went wrong</p>}
      {listing && !loading && !listingError && <>
      <Swiper navigation>
{listing.imageUrls.map((url) =>(
    <SwiperSlide key={url}>
<div className="image-slider" style={{background:`url(${url}) center no-repeat`, backgroundSize: "cover"}}>

</div>
    </SwiperSlide>
))}
      </Swiper>

      </>}
    </div>
  );
};

export default Listing;
