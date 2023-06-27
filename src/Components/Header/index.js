import React, { useEffect } from 'react'
import './index.css'
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

function Header() {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      // navigate('dashboard');
    }
  }, [user, loading])

  const handleLogout = () => {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logout Successful")
          navigate('/');
        })
        .catch(error => {
          console.log("error code => ", error.code);
          console.log("error message => ", error.message);
        })
    }
    catch (error) {
      console.log("error code => ", error.code);
      console.log("error message => ", error.message);
    }
  }

  return (
    <div className='nav_bar'>
      <p className='logo'>Financely.</p>
      {
        user &&
        <p
          onClick={handleLogout}
          className='logo link'
        >
          Logout
        </p>
      }
    </div>
  )
}

export default Header
