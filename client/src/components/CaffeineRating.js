import React from 'react'
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import {teaInfo} from '../resources/teaInfoData';

export default function CaffeineRating({productType}) {
    const tea = productType ? teaInfo.filter((tea)=>productType.split(" ").includes(tea.type))[0] : {};
    
    if(tea.caffeine === 'caffeine-free'){
        return(
            <div className="caffeine-rating">
                <p>Caffeine free</p>
            </div>
        )
    }
    return (
        <div className="caffeine-rating">
            <span>Caffeine</span>
            {tea.caffeine ? <div>
                <FaCircle/>
                {tea.caffeine === 'medium' || tea.caffeine === 'high' ? <FaCircle/> : <FaRegCircle/> }
                {tea.caffeine === 'high' ? <FaCircle/> :<FaRegCircle/>}
            </div> : <p>caffeine unknown</p>}

        </div>
    )
}
