import React, { useState } from 'react';
import { FaPlus, FaMinus} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGlobalContext} from '../context';

export default function AccordionItem({type,description,route,items}) {
    const[isExpanded,setIsExpanded] = useState(false);
    const{closeSidebar} = useGlobalContext();

    return (
        <div>
            <div className="accordion-item">
                <div className="title-bar">
                    <h2>{type}</h2>
                    {isExpanded ? <FaMinus className="accordion-btn" onClick={()=>{setIsExpanded(false)}}/> : <FaPlus className="accordion-btn" onClick={()=>{setIsExpanded(true)}}/>}
                </div>
                
                <ul className={`accordion-content ${isExpanded && 'accordion-content show'}`}>
                    {items.map((item,index)=>{
                        return(
                            <li key={index}>
                                <Link onClick={closeSidebar}to={`${route}${item}`}>{item}</Link>
                            </li>
                        )
                    })}
                </ul>
                
            </div>
            
        </div>
    )
}
