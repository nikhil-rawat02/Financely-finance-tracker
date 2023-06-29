import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, db, doc, getDoc } from '../../firebase';
import Input from '../Input';
import Button from '../Button';
import Breaker from '../Breaker';

function Login({ setLoginForm }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleLoginUSer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // get data from the firebase db
      const userDoc = await getDoc(doc(db, "user", user.uid));
      const userData = userDoc.data();

      // use context api and set user data
      setLoading(false);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        toast.error("wrong password");
      } else if (error.code === 'auth/user-not-found') {
        toast.error("Invalid Email")
      }
      console.log("error code ", error.code);
      console.log("error message", error.message);
    }
  }
  const toggleForm = () => {
    setLoginForm(prev => !prev);
  }
  return (
    <div className='signup_wrapper'>
      <h2 className='title'>
        Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          lable={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"smaple@email.com"}
          type={"email"}
        />
        <Input
          lable={"Password"}
          state={password}
          setState={setPassword}
          type={"password"}
        />
        <Button text={loading ? "Loading..." : "Login"}
          onClick={handleLoginUSer}
        />
        <Breaker />
      </form>
      <div className="callLogin">
        <span
          onClick={toggleForm}
        >
          Don't have an Account?
          <span style={{ cursor: "pointer", color: "var(--theme)", marginLeft: "5px" }}>
            Create Account
          </span>
        </span>
      </div>
    </div>
  )
}
export default Login
