import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { OrderCard } from '../components';
export default function MyOrders() {
    const myOrders = useSelector((state)=>state.orders.myOrders);
    const {orders} = myOrders;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listMyOrders());
    },[])

    return (
        <div>
            <h1 className="page-title">My Orders</h1>
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
