import React, { useState } from "react";
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from "firebase/firestore";
import { auth, db } from "../Firebase";
import styles from "../styles/Chat.css"
import { useEffect } from "react";


export default function Chat(props) {
    const {room} =props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const collectionRef = collection(db,"chatMessages")

  useEffect(()=>{
    const queryMessageRef = query(collectionRef, where("room","==", room));
    orderBy("createdAt")
   const unsuscribe =  onSnapshot(queryMessageRef, (snapshot)=>{
      let messages = [];
      snapshot.forEach((doc)=>{
        messages.push({...doc.data(), id: doc.id})
      })
      setMessages(messages)
    })
    return ()=> unsuscribe()
  },[])

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(newMessage === "") return;
    await addDoc(collectionRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,

        room,
    })
    setNewMessage("");
}
  return (
    <div className="chat-app"> 
    <div className="header"><h1>Welcome to:{room.toUpperCase()}</h1></div>
    <div className="messages"> {messages.map((message)=>(
      <div className="message" key={message.id}> <span className="user">{message.user}</span>
      {message.text}
      *
      
      </div>
    ))}</div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
         className="new-message-input"
          type="text"
          placeholder="Type new message here"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}
