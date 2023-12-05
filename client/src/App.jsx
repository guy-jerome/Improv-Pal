import Chat from "./components/Chat.jsx"; 
import Scenario from "./components/Scenario.jsx";
import { useState } from "react";
export default function App() {
  const [scenario, setScenario] = useState("");
  const [page, setPage] = useState("scenario")
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
          <Scenario scenario={scenario} setScenario={setScenario} updatePage={updatePage} />
        ) : page === "chat" ? (
          <Chat updatePage={updatePage}/>
        ) : (
          null // Default case if page value doesn't match any case
        )}
      </main>
      <footer>
        <p>Created By Aaron Roberts</p>
      </footer>
    </>

    )
}


