import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";
import ListingItem from "../../Components/ListingItem/ListingItem";
const Search = () => {
  const navigate = useNavigate()
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  console.log(listings);
useEffect(()=>{
  const urlParams = new URLSearchParams(location.search)
  const searchTermFromUrl = urlParams.get('searchTerm')
  const typeFromUrl = urlParams.get('type')
  const parkingFromUrl = urlParams.get('parking')
  const furnishedFromUrl = urlParams.get('furnished')
  const offerFromUrl = urlParams.get('offer')
  const sortFromUrl = urlParams.get('sort')
  const orderFromUrl = urlParams.get('order')

  if(
    searchTermFromUrl||
    typeFromUrl||
    parkingFromUrl ||
    furnishedFromUrl ||
    offerFromUrl ||
    sortFromUrl ||
    orderFromUrl
  ){
    setSideBarData({
      searchTerm : searchTermFromUrl || '',
      type: typeFromUrl|| 'all',
      parking: parkingFromUrl === 'true' ? true : false,
      furnished: furnishedFromUrl === 'true' ? true : false,
     offer: offerFromUrl === 'true' ? true : false,
      sort: sortFromUrl || 'created_at',
      order: orderFromUrl ||  'desc'
    })
  }

  const fetchListings = async () =>{
    setLoading(true)
    setShowMore(false)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if(data.length > 8){
      setShowMore(true)
    }
    else{
      setShowMore(false)
    }
    setLoading(false)
   setListings(data)
  }
  fetchListings()
},[location.search])
 
  
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "sale" ||
      e.target.id === "rent"
    ) {
      setSideBarData({
        ...sideBarData,
        type: e.target.id,
      });
    }
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSideBarData({
        ...sideBarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSideBarData({
        ...sideBarData,
        sort,
        order,
      });
    }
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm', sideBarData.searchTerm)
    urlParams.set('type', sideBarData.type)
    urlParams.set('parking', sideBarData.parking)
    urlParams.set('furnished', sideBarData.furnished)
    urlParams.set('offer', sideBarData.offer)
    urlParams.set('sort', sideBarData.sort)
    urlParams.set('order', sideBarData.order)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  const onShowMoreClick = async () =>{
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex', startIndex)
    const searchQuery = urlParams.toString()
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if(data.length < 9){
      setShowMore(false)
    }
    setListings([...listings, ...data])
  }
  return (
    <div className="search-container">
      <div className="search-left">
        <form onSubmit={handleSubmit} className="search-detail-container">
          <div className="input-container">
            <label>Search Term: </label>
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="Search..."
              className="search-input"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="type-container">
            <label>Type:</label>
            <div>
              <input
                type="checkbox"
                name="all"
                id="all"
                onChange={handleChange}
                checked={sideBarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="rent"
                id="rent"
                onChange={handleChange}
                checked={sideBarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="sale"
                id="sale"
                onChange={handleChange}
                checked={sideBarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="offer"
                id="offer"
                onChange={handleChange}
                checked={sideBarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="amenities-container">
            <label>Amenities:</label>
            <div>
              <input
                type="checkbox"
                name="parking"
                id="parking"
                onChange={handleChange}
                checked={sideBarData.parking}
              />
              <span>Parking</span>
            </div>
            <div>
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                onChange={handleChange}
                checked={sideBarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="sort-container">
            <label>Sort:</label>
            <select
              name="sort_order"
              id="sort_order"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="search-btn">Search</button>
        </form>
      </div>

      <div className="search-right">
        <h1>Listing results:</h1>
        <div className="listings-container">
          {!loading && listings.length === 0 &&(
            <p className="no-listing-found-para">No Listing found!</p>
          )}
          {loading &&(
            <p className="loading-para">Loading...</p>
          )}
          {!loading && listings && listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}
        </div>
        {showMore && (
          <button onClick={onShowMoreClick}>
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
