import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Signin from "./pages/Auth/Signin";
import SignUp from "./pages/Auth/SignUp";
import Profile from "./pages/Profile/Profile";
import Header from "./Components/Header/Header";
import "./App.css";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import CreateListing from "./pages/createListing/CreateListing";
import UpdateListing from "./pages/UpdateListing/UpdateListing";
import Listing from "./pages/Listing/Listing";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/listing/:listingId" element={<Listing />} />
<Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
