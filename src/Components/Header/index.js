import React from 'react'
import './index.css'
function index() {
    const handleLogout = () => {
        console.log("logout");
    }
  return (
    <div className='nav_bar'>
       <p className='logo'>Financely.</p>
       <p onClick={handleLogout} className='logo link'>Logout</p>
    </div>
  )
}

export default index
