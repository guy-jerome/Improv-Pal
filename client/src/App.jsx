import { useState } from "react";
import axios from "axios";

export default function App() {

  const [message,setMessage] = useState("");
  const [response,setResponse] = useState("");

  async function sendMessage(){
    setMessage("")
    try{
      const response = await axios.get('http://localhost:3000/api/pal')
      setResponse(response.data)
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


