import React from 'react';
import { FaTimes, FaUser} from 'react-icons/fa';
import { useGlobalContext} from '../context';
import AccordionItem from './AccordionItem';
import { teaProductCategories as categories } from '../teaInfoData';

export default function Sidebar() {
    const{isSidebarOpen,closeSidebar} = useGlobalContext();
    return (
        <>
            <div className={`sidebar-container ${isSidebarOpen && 'sidebar-container show'}`}>
                <div className="sidebar">
                    <button className="close-sidebar-btn"
                    onClick={closeSidebar}><FaTimes/></button>
                    {categories.map((category)=>{
                        return(
                            <AccordionItem key={category.id} {...category}/>
                        );
                    })}
                </div>
                <div className="sidebar-footer">
                    <FaUser/>
                </div>
            </div>
            <div className={`sidebar-overlay ${isSidebarOpen && 'sidebar-overlay show'}`}></div>
        </>
        
    )
}
