import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__item">
          <Link to="/">Home</Link>
        </div>
        <div className="navbar__item">
          <Link to="/register">Sign In / Register</Link>
        </div>
        
        <div className="navbar__item">
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
