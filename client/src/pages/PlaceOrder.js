import React, { useEffect } from 'react'
import { CheckoutSteps, OrderTable } from '../components'
import { useSelector, useDispatch } from 'react-redux';
import { createCheckoutSession } from '../actions/checkoutActions';
import { createOrder } from '../actions/orderActions';
import { Message } from '../components';

export default function PlaceOrder() {
    const {userProfile, userPaymentMethod} = useSelector((state)=>state.user);
    const {shippingAddress, cartItems} = userProfile.user;
    const {paymentMethod} = userPaymentMethod; 

    const subtotal = cartItems.reduce((acc,item)=>acc + (item.price*item.quantity),0).toFixed(2);

    const shipping = subtotal < 80.00 ? (subtotal*0.15).toFixed(2) : 0;

    const taxes = (subtotal * 0.05).toFixed(2);

    const total = (Number(subtotal)+Number(shipping) + Number(taxes)).toFixed(2);

    const dispatch = useDispatch();

    const checkout = useSelector((state)=>state.checkout);
    const {checkoutSession} = checkout;
    const {url, success: checkoutSessionSuccess} = checkoutSession;

    const createdOrder = useSelector((state)=>state.orders.createdOrder);
    const {loading, success: orderSuccess, error: orderError, order} = createdOrder;

    useEffect(()=>{
        if(orderSuccess){
            dispatch(createCheckoutSession(order._id,cartItems, taxes, shipping)); 
        }
    },[orderSuccess,dispatch])

    useEffect(()=>{
        if(checkoutSessionSuccess && url){
            window.location = checkoutSession.url;
        }
    },[checkoutSessionSuccess])

    const handlePlaceOrder = () =>{
        dispatch(createOrder(
            {cartItems, shippingAddress, paymentMethod, subtotal, taxes, shipping, total}
        ));
    }

    return (
        <div>
            <CheckoutSteps currentStepNum={4}/>
            <h1 className="page-title">Place Order</h1>
            <section className="order-shipping-section">
                <h3>Shipping Information</h3>
                <p>{`${shippingAddress.address} ${shippingAddress.city}, ${shippingAddress.province}`}</p>
                <p>{`${shippingAddress.country}, ${shippingAddress.postalCode}`}</p>
            </section>

            <section className="order-payment-section">
                <h3>Payment Information</h3>
                <p>Transaction type: {paymentMethod}</p>
            </section>

            <section className="order-items-section">
                <h3>Order Items</h3>
                <OrderTable orderItems={cartItems}/>
            </section>

            <section className="order-summary">
                <h3>Order Summary</h3>
                <ul>
                    <li>Subtotal: ${subtotal}</li>
                    <li>Shipping cost: ${shipping}</li>
                    <li>Taxes: ${taxes}</li>
                    <li>Total: ${total}</li>
                </ul>
                <button className="btn-secondary" onClick={handlePlaceOrder}>Place Order</button>
                {loading && <p>Placing order...</p>}
                {orderError && <Message>{orderError}</Message>}
            </section>
            
        </div>
    )
}
