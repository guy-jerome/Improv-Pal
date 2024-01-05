// Import the necessary dependencies from React and other modules
import { useState, useEffect } from "react";
import Partner from './Partner.jsx'; // Import the Partner component
import axios from "axios"; // Import Axios for making HTTP requests

// Define the Evaluation component
export default function Evaluation({updatePage, selectedPartner, scenario, improvText}) {
    // Define state variables using the useState hook
    const [avgPoint, setAvgPoint] = useState(0);
    const [cat1Point, setCat1Point] = useState(0);
    const [cat2Point, setCat2Point] = useState(0);
    const [cat3Point, setCat3Point] = useState(0);
    const [cat4Point, setCat4Point] = useState(0);
    const [explain, setExplain] = useState("");

    // Define the API URL
    const apiUrl = "http://localhost:3000/api/evaluation";

    // Define a function to fetch data from the API using Axios
    const fetchData = async () => {
        try {
            // Make a POST request to the API with scenario and improvText as the request body
            const response = await axios.post(apiUrl, { scenario, improvText });
            // Update the state variables with the response data
            setCat1Point(response.data.category1RuleAdherence);
            setCat2Point(response.data.category2SceneDevelopment);
            setCat3Point(response.data.category3ExecutionandCreativity);
            setCat4Point(response.data.category4OverallImpact);
            setAvgPoint(response.data.category1RuleAdherence + response.data.category2SceneDevelopment
                + response.data.category3ExecutionandCreativity + response.data.category4OverallImpact);
            setExplain(response.data.scoringExplaination);
        } catch (error) {
            // Handle any errors that occur during the request
            console.error("Error in axios.post:", error);
        }
    };

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchData(); // Call the fetchData function
    }, []); // Pass an empty array as the second argument to ensure the effect runs only once

    // Return the JSX for the Evaluation component
    return (
        <div className="main">
            <h1>Evaluation</h1>
            <h2>{`Scenario: ${scenario}`}</h2>
            <Partner updatePage={updatePage} selectedPartner={selectedPartner} pageTarget="partners" />
            {
                // Conditionally render either the evaluation details or a loading message based on the 'explain' state
                explain ? (
                    <div className="main">
                        <h2>{`Total Points: ${avgPoint}`}</h2>
                        <div id="point-grid">
                            <h3>{`Category 1 Rule Adherence: ${cat1Point}`}</h3>
                            <h3>{`Category 2 Scene Development: ${cat2Point}`}</h3>
                            <h3>{`Category 3 Execution and Creativity: ${cat3Point}`}</h3>
                            <h3>{`Category 4 Overall Impact: ${cat4Point}`}</h3>
                        </div>
                        <h3>Score Break Down</h3>
                        <p>{explain}</p>
                    </div>
                ) : (
                    <h1 id="loading">LOADING. . .</h1>
                )
            }
            {/* Button to update the page with a new scenario */}
            <button onClick={() => updatePage("scenario")}>Pick A New Scenario</button>
        </div>
    );
}
