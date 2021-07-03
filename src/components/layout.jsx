import React from 'react'
import Navbar from './navbar'

const Layout = (props) => {
  return (
    <>
    test
    <Navbar/>
    <div className="container">
      
      {props.children}
    </div>
    </>
  )
}

export default Layout
