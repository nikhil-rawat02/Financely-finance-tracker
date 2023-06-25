import React, { useState } from 'react'
import './style.css';
import Input from '../Input';
import Button from '../Button';
import Breaker from '../Breaker';
function SignupSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        <Button text={"SignUp Using Email and Password"} blue={true}/>
        <Breaker />
        <Button text={"Login with Google"} />
      </form>
    </div>
  )
}

export default SignupSignIn
