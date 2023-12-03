import { useState } from "react";

export default function App() {

  const [message,setMessage] = useState("");
  const [response,setResponse] = useState("");

  function sendMessage(){
    setMessage("")
    setResponse(message)
  }

  function textChanged(event){
    setMessage(event.target.value)
  }

  return (
      <>
        <h1>Improve Buddy</h1>
        <textarea value={response} readOnly></textarea>
        <input type="text" value={message} onChange={textChanged}/>
        <button onClick={sendMessage}>Send Message</button>
      </>
    )
}


