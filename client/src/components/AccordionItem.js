import React, { useState } from 'react';
import { FaPlus, FaMinus} from 'react-icons/fa';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import { VscClose} from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useGlobalContext} from '../context';

export default function AccordionItem({type, items, expanded}) {
    const[isExpanded,setIsExpanded] = useState(expanded);
    const{closeSidebar} = useGlobalContext();

    return (
        <div>
            <div className="accordion-item">
                <div className="title-bar">
                    <h2>{type}</h2>
                    {isExpanded ? <AiOutlineMinus className="accordion-btn" onClick={()=>{setIsExpanded(false)}}/> : <AiOutlinePlus className="accordion-btn" onClick={()=>{setIsExpanded(true)}}/>}
                </div>
                
                <ul className={`accordion-content ${isExpanded && 'accordion-content show'}`}>
                    {items.map((item,index)=>{
                        return(
                            <li key={index}>
                                <Link className="sidebar-link" onClick={closeSidebar}to={type==='all' ? `/shop/${item}` : `/shop/${type}/${item}`}>{item}</Link>
                            </li>
                        )
                    })}
                </ul>
                
            </div>
            
        </div>
    )
}
