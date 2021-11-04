import React from 'react'

export default function LoadingSpinner({anchor}) {
    
    return (
        <div className={`loading-spinner ${anchor==="right" && 'anchor-right'}`}>
        </div>
    )
}
