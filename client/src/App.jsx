import Chat from "./components/Chat.jsx"; 
import Partners from "./components/Partners.jsx";
import Scenario from "./components/Scenario.jsx";
import { useState} from "react";
export default function App() {
  const [scenario, setScenario] = useState("");
  const [page, setPage] = useState("partners")
  const [userRole, setUserRole]  = useState("")
  const [partnerRole, setPartnerRole]  = useState("")
  function updatePage(newPage){
    setPage(newPage)
  }
  return (
    <>
      <header>
        <h1>Improv Pal</h1>
      </header>
      <main>
      {page === "scenario" ? (
          <Scenario scenario={scenario} setScenario={setScenario} updatePage={updatePage} 
          userRole={userRole} setUserRole={setUserRole} partnerRole={partnerRole} setPartnerRole={setPartnerRole}/>
        ) : page === "chat" ? (
          <Chat scenario={scenario} setScenario={setScenario} updatePage={updatePage} userRole={userRole} partnerRole={partnerRole}/>
        ) : page === "partners" ? (
          <Partners/>
        ): (
          null // Default case if page value doesn't match any case
        )}
      </main>
      <footer>
        <p>Created By Aaron Roberts</p>
      </footer>
    </>

    )
}


