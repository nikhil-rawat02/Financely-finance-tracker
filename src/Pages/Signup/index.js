import React from 'react'
import Header from '../../Components/Header/index';
import './index.css'
import SignupSignIn from '../../Components/SignupSignIn';
function index() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <SignupSignIn />
      </div>
    </>
  )
}

export default index
