import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export default function OrderCard({_id, createdAt, orderItems, totalPrice, isPaid, isDelivered}) {
    return (
        <div className="order-card">
            <Link to={`/account/orders/${_id}`}><h3>Order: #{_id}</h3></Link>
            <ul>
                <li>Date placed: <Moment format="MMMM DD, YYYY" date={createdAt}/></li>
                <li>Items: {orderItems.length}</li>
                <li>Total price: ${totalPrice}</li>
                <li>Status:
                    <ul>
                        <li>Paid: {isPaid ? 'true' : 'false'}</li>
                        <li>Delivered: {isDelivered ? 'true' : 'false'}</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
