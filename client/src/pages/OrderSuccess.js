import React, { useEffect} from 'react'
import { Link, useLocation ,useParams} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getCheckoutDetails } from '../actions/checkoutActions';
import { updateOrderToPaid } from '../actions/orderActions';
import { updateUserProfile } from '../actions/userActions';

export default function OrderSuccess() {
    const {checkoutDetails} = useSelector((state)=>state.checkout);
    const {session, success: detailsSuccess} = checkoutDetails;
    const dispatch = useDispatch();
    const location = useLocation();
    const {id} = useParams();

    
    // useEffect(()=>{
    //     dispatch(getCheckoutDetails(location.search.split("=")[1]));
    // }, [dispatch, location, id])
    
    useEffect(()=>{
        if(detailsSuccess){
            //Pay order
            const paymentResult = {
                id: session.id,
                status: session.payment_status,
                customer_details: session.customer_details
            }
            dispatch(updateOrderToPaid(id,paymentResult));

            //Clear the cart
            dispatch(updateUserProfile({
                cartItems: []
            }))
        }else{
            dispatch(getCheckoutDetails(location.search.split("=")[1]));
        }
    }, [detailsSuccess, dispatch, id, session, location])

    return (
        <div>
            <h1 className="page-title">Order Successful</h1>
            <div className="order-success-info">
                <p>Thank you for you order!</p>
                <p>For status updates and order information, <Link to="/account">check your orders</Link>.</p>
            </div>
        </div>
    )
}
