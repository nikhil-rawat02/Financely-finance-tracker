import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/index';
import Signup from '../../Components/Signup';
import Login from '../../Components/Login';
import { auth } from '../../firebase';
import './index.css'

function SignUpSingIn() {

  const [loginForm, setLoginForm] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('dashboard');
    }
  }, [user])


  return (
    <>
      <Header />
      <div className="wrapper">
        {!loginForm && <Signup setLoginForm={setLoginForm} />}
        {loginForm && <Login setLoginForm={setLoginForm} />}
      </div>
    </>
  )
}

export default SignUpSingIn
