// Import necessary dependencies from React and other modules
import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import socket from "../socket.js"; // Import socket.io for real-time communication
import Partner from "./Partner.jsx"; // Import the Partner component

// Define the endpoint for the server
const ENDPOINT = 'http://localhost:3000';
const apiUrl = "http://localhost:3000/api/scenario";

// Define the Chat component
export default function Chat({
  scenario,
  updatePage,
  userRole,
  partnerRole,
  selectedPartner,
  selectedDescription,
  improvText,
  setImprovText 
}) {
  // Define state variables using the useState hook
  const [message, setMessage] = useState("");
  const chatAreaRef = useRef(null); // Create a ref for the chat area

  // Define a function to fetch data from the API using Axios
  const fetchData = async () => {
    try {
      // Make a POST request to the API with scenario, userRole, partnerRole, selectedPartner, and selectedDescription as the request body
      await axios.post(apiUrl, { scenario, userRole, partnerRole, selectedPartner, selectedDescription});
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error in axios.post:", error);
    }
  };

  // Use the useEffect hook to set up the socket connection and fetch data when the component mounts
  useEffect(() => {
    // Define a function to handle incoming messages from the socket
    const handleIncomingMessage = (data) => {
      // Update the improvText state with the incoming message
      setImprovText((prevImprovText) => prevImprovText + data);
      // Scroll to the bottom of the chat area
      scrollToBottom();
    };

    // Set up a listener for the 'message' event from the socket
    socket.on('message', handleIncomingMessage);

    // Call the fetchData function to fetch data from the API
    fetchData();
    // Reset the improvText state
    setImprovText("");

    // Clean up: Remove the event listener when the component unmounts
    return () => {
      socket.off('message', handleIncomingMessage);
    };
  }, [scenario]); // Run this effect when the 'scenario' prop changes

  // Define a function to scroll the chat area to the bottom
  function scrollToBottom() {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }

  // Define a function to send a message via the socket
  async function sendMessage() {
    // Clear the message input
    setMessage("");
    // Update the improvText state with the user's message
    setImprovText((prevImprovText) => `${prevImprovText}${prevImprovText ? '\n\n' : ""}User: ${message}\n\n${selectedPartner}: `);
    // Emit a 'message' event with the user's message via the socket
    socket.emit("message", message);
    // Scroll to the bottom of the chat area
    scrollToBottom();
  }

  // Define a function to handle changes in the message input
  function textChanged(event) {
    setMessage(event.target.value);
  }

  // Define a function to handle key presses in the message input
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  // Return the JSX for the Chat component
  return (
    <div className="main">
      {/* Render the Partner component */}
      <Partner updatePage={updatePage} selectedPartner={selectedPartner} pageTarget="partners" />

      {/* Render the scenario and roles information */}
      <h3>Scenario: {scenario}</h3>
      <hr style={{ width: '100%', margin: '.5rem' }}></hr>
      <h4>Your Role: {userRole}</h4>
      <h4>{selectedPartner}'s Role: {partnerRole}</h4>

      {/* Render the chat area */}
      <textarea value={improvText} ref={chatAreaRef} readOnly id="chatArea" placeholder="Get Improving"></textarea>

      {/* Render the message input */}
      <input type="text" value={message} onChange={textChanged} onKeyDown={handleKeyPress} spellCheck="true" placeholder="Your Message" />

      {/* Render the buttons */}
      <button onClick={sendMessage}>Send Message</button>
      {/* Conditionally render the "Get My Evaluation" button based on the content of improvText */}
      {improvText && <button onClick={() => updatePage("evaluation")}>Get My Evaluation</button>}
      <button onClick={() => updatePage("scenario")}>Pick A New Scenario</button>
    </div>
  );
}
