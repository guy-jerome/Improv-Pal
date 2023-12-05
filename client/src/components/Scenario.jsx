import axios from "axios"
import { useEffect } from "react";
export default function Scenario({scenario, setScenario, updatePage}){
    const apiUrl = 'http://localhost:3000/api/scenario';

    useEffect(()=>{
        setScenario("");
    },[]);

    async function getScenario(){
        try{
            console.log("pressing")
            const response = await axios.get(apiUrl)
            console.log(response)
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
            <h3 >{scenario}</h3>
            <button onClick={getScenario}>Generate</button>
            {
                scenario&&<button onClick={startImprov}>Start Improv</button>
            }
        </div>
    )
}