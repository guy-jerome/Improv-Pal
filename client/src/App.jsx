import { useState, useEffect } from "react";
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';
const socket = socketIOClient(ENDPOINT)
export default function App() {

  const [message,setMessage] = useState("");
  const [response,setResponse] = useState("");

  useEffect(()=>{
  
    socket.on('message', (data)=>{
      setResponse(data.content)
    })


  }, [])

  async function sendMessage(){
    setMessage("")
    socket.emit("message", message)
  }

  function textChanged(event){
    setMessage(event.target.value)
  }

  return (
      <>
        <h1>Improv Pal</h1>
        <textarea value={response} readOnly></textarea>
        <input type="text" value={message} onChange={textChanged}/>
        <button onClick={sendMessage}>Send Message</button>
      </>
    )
}


