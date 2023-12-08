import { useState, useEffect, useRef } from "react";
import axios from "axios";
import socket from "../socket.js";
import Partner from "./Partner.jsx";

const ENDPOINT = 'http://localhost:3000';
const apiUrl = "http://localhost:3000/api/scenario";

export default function Chat({
  scenario,
  updatePage,
  userRole,
  partnerRole,
  selectedPartner,
  selectedDescription,
}) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const chatAreaRef = useRef(null);

  const fetchData = async () => {
    try {
      await axios.post(apiUrl, { scenario, userRole, partnerRole, selectedPartner, selectedDescription });
    } catch (error) {
      console.error("Error in axios.post:", error);
    }
  };

  useEffect(() => {
    const handleIncomingMessage = (data) => {
      setResponse((prevResponse) => prevResponse + data);
      scrollToBottom();
    };

    socket.on('message', handleIncomingMessage);

    fetchData(); // Call the function immediately

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      socket.off('message', handleIncomingMessage);
    };
  }, [scenario]);


  function scrollToBottom() {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }

  async function sendMessage() {
    setMessage("");
    setResponse((prevResponse) => `${prevResponse}${prevResponse ? '\n\n' : ""}User: ${message}\n\n${selectedPartner}: `);
    socket.emit("message", message);
    scrollToBottom();
  }

  function textChanged(event) {
    setMessage(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="main">
      {/* Partner Component */}
      <Partner updatePage={updatePage} selectedPartner={selectedPartner} pageTarget="partners" />

      {/* Scenario and Roles Info */}
      <h3>Scenario: {scenario}</h3>
      <hr style={{ width: '100%', margin: '.5rem' }}></hr>
      <h4>Your Role: {userRole}</h4>
      <h4>{selectedPartner}'s Role: {partnerRole}</h4>

      {/* Chat Area */}
      <textarea value={response} ref={chatAreaRef} readOnly id="chatArea" placeholder="Get Improving"></textarea>

      {/* Message Input */}
      <input type="text" value={message} onChange={textChanged} onKeyDown={handleKeyPress} spellCheck="true" placeholder="Your Message" />

      {/* Buttons */}
      <button onClick={sendMessage}>Send Message</button>
      {/* {
        response&&<button>Get My Evaluation</button>
      } */}
      <button onClick={()=>updatePage("evaluation")}>Get My Evaluation</button>

      <button onClick={()=>updatePage("scenario")}>Pick A New Scenario</button>

    </div>
  );
}
