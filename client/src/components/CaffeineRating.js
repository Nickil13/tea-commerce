import React from 'react'
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import {teaInfo} from '../resources/teaInfoData';

export default function CaffeineRating({productType}) {
    const tea = productType ? teaInfo.filter((tea)=>productType.includes(tea.type))[0] : {};
    
    if(tea.caffeine === 'caffeine-free'){
        return(
            <div>Caffeine free</div>
        )
    }
    return (
        <div className="caffeine-rating">
            <span>Caffeine</span>
            <div>
                <FaCircle/>
                {tea.caffeine === 'medium' || tea.caffeine === 'high' ? <FaCircle/> : <FaRegCircle/> }
                {tea.caffeine === 'high' ? <FaCircle/> :<FaRegCircle/>}
            </div>
        </div>
    )
}
