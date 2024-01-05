// Import the useState hook from React
import { useState } from "react";

// Import components from the components directory
import Chat from "./components/Chat.jsx";
import Partners from "./components/Partners.jsx";
import Scenario from "./components/Scenario.jsx";
import Evaluation from "./components/Evaluation.jsx";
import Login from "./components/Login.jsx";

// Import the styles.css file
import './styles.css';

// Define the App component
export default function App() {
  // State variables using the useState hook
  const [scenario, setScenario] = useState("");
  const [page, setPage] = useState("partners");
  const [userRole, setUserRole] = useState("");
  const [partnerRole, setPartnerRole] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [improvText, setImprovText] = useState("");

  // Function to update the current page
  const updatePage = (newPage) => {
    setPage(newPage);
  };

  // Switch statement for conditional rendering of different pages based on the current page state
  const renderPage = () => {
    switch (page) {
      case "scenario":
        return (
          <Scenario
            scenario={scenario}
            setScenario={setScenario}
            updatePage={updatePage}
            userRole={userRole}
            setUserRole={setUserRole}
            partnerRole={partnerRole}
            setPartnerRole={setPartnerRole}
            selectedPartner={selectedPartner}
          />
        );
      case "chat":
        return (
          <Chat
            scenario={scenario}
            setScenario={setScenario}
            updatePage={updatePage}
            userRole={userRole}
            partnerRole={partnerRole}
            selectedPartner={selectedPartner}
            selectedDescription={selectedDescription}
            improvText={improvText}
            setImprovText={setImprovText}
          />
        );
      case "partners":
        return (
          <Partners
            updatePage={updatePage}
            selectedPartner={selectedPartner}
            setSelectedPartner={setSelectedPartner}
            selectedDescription={selectedDescription}
            setSelectedDescription={setSelectedDescription}
          />
        );
      case "evaluation":
        return(
          <Evaluation
            scenario={scenario}
            updatePage={updatePage}
            selectedPartner={selectedPartner}
            improvText={improvText}
          />
        )
      case "login":
        return(
          <Login/>
        )
      default:
        return null;
    }
  };

  // Return the JSX for the App component
  return (
    <div id="content">
      {/* Header */}
      <header>
        {/* Title */}
        <h1 class="title">Improv <img src="/Icons/android-chrome-512x512.png" className="title-icon"></img></h1>
        {/* Login Button (No functionality implemented yet) */}
        <button onClick={()=>{}}>Login</button>
      </header>

      {/* Main Content */}
      <main>{renderPage()}</main>

      {/* Footer */}
      <footer>
        <p>Created By Aaron Roberts</p>
      </footer>
    </div>
  );
}


