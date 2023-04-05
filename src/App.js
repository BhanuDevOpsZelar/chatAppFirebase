import React, { useState } from 'react'
import Auth from "./components/Auth"

import Cookies from 'universal-cookie';
import { useRef } from 'react';
import Chat from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] =useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  
  const SignOut=async()=>{
    signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null)
  }

  if (!isAuth){
  return (
    <div>
      <Auth setIsAuth={setIsAuth} />
    </div>
  )
}
return(
  <div>
    {room ? (<Chat room={room}/>): (<div className='room'> 
    <label> Enter Room Name</label>
    <input type="text" ref={roomInputRef}/>
    <button onClick={()=> setRoom(roomInputRef.current.value)}>Enter Chat</button>
     </div>
     )}
     <div onClick={SignOut}>Sign Out</div>
  </div>
)
}

export default App