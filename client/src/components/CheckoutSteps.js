import React from 'react'
import { Link } from 'react-router-dom';

export default function CheckoutSteps({currentStepNum}) {
    console.log(currentStepNum);
    return (
        <div className="checkout-steps">
            <Link to='/login' className={currentStepNum===1 ? 'active-step' : ''}>Login</Link>
            <Link to='/shipping' className={currentStepNum===2 ? 'active-step' : ''}>Shipping</Link>
            <Link to='/payment' className={currentStepNum===3 ? 'active-step' : ''}>Payment</Link>
            <Link to='/placeorder' className={currentStepNum===4 ? 'active-step' : ''}>Place Order</Link>
        </div>
    )
}
