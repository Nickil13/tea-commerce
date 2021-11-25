import React from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutSteps({currentStepNum}) {
    
    return (
        <ul className="checkout-steps">
            {currentStepNum > 0  ? <li>
                <Link to='/login' className={currentStepNum===1 ? `active-step`: ''}>Login</Link>
            </li> : <li>Login</li>}
            {currentStepNum > 1 ? <li>
                <Link to='/shipping' className={currentStepNum===2 ? `active-step`: ''} >Shipping</Link>
            </li> : <li>Shipping</li>}
            {currentStepNum > 2 ? <li>
                <Link to='/payment' className={currentStepNum===3 ? `active-step`: ''}>Payment</Link>
            </li> : <li>Payment</li>}
            {currentStepNum > 3 ? <li>
                <Link to='/placeorder' className={currentStepNum===4 ? `active-step`: ''}>Place Order</Link>
            </li> : <li>Place Order</li>}
        </ul>
    )
}
