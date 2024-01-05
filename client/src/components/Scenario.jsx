// Import necessary dependencies from React, axios, and PropTypes
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Partner from './Partner.jsx'; // Import the Partner component

// Define the Scenario component
export default function Scenario({
  scenario,
  setScenario,
  userRole,
  setUserRole,
  partnerRole,
  setPartnerRole,
  updatePage,
  selectedPartner,
}) {
  const apiUrl = 'http://localhost:3000/api/scenario'; // Define the API URL

  // Use the useEffect hook to reset the scenario state when it changes
  useEffect(() => {
    setScenario("");
  }, [setScenario]);

  // Define an asynchronous function to fetch a scenario from the API
  async function getScenario() {
    try {
      // Make a GET request to the API
      const response = await axios.get(apiUrl);
      // Update the state with the fetched scenario and roles
      setScenario(response.data.scene);
      setUserRole(response.data.roles[0].role);
      setPartnerRole(response.data.roles[1].role);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error in the axios call", error);
    }
  }

  // Define functions to handle changes in scenario and role inputs
  function scenarioChanged(event) {
    setScenario(event.target.value);
  }

  function yourRoleChanged(event) {
    setUserRole(event.target.value);
  }

  function partnerRoleChanged(event) {
    setPartnerRole(event.target.value);
  }

  // Define a function to handle starting the improv
  function startImprov() {
    updatePage("chat");
  }

  // Return the JSX for the Scenario component
  return (
    <div className="main">
      {/* Render the Partner component */}
      <Partner updatePage={updatePage} selectedPartner={selectedPartner} pageTarget="partners" />

      <h2>Generate a Random Scenario</h2>
      {/* Scenario Textarea */}
      <textarea
        value={scenario}
        type="text"
        onChange={scenarioChanged}
        placeholder="Make a custom scenario"
        id="scenario-text-area"
      ></textarea>

      {/* Role Inputs */}
      {/* Render the role inputs if a scenario is set */}
      {scenario && (
        <>
          <label htmlFor="yourRole">Your Role:</label>
          <input id="yourRole" className="inputRole" type="text" value={userRole} onChange={yourRoleChanged} placeholder="Enter your role"></input>
          <label htmlFor="partnersRole">Partner Role:</label>
          <input id="partnersRole" className="inputRole" type="text" value={partnerRole} onChange={partnerRoleChanged} placeholder="Enter partner's role"></input>
        </>
      )}

      {/* Buttons */}
      {/* Render the "Generate" button to fetch a scenario */}
      <button onClick={getScenario}>Generate</button>
      {/* Render the "Start Improv" button if a scenario is set */}
      {scenario && <button onClick={startImprov}>Start Improv</button>}
    </div>
  );
}
