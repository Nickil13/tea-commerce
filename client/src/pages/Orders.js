import React, { useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
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
            <div className="admin-bar">
                <div className="admin-links">
                    <Link className="btn btn-primary" to="/admin/orders">Orders</Link>
                    <Link className="btn btn-primary" to="/admin/users"> Users</Link>
                    <Link className="btn btn-primary" to="/admin/products">Products</Link>
                </div> 
            </div>
            <h1 className="page-title">Orders</h1>
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
