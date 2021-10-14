import React from 'react'
import { Link, useParams } from 'react-router-dom';
export default function OrderSuccess() {
    const {id} = useParams();

    return (
        <div>
            <h1>Order Successful!</h1>
            <p>Order confirmation: {id}</p>
            <Link to="/account">Check your order</Link>
        </div>
    )
}
