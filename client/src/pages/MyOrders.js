import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { OrderCard, Message, LoadingSpinner } from '../components';
export default function MyOrders() {
    const myOrders = useSelector((state)=>state.orders.myOrders);
    const {orders, loading} = myOrders;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listMyOrders());
    },[])

    return (
        <div>
            <h1 className="page-title">My Orders</h1>
            {loading ? <LoadingSpinner/> : <div>
                {orders.length>0 ? orders.map((order)=>{
                    return(
                        <OrderCard key={order._id} {...order}/>
                    )
                }) : <Message>You have not placed any orders.</Message>}
            </div>}
        </div>
    )
}
