import axios from "axios";
import { useEffect } from "react";
export default function Scenario({scenario, setScenario, userRole, setUserRole, partnerRole, setpartnerRole, updatePage}){
    const apiUrl = 'http://localhost:3000/api/scenario';

    useEffect(()=>{
        setScenario("");
    },[]);

    async function getScenario(){
        try{
            const response = await axios.get(apiUrl)
            setScenario(response.data.scenario)
        }catch (error){
            console.error("Error in the axios call",error)
        }


    }

    function startImprov(){
        updatePage("chat")
    }

    return(
        <div className="main">
            <h2>Generate a Random Scenario</h2>
            <input value={scenario} type="text"></input>
            {
                scenario&&
                <>
                    <label htmlFor="yourRole">Your Role:</label>
                    <input id="yourRole" type="text" placeholder="Enter your role"></input>
                    <label htmlFor="partnersRole">Partner's Role:</label>
                    <input id="partnersRole" type="text" placeholder="Enter partner's role"></input>
                </>
            }

            <button onClick={getScenario}>Generate</button>
            {
                scenario&&<button onClick={startImprov}>Start Improv</button>
            }
        </div>
    )
}