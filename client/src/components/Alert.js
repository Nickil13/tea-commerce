import React from 'react';
import { useGlobalContext } from '../context';
import {VscClose} from 'react-icons/vsc';
import {FaShoppingCart, FaHeart} from 'react-icons/fa';

export default function Alert() {
    const{isAlertShowing,closeAlert,alertContent} = useGlobalContext();
    
    React.useEffect(()=>{
        setTimeout(()=>{
            closeAlert();
        },[4000])
    },[isAlertShowing])

    return (
        <div className={`alert-container ${isAlertShowing && 'alert-container show'}`}>
            <div className="alert">
                <div className="alert-icon">
                    {alertContent.alertType==='cart' && <FaShoppingCart/>} {alertContent.alertType==='wishlist' && <FaHeart/>}
                </div>
                
                {alertContent.alertType==='cart' && <p>Added <strong>{alertContent.name}</strong> to the cart!</p>}
                {alertContent.alertType==='wishlist' && <p>Added <strong><ul>{alertContent.name}</ul></strong> to your wishlist!</p>}
            </div>
        <VscClose className='alert-close-icon' onClick={closeAlert}/>
        </div>
    )
}
