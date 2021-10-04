import React, { useState} from 'react';
import { teaInfo } from '../resources/teaInfoData';

export default function Tabs() {
    const[currentIndex,setCurrentIndex] = useState(0);
    const{image,type,caffeine,description} = teaInfo[currentIndex];
    
    return (
        <div>
            <ul className="tea-tabs">
                    {teaInfo.map((tea,index)=>{
                        return(
                            <li key={index} className={index===currentIndex && 'active-tab'} onClick={()=>setCurrentIndex(index)}>{tea.type}</li>
                        )
                    })}    
                </ul>

                <div className="tea-tabs-content">
                    <div className="tea-tabs-img-container">
                        <img src={image} alt={type} />
                    </div>
                    <div className="tea-tabs-info">
                        <h3>{type} Tea</h3>
                        <span>{caffeine!=='caffeine-free' ? `${caffeine} caffeine` : caffeine}</span>
                        <p>{description}</p>
                    </div>
                </div>
        </div>
    )
}
