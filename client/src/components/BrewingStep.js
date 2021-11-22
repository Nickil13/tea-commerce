import React from 'react'
import { GiThermometerHot, GiSandsOfTime, GiWhisk, GiSpoon, GiIceCube, GiStrawberry } from 'react-icons/gi';

export default function BrewingStep({step, index}) {
    return (
        <div className="brewing-step">
            <span className="step-num">{index+1}.</span>
            <div className="brewing-icon">
                {step.type==="temperature" && <GiThermometerHot/>} 
                {step.type==="duration" && <GiSandsOfTime/>} 
                {step.type==="mix" && <GiWhisk/>}
                {step.type==="measure" &&  <GiSpoon/>}
                {step.type==="add" && step.ingredient==="ice" && <GiIceCube/>}
                {step.type==="add" && step.ingredient==="fruit" && <GiStrawberry/>}
            </div>
            
            <p className="brewing-text">{step.text}</p>
        </div>
    )
}
