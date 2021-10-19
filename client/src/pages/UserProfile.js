import React, { useEffect } from 'react';
import { FaCreditCard, FaRegStar, FaUserEdit} from 'react-icons/fa';
import { GoPackage} from 'react-icons/go';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logout } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';




export default function UserProfile() {
    const dispatch = useDispatch();
    const userProfile = useSelector((state)=>state.user.userProfile);
    // const {user, loading} = userProfile;
    const user = userProfile.user || {};

    const myOrders = useSelector((state)=>state.orders.myOrders);
    const {orders} = myOrders;

    const history = useHistory();
    
    useEffect(()=>{
        dispatch(getUserProfile())
        dispatch(listMyOrders())
    },[dispatch])

    return (
            <div className="container">
                <div className="account-title-box">
                    <h1 className="account-title">My Account: {user.username}</h1>
                    <button className="btn logout-btn" onClick={()=>dispatch(logout())}>Logout</button>
                </div>
                
                <section className="account-section account-details">
                    <h2>Account details</h2>
                    <div className="section-content">
                        <ul className="account-details-list">
                            <li>Username: {user.username}</li>
                            <li>Email: {user.email}</li>
                            <li>Shipping Information: 
                            {user.shippingAddress ?<ul className="shipping-info">
                                    <li>{user.shippingAddress.address}</li>
                                    <li>{user.shippingAddress.city}, {user.shippingAddress.state}</li>
                                    <li>{user.shippingAddress.country}</li>
                                    <li>{user.shippingAddress.zipcode}</li>
                                </ul>: <p>No shipping information on file.</p>}
                            </li> 
                        </ul>
                    </div>
                    <span className="account-edit-icon" onClick={()=>history.push('/account/edit-profile')}><FaUserEdit/></span>
                    <span className="account-icon"><FaCreditCard/></span>
                </section>
                
                <section className="account-section account-orders">
                    <h2>Orders</h2>
                    <div className="section-content">
                        {orders && orders.length>0 ? 
                        orders.map((order)=>{
                            return(
                                <ul key={order._id}>
                                    <li>Order ID: {order._id}</li>
                                    <li>Order Items: {order.orderItems.length}</li>
                                    <li>Order Price: {order.totalPrice}</li>
                                    <li>Paid: {order.isPaid ? 'paid' : 'not paid'}</li>
                                    <li>Delivered: {order.isDelivered ? 'delivered' : 'not delivered'}</li>
                                </ul>
                            )
                        })
                            
                     : <p>You have not made any orders.</p>}
                    </div>
                    <span className="account-icon"><GoPackage/></span>
                </section>

                <section className="account-section account-wishlist">
                    <h2>Wishlist</h2>
                    <div className="section-content">
                        {user.wishlist && user.wishlist.length>0 ?
                        user.wishlist.map((item)=>{
                            return(
                                <div key={item._id} className="wishlist-item">
                                    <Link to={`/shop/${item.category}/${item.type}/${item._id}`}><img src={item.image} alt={item.name}/></Link>
                                    <h3>{item.name}</h3>
                                </div>
                            )
                        }) : <p>You haven't added any items to your wishlist!</p>}
                    </div>
                    <span className="account-icon"><FaRegStar/></span>
                </section>
               
            </div>
    )
}
