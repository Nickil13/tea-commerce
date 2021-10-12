import React, { useState } from 'react';
import { FaPlus, FaMinus} from 'react-icons/fa';
import { VscClose} from 'react-icons/vsc';
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
                    {isExpanded ? <VscClose className="accordion-btn" onClick={()=>{setIsExpanded(false)}}/> : <VscClose className="accordion-btn" onClick={()=>{setIsExpanded(true)}}/>}
                </div>
                
                <ul className={`accordion-content ${isExpanded && 'accordion-content show'}`}>
                    {items.map((item,index)=>{
                        return(
                            <li key={index}>
                                <Link onClick={closeSidebar}to={`/shop`}>{item}</Link>
                            </li>
                        )
                    })}
                </ul>
                
            </div>
            
        </div>
    )
}
