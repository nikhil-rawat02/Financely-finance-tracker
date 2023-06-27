import React, { useState } from 'react'
import './index.css'
import Header from '../../Components/Header/index';
import Signup from '../../Components/Signup';
import Login from '../../Components/Login';

function SignUpSingIn() {
  
  const [loginForm , setLoginForm] = useState(false);
  return (
    <>
      <Header />
      <div className="wrapper">
        {!loginForm && <Signup setLoginForm = {setLoginForm}/>}
        {loginForm && <Login setLoginForm = {setLoginForm}/>}
      </div>
    </>
  )
}

export default SignUpSingIn
