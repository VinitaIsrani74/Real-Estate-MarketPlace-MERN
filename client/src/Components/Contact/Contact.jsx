import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import "./contact.css";
const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setmessage] = useState('');

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
const onChange = (e) =>{
  setmessage(e.target.value)
}

  return (
    <>
      {landlord && (
        <div className="contact-landlord-container">
          <p>
            Contact{" "}
            <span style={{ fontWeight: "800" }}>{landlord.username}</span> for{" "}
            <span style={{ fontWeight: "800" }}>
              {listing.name.toLowerCase()}
            </span>
          </p>
          <textarea name="message" id="message" rows="2" value={message} placeholder="Enter your message here..." onChange={onChange} className="contact-textarea"></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`} style={{textDecoration: "none"}}>
            <div className="send-msg-link">Send Message</div>
            
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
