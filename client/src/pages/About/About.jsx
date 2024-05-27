import React from "react";
import "./about.css";
const About = () => {
  return (
    <div className="about-container">
      <div className="about-overlay">
        <div className="about">
          <h1 className="about-heading">
            About <span>PropertyPulse...</span>
          </h1>
          <div className="content">
            <p>
              Sure! Here is a 20-line description of real estate services on
              behalf of PropertyPulse company, written in simple words: At
              PropertyPulse, we make finding your dream home easy. Our app
              offers a seamless property search experience, giving you access to
              a vast database of listings. Whether you're looking for a cozy
              apartment, a spacious family home, or a luxurious villa, we have
              something for everyone.
            </p>
            <p>
              Our advanced search filters let you customize your search to match
              your needs. You can filter by location, price, size, and many
              other features to find the perfect fit. PropertyPulse also
              provides detailed property information, including photos,
              descriptions, and virtual tours, so you can explore homes from the
              comfort of your own space.
            </p>
            <p>
              We believe in making your home-buying journey smooth and
              stress-free. Our team of experts is always ready to assist you,
              offering personalized recommendations and professional advice. We
              also provide tools to help you calculate mortgage payments and
              understand the buying process.
            </p>
            <p>
              At PropertyPulse, we go beyond just buying and selling. We connect
              you with trusted real estate agents and service providers to help
              with every step of the process, from inspections to moving. Our
              goal is to be your one-stop shop for all your real estate needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
