import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { IoSearch } from "react-icons/io5";
import './header.css'
const Header = () => {
  const {currentUser} = useSelector((state) => state.user)
  const [searchTerm , setSearchTerm] = useState('')
  const navigate = useNavigate()
const handleSubmit = (e) =>{
  e.preventDefault()
  const urlParams = new URLSearchParams(window.location.search)
  urlParams.set('searchTerm', searchTerm)
  const searchQuery = urlParams.toString()
navigate(`/search?${searchQuery}`)
}

useEffect(()=>{
  const urlParams = new URLSearchParams(location.search)
  const searchTermFromUrl = urlParams.get('searchTerm')
  if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl)
  }
},[location.search])

  return (
    <div className='Header'>
        <div className="header-container">
            <Link to="/" style={{textDecoration: "none"}}>
            <section className="left-section">
                <span style={{color: "var(--red)"}}>Property</span>
                <span>Pulse</span>
            </section>
            </Link>
            <form onSubmit={handleSubmit} className='header-form'>
                <input type="text" placeholder='Search...' className='header-input' id='search' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}/>
                <button className='search-btn-container'>
                <IoSearch style={{cursor: "pointer"}}/>
                </button>
                
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