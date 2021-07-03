import React from 'react'
import { Link } from 'react-router-dom'

const IndexHeader = () => {
  return (
    <div className="header">
      <img className="header__image" src="/images/key.jpg" alt=""/>
      <div className="header__container">
        <h1>Password Vault</h1>
        <p>A secure place to keep your passwords</p>
        <div className="text-center">
          <Link to="/sign-in"><a className="btn-prim">Get Started</a></Link>
        </div>
      </div>
    </div>
  )
}

export default IndexHeader
