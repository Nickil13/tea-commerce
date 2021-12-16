import React from 'react';

export default function LoadingSpinner({anchor}) {
    
    return (
        <div className={`spinner-container ${anchor==="right" && 'anchor-right'}`}>
            <div className='loading-spinner'>
            </div>
        </div>
        
    )
}
