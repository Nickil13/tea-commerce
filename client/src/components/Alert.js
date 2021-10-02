import React from 'react';
import { useGlobalContext } from '../context';

export default function Alert() {
    // const{isAlertShowing,closeAlert,alertContent} = useGlobalContext();
    return (
        <div>Alert</div>
        // <div className={`alert-container ${isAlertShowing && 'alert-container show'}`}>
        //     <div className="alert">
        //         {alertContent}
        //     </div>
        //     <button onClick={closeAlert}>close</button>
        // </div>
    )
}
