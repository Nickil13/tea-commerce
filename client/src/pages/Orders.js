import React, { useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { listOrders } from '../actions/orderActions';
import { Loader, Message, OrderCard } from '../components';

export default function Orders() {
    const dispatch = useDispatch();
    const {listedOrders} = useSelector((state)=>state.orders);
    const {orders, loading, error} = listedOrders;

    useEffect(()=>{
        dispatch(listOrders());
    }, [])

    return (
        <div>
            <h1>Orders</h1>
            {loading && <Loader/>}
            {error && <Message>{error}</Message>}
            <div>
                {orders.length>0 && orders.map((order)=>{
                    return(
                        <OrderCard key={order._id} {...order}/>
                    )
                })}
            </div>
        </div>
    )
}
