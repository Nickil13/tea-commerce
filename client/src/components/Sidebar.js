import React from 'react';
import { VscClose} from 'react-icons/vsc';
import { useGlobalContext} from '../context';
import AccordionItem from './AccordionItem';
import { teaProductCategories as categories } from '../resources/teaInfoData';

export default function Sidebar() {
    const{isSidebarOpen,closeSidebar} = useGlobalContext();
    return (
        <>
            <div className={`sidebar-container ${isSidebarOpen && 'sidebar-container show'}`}>
                <div className="sidebar">
                    <button className="close-sidebar-btn"
                    onClick={closeSidebar}><VscClose/></button>
                    <div className="accordion-items">
                        {categories.map((category,index)=>{
                            return(
                                <AccordionItem key={category.id} {...category} expanded={index ===0 ? true : false}/>
                            );
                        })}
                    </div>
                    <div className="sidebar-footer">
                
                    </div>
                </div>
                
            </div>
            <div className={`sidebar-overlay ${isSidebarOpen && 'sidebar-overlay show'}`}></div>
        </>
        
    )
}
