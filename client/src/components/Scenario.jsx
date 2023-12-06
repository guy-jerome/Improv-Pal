import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Partner from './Partner.jsx'
export default function Scenario({scenario, setScenario, userRole, setUserRole, partnerRole, setPartnerRole, updatePage, selectedPartner}){
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
            <Partner updatePage = {updatePage} selectedPartner = {selectedPartner} pageTarget = "partners"/>

            <h2>Generate a Random Scenario</h2>
            <textarea value={scenario} type="text" onChange={scenarioChanged} placeholder="Make a custom scenario" style={{border: '1px solid #bdc3c7', height:'20vh', borderRadius:'.5rem', resize: 'none', fontSize:'16px', width:'100%'}}></textarea>
            {
                scenario&&
                <>
                    <label htmlFor="yourRole">Your Role:</label>
                    <input id="yourRole" type="text" value={userRole} onChange={yourRoleChanged} placeholder="Enter your role" style={{width:'80%'}}></input>
                    <label htmlFor="partnersRole">Partner Role:</label>
                    <input id="partnersRole" type="text" value={partnerRole}  onChange={partnerRoleChanged}placeholder="Enter partner's role" style={{width:'80%'}}></input>
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
    selectedPartner: PropTypes.string.isRequired
  };