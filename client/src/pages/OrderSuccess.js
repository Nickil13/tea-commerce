import React, { useEffect} from 'react'
import { Link} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getCheckoutDetails } from '../actions/checkoutActions';

export default function OrderSuccess() {
    const checkout = useSelector((state)=>state.checkout);
    const {checkoutSession, checkoutDetails} = checkout;
    const dispatch = useDispatch();

    // If paid, updated the status of the order to paid.
    useEffect(()=>{
        dispatch(getCheckoutDetails(checkoutSession));
    },[checkoutSession])

    console.log(checkoutDetails.session && checkoutDetails.session.payment_status);
    return (
        <div>
            <h1>Order Successful!</h1>
            <p>Order confirmation: {checkoutSession}</p>
            <p>Status:{checkoutDetails.session && checkoutDetails.session.payment_status}</p>
            <Link to="/account">Check your order</Link>
        </div>
    )
}
