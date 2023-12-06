import Chat from "./components/Chat.jsx"; 
import Partners from "./components/Partners.jsx";
import Scenario from "./components/Scenario.jsx";
import { useState} from "react";
export default function App() {
  const [scenario, setScenario] = useState("");
  const [page, setPage] = useState("partners")
  const [userRole, setUserRole]  = useState("")
  const [partnerRole, setPartnerRole]  = useState("")
  const [selectedPartner, setSelectedPartner] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("")
  function updatePage(newPage){
    setPage(newPage)
  }
  return (
    <div id="content">
      <header>
        <h1>Improv Pal</h1>
      </header>
      <main>
      {page === "scenario" ? (
          <Scenario scenario={scenario} setScenario={setScenario} updatePage={updatePage} 
          userRole={userRole} setUserRole={setUserRole} partnerRole={partnerRole} setPartnerRole={setPartnerRole} selectedPartner={selectedPartner}/>
        ) : page === "chat" ? (
          <Chat scenario={scenario} setScenario={setScenario} updatePage={updatePage} userRole={userRole} partnerRole={partnerRole} selectedPartner = {selectedPartner} selectedDescription = {selectedDescription}/>
        ) : page === "partners" ? (
          <Partners updatePage={updatePage} selectedPartner={selectedPartner} setSelectedPartner={setSelectedPartner} selectedDescription = {selectedDescription} setSelectedDescription={setSelectedDescription}/>
        ): (
          null // Default case if page value doesn't match any case
        )}
      </main>
      <footer>
        <p>Created By Aaron Roberts</p>
      </footer>
    </div>

    )
}


