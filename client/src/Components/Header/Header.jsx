import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { IoSearch } from "react-icons/io5";
import './header.css'
const Header = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='Header'>
        <div className="header-container">
            <Link to="/" style={{textDecoration: "none"}}>
            <section className="left-section">
                <span style={{color: "rgba(112, 128, 144, 0.936)"}}>Property</span>
                <span>Pulse</span>
            </section>
            </Link>
            <form className='header-form'>
                <input type="text" placeholder='Search...' className='header-input' />
                <IoSearch style={{cursor: "pointer"}}/>
            </form>
            <ul>
            <Link to="/" style={{textDecoration: "none"}}><li className='list1'>Home</li></Link>
            <Link to="/about" style={{textDecoration: "none"}}> <li className='list2'>About</li></Link>
            <Link to="/profile" style={{textDecoration: "none"}}>
              {currentUser? <img src={currentUser.avatar} alt="avatar" className='avatar'/> :  <li>Sign in</li>}
              </Link>
            </ul>
        </div>
    </div>
  )
}

export default Header