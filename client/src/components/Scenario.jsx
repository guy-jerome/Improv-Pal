import axios from "axios";
import { useEffect } from "react";
import PropTypes from 'prop-types';

export default function Scenario({scenario, setScenario, userRole, setUserRole, partnerRole, setPartnerRole, updatePage}){
    const apiUrl = 'http://localhost:3000/api/scenario';

    useEffect(()=>{
        setScenario("");
    },[setScenario]);

    async function getScenario(){
        try{
            const response = await axios.get(apiUrl)
            setScenario(response.data.scene)
            setUserRole(response.data.roles[0].role)
            setPartnerRole(response.data.roles[1].role)
        }catch (error){
            console.error("Error in the axios call",error)
        }
    }

    function scenarioChanged(event){
        setScenario(event.target.value)
    }

    function yourRoleChanged(event){
        setUserRole(event.target.value)
    }

    function partnerRoleChanged(event){
        setPartnerRole(event.target.value)
    }

    function startImprov(){
        updatePage("chat")
    }

    return(
        <div className="main">
            <h2>Generate a Random Scenario</h2>
            <input value={scenario} type="text" onChange={scenarioChanged} placeholder="Make a custom scenario"></input>
            {
                scenario&&
                <>
                    <label htmlFor="yourRole">Your Role:</label>
                    <input id="yourRole" type="text" value={userRole} onChange={yourRoleChanged} placeholder="Enter your role"></input>
                    <label htmlFor="partnersRole">Partner Role:</label>
                    <input id="partnersRole" type="text" value={partnerRole}  onChange={partnerRoleChanged}placeholder="Enter partner's role"></input>
                </>
            }

            <button onClick={getScenario}>Generate</button>
            {
                scenario&&<button onClick={startImprov}>Start Improv</button>
            }
        </div>
    )
}

Scenario.propTypes = {
    scenario: PropTypes.string.isRequired,
    setScenario: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
    setUserRole: PropTypes.func.isRequired,
    partnerRole: PropTypes.string.isRequired,
    setPartnerRole: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
  };