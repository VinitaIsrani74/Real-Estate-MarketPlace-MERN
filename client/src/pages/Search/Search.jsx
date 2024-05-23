import React from "react";
import "./search.css";
const Search = () => {
  return (
    <div className="search-container">

      <div className="search-left">
        <form className="search-detail-container">
          <div className="input-container">
            <label>Search Term: </label>
            <input type="text" name="searchTerm" id="searchTerm" placeholder="Search..." className="search-input"/>
          </div>
          <div className="type-container">
            <label>
                Type:
            </label>
            <div>
                <input type="checkbox" name="all" id="all" />
                <span>Rent & Sale</span>
            </div>
            <div>
                <input type="checkbox" name="rent" id="rent" />
                <span>Rent</span>
            </div>
            <div>
                <input type="checkbox" name="sale" id="sale" />
                <span>Sale</span>
            </div>
            <div>
                <input type="checkbox" name="offer" id="offer" />
                <span>Offer</span>
            </div>
          </div>
          <div className="amenities-container">
            <label>
                Amenities:
            </label>
            <div>
                <input type="checkbox" name="parking" id="parking" />
                <span>Parking</span>
            </div>
            <div>
                <input type="checkbox" name="furnished" id="furnished" />
                <span>Furnished</span>
            </div>
            
          </div>
          <div className="sort-container">
            <label >Sort:</label>
            <select name="sort_order" id="sort_order">
                <option>Price high to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>Oldest</option>
            </select>
          </div>
          <button className="search-btn">Search</button>
        </form>
      </div>


      <div className="search-right">
        <h1>Listing results:</h1>
      </div>
    </div>
  );
};

export default Search;
