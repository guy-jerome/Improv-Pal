import { useState } from "react";
import Partner from './Partner.jsx';

export default function Evaluation({updatePage, selectedPartner}){
    const [avgPoint, setAvgPoint] = useState(0)
    const [cat1Point, setCat1Point] = useState(0)
    const [cat2Point, setCat2Point] = useState(0)
    const [cat3Point, setCat3Point] = useState(0)
    const [cat4Point, setCat4Point] = useState(0)
    return(
        <div className="main">
            <h1>Evaluation</h1>
            <Partner updatePage={updatePage} selectedPartner={selectedPartner} pageTarget="partners" />
            <h2>{`Overall Point Average:${avgPoint}`}</h2>
            <div id="point-grid">
                <h3>{`Category 1 Rule Adherence: ${cat1Point}`}</h3>
                <h3>{`category 2 Scene Development: ${cat2Point}`}</h3>
                <h3>{`category 3 Execution and Creativity: ${cat3Point}`}</h3>
                <h3>{`category 4 Overall Impact: ${cat4Point}`}</h3>
                <button onClick={()=>updatePage("scenario")}>Pick A New Scenario</button>
            </div>
        </div>
    )
}