import { useState, useEffect } from "react";
import Partner from './Partner.jsx';
import axios from "axios";

export default function Evaluation({updatePage, selectedPartner, scenario, improvText}){
    const [avgPoint, setAvgPoint] = useState(0)
    const [cat1Point, setCat1Point] = useState(0)
    const [cat2Point, setCat2Point] = useState(0)
    const [cat3Point, setCat3Point] = useState(0)
    const [cat4Point, setCat4Point] = useState(0)
    const [explain, setExplain] = useState("")
    
    const apiUrl = "http://localhost:3000/api/evaluation";

    const fetchData = async () => {
        try {
            const response = await axios.post(apiUrl, { scenario, improvText });
            setCat1Point(response.data.category1RuleAdherence)
            setCat2Point(response.data.category2SceneDevelopment)
            setCat3Point(response.data.category3ExecutionandCreativity)
            setCat4Point(response.data.category4OverallImpact)
            setAvgPoint((response.data.category1RuleAdherence + response.data.category2SceneDevelopment
                 + response.data.category3ExecutionandCreativity + response.data.category4OverallImpact) )
            setExplain(response.data.scoringExplaination)
        } catch (error) {
          console.error("Error in axios.post:", error);
        }
    };

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <div className="main">
            <h1>Evaluation</h1>
            <h2>{`Scenario: ${scenario}`}</h2>
            <Partner updatePage={updatePage} selectedPartner={selectedPartner} pageTarget="partners" />
            {
                explain?
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
                :
                <h1 id="loading">LOADING. . .</h1>
            }

            <button onClick={()=>updatePage("scenario")}>Pick A New Scenario</button>
        </div>
    )
}