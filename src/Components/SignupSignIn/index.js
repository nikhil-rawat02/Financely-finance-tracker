import React, { useState } from 'react'
import './style.css';
import Input from '../Input';
import Button from '../Button';
import Breaker from '../Breaker';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, doc, setDoc, provider } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login';
import { signInWithPopup } from 'firebase/auth';

function SignupSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSignUpUser = async (e) => {
    e.preventDefault();

    if(!name || !email || !password || !confirmPassword){
      if(!name){
        toast.error("Enter Name")
      }else if(name.split(" ").length < 2){
        toast.error("Enter Full name")
      }else if(!email){
        toast.error("Enter email")
      }else if(!password){
        toast.error("Enter password")
      }else if(!confirmPassword){
        toast.error ("Enter Confirm Password")
      }
    }else if(password !== confirmPassword){
      toast.error("password does not match")
    }else{
      try{
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email,password);
        const user = userCredential.user;
        //save user's details in db
        await setDoc(doc(db, "user", user.uid),{
          name: name,
          email: email,
          profileImage: "",
        })
        // set user in context api and if user is not present fetch from firestore else get data from context api
        setName("");setEmail(""); setPassword("");setConfirmPassword("");
        setLoading(false);
        toast.success("User created!")
        navigate("/login");
      }catch(err){
        setLoading(false);
        setError(err.message);
        if (err.code === "auth/weak-password") {
          toast.error(error)
        } else if (err.code === "auth/email-already-in-use") {
          toast.error(error)
        }else if(err.code === "auth/invalid-email"){
          toast.error(error)
        }
        console.log("error => ", err);
        console.log("message => ", err.message);
        console.log("error code => ", err.code);
      }
    }
  }
  const handleLoginWithGoogle = () => {
      signInWithPopup(auth, provider)
      .then( async(response)=>{
        setLoading(true);
        const user = response.user;
        await setDoc(doc(db, "user", user.uid),{
          name: user.displayName,
          email: user.email,
          profileImage: user.photoURL,
        })
        // set user in context api and if user is not present fetch from firestore else get data from context api
        console.log(user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (error.code === 'auth/account-exists-with-different-credential') {
          toast(err.message);
        }
        console.log("error => ", err);
        console.log("message => ", err.message);
        console.log("error code => ", err.code);
      })
  }
  return (
    <div className='signup_wrapper'>
      <h2 className='title'>
        Sign Up on <span style={{color:"var(--theme)"}}>FInancely.</span>
      </h2>
      <form>
        <Input
        lable={"Full Name"}
        state={name}
        setState={setName}
        placeholder={"Name"}
        type={"text"}
        />
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
        <Input
        lable={"Confim Password"}
        state={confirmPassword}
        setState={setConfirmPassword}
        type={"password"}
        />
        <Button text={loading ? "Loading...": "SignUp using email and password"} 
        onClick={handleSignUpUser}
        />
        <Breaker />
        <Button text={loading ? "Loading..." : "Google Login"}blue={true} 
        onClick={handleLoginWithGoogle}
        />
      </form>
      <div className="callLogin">
        <span>Or have an Account Already?</span><Link to={"/login"} element = {< Login/>}>Click here</Link>
      </div>
    </div>
  )
}

export default SignupSignIn
