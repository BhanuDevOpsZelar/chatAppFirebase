import { useState, useEffect } from 'react';
import {auth, provider} from "../Firebase";
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import Cookies from 'universal-cookie';
import styles from "../styles/Auth.css"

const cookies = new Cookies();

function Auth(props) {
    const {setIsAuth} = props
  
  const [email,setEmail] =useState("");
  const [password, setPassword] = useState("");



  const signInClick=async()=>{
    try{
      const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
    cookies.set("auth-token", result.user.refreshToken);
    setIsAuth(true)
    }catch(err){
      console.error(err)
    }
    
  }
  const SignInWithGoogle=async()=>{
   const googleUser = await signInWithPopup(auth, provider);
   console.log(googleUser);
   cookies.set("auth-token", googleUser.user.refreshToken);
   setIsAuth(true)
  }
  return (
    <div className="App">
      <h2>Firebse Authentication</h2>
      <input type="email" onChange={(e)=>setEmail(e.target.value)} /> <br /> <br />
      <input type="password" onChange={(e)=>setPassword(e.target.value)} /> <br /> <br />
      <button onClick={signInClick}>Sign In</button> <br /> <br />
      <button onClick={SignInWithGoogle}>Sign In With Google</button>
    </div>
  );
}

export default Auth;
