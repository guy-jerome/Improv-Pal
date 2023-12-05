import { useState, useEffect } from "react";
import socketIOClient from 'socket.io-client';
import axios from "axios"
import './chat.css';

const ENDPOINT = 'http://localhost:3000';
const apiUrl = "http://localhost:3000/api/scenario"
const socket = socketIOClient(ENDPOINT)

export default function Chat({scenario, setScenario, updatePage}) {

  const [message,setMessage] = useState("");
  const [response,setResponse] = useState("");

  useEffect(() => {
    const handleIncomingMessage = (data) => {
      setResponse(prevResponse =>  prevResponse + data);
    };

    socket.on('message', handleIncomingMessage);
    // Move the axios.post inside the useEffect and await it
    const fetchData = async () => {
      try {
        await axios.post(apiUrl, { scenario: scenario });
      } catch (error) {
        console.error("Error in axios.post:", error);
      }
    };

    fetchData(); // Call the function immediately
    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      socket.off('message', handleIncomingMessage);
    };
  }, [scenario]);

  async function sendMessage(){
    setMessage("")
    setResponse(prevResponse => `${prevResponse}${prevResponse?'\n':""}User: ${message}\nFrank: `)
    socket.emit("message", message)
  }

  function textChanged(event){
    setMessage(event.target.value)
  }

  function handleKeyPress(event){
    if (event.key === "Enter"){
      sendMessage()
    }
  }

  function endImprov(){
    updatePage("scenario")
  }

  return (
    <div className="main">
      <h2>Frank</h2>
      <textarea value={response} readOnly id="chatArea"></textarea>
      <input type="text" value={message} onChange={textChanged} onKeyPress={handleKeyPress}/>
      <button onClick={sendMessage}>Send Message</button>
      <button onClick={endImprov}>End Improve</button>
    </div>
  )
}