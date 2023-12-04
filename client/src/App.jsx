import { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000';

export default function App() {

  const [message,setMessage] = useState("");
  const [response,setResponse] = useState("");

  useEffect(()=>{
    
    const socket = socketIOClient(ENDPOINT)
    console.log(socket);
    console.log(ENDPOINT);
    socket.on('message', (data)=>{
      setResponse(data)
    })

    return () => {
      // Clean up the socket connection on component unmount
      socket.disconnect();
    };
  }, [])

  async function sendMessage(){
    setMessage("")
    try{
      const response = await axios.post('http://localhost:3000/api/pal', {message:message})
      setResponse(response.data.content)
    }catch (error){
      console.log(error)
    }
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


