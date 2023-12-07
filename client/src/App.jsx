import React, { useState } from "react";
import Chat from "./components/Chat.jsx";
import Partners from "./components/Partners.jsx";
import Scenario from "./components/Scenario.jsx";
import './styles.css';

export default function App() {
  // State variables
  const [scenario, setScenario] = useState("");
  const [page, setPage] = useState("partners");
  const [userRole, setUserRole] = useState("");
  const [partnerRole, setPartnerRole] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  // Function to update the current page
  const updatePage = (newPage) => {
    setPage(newPage);
  };

  // Switch statement for conditional rendering
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
      default:
        return null;
    }
  };

  return (
    <div id="content">
      {/* Header */}
      <header>
        <h1>Improv Pal</h1>
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



