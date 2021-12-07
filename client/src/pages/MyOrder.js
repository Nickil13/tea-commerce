import React, { useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getMyOrderDetails } from '../actions/orderActions';
import { Message, LoadingSpinner, OrderTable} from '../components';


export default function MyOrder() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {myOrderDetails}= useSelector((state)=>state.orders);
    const {order, loading, error} = myOrderDetails;

    const {user,createdAt, isDelivered, isPaid, orderItems, paidAt, paymentMethod, deliveredAt, shippingAddress, shippingPrice, taxPrice, totalPrice} = order;


    const subtotal = orderItems ? orderItems.reduce((acc,item)=>acc + (item.price*item.quantity),0).toFixed(2) : 0;

    useEffect(()=>{
        dispatch(getMyOrderDetails(id));
    },[id, dispatch])


    return (
        <div>
            <h1 className="page-title">Order Details</h1>
            {loading ? <LoadingSpinner/> : error ? <Message>{error}</Message> : <div>
            <section className="order-status">
                <p><strong>Order Id</strong>: #{id}</p>
                <div className="order-subsection">
                    <h3>Customer</h3>
                    <ul>
                        <li><strong>Customer Id: </strong> {user._id}</li>
                        <li><strong>Customer name: </strong> {user.username}</li>
                    </ul>
                </div>
                <div className="order-subsection">
                    <h3>Status</h3>
                    <ul>
                        <li><strong>Placed on: </strong> <Moment format="YYYY-MM-DD, HH:mm" date={createdAt}/></li>
                        <li className="payment-status"><strong>Paid: </strong> 
                            <ul>
                                <li>Paid at: {isPaid? <Moment format="YYYY-MM-DD, HH:mm" date={paidAt}/>: 'Not paid'}</li>
                                <li>Payment method: {paymentMethod}</li>
                            </ul>
                        </li>
                        <li><strong>Delivered: </strong> {isDelivered?<Moment format="YYYY-MM-DD, HH:mm" date={deliveredAt}/> : 'Not delivered'}</li>
                    </ul>
                </div>
            </section>
            <section className="order-shipping-section">
                <h3>Shipping Information</h3>
                <ul>
                    <li>{shippingAddress.address}</li>
                    <li>{shippingAddress.city}, {shippingAddress.province}</li>
                    <li>{shippingAddress.country}</li>
                    <li>{shippingAddress.postalCode}</li>
                </ul>
            </section>

            <section className="order-items-section">
                <h3>Order Items</h3>
                <OrderTable orderItems={orderItems}/>
                
            </section>

            <section className="order-summary">
                <h3>Order Summary</h3>
                <ul>
                    <li>Subtotal: ${subtotal}</li>
                    <li>Shipping cost: ${shippingPrice}</li>
                    <li>Taxes: ${taxPrice}</li>
                    <li>Total: ${totalPrice}</li>
                </ul>
            </section>
            </div>}
        </div>
    )
}
