import React, { useEffect } from 'react'
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getMyOrderDetails } from '../actions/orderActions';
import { Message, LoadingSpinner} from '../components';


export default function MyOrder() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {myOrderDetails}= useSelector((state)=>state.orders);
    const {order, loading, error} = myOrderDetails;

    const {user,createdAt, isDelivered, isPaid, orderItems, paidAt, deliveredAt, shippingAddress, shippingPrice, taxPrice, totalPrice} = order;


    const subtotal = orderItems ? orderItems.reduce((acc,item)=>acc + (item.price*item.quantity),0).toFixed(2) : 0;

    useEffect(()=>{
        dispatch(getMyOrderDetails(id));
    },[id])


    return (
        <div>
            <h1 className="page-title">Order Details</h1>
            {loading ? <LoadingSpinner/> : error ? <Message>{error}</Message> : <div>
            <section className="order-status">
                <h3>Order Status</h3>
                <ul>
                    <li>Order Id: #{id}</li>
                    <li>Customer name: {user.username}</li>
                    <li>Placed on: <Moment format="MMMM DD, YYYY" date={createdAt}/></li>
                    <li>Paid: {isPaid ? `Paid ${paidAt}` : 'Not paid'}</li>
                    <li>Delivered: {isDelivered? `Delivered ${deliveredAt}` : 'Not delivered'}</li>
                </ul>
            </section>
            <section className="order-shipping-section">
                <h3>Shipping Information</h3>
                <p>{}</p>
                <p>{`${shippingAddress.address} ${shippingAddress.city}`}</p>
                <p>{`${shippingAddress.country}, ${shippingAddress.postalCode}`}</p>
            </section>

            {/* <section className="order-payment-section">
                <h3>Payment Information</h3>
                <p>{paymentInfo.cardName}</p>
                <p>{`${paymentInfo.cardType}:  ${paymentInfo.cardNumber && 'XXXX XXXX ' +paymentInfo.cardNumber.substring(paymentInfo.cardNumber.length-4)}`}</p>
            </section> */}

            <section className="order-items-section">
                <h3>Order Items</h3>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orderItems.map((item)=>{
                        return(
                            <tr key={item._id} className="order-item">
                                <td>
                                    <img src={item.image} alt={item.name} />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price} x {item.quantity}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </section>

            <section className="order-summary">
                <h3>Order Summary</h3>
                <ul>
                    <li>${subtotal}</li>
                    <li>Shipping cost: ${shippingPrice}</li>
                    <li>Taxes: ${taxPrice}</li>
                    <li>Total: ${totalPrice}</li>
                </ul>
            </section>
            </div>}
        </div>
    )
}
