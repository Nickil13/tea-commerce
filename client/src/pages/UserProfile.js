import React, { useEffect } from 'react';
import { FaRegHeart, FaUserEdit} from 'react-icons/fa';
import { GoPackage} from 'react-icons/go';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logout} from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { LoadingSpinner, Message, OrderCard, WishlistCard } from '../components';

export default function UserProfile() {
    const dispatch = useDispatch();
    const {userProfile, userRemoveWishlist} = useSelector((state)=>state.user);
    const {user, loading, error} = userProfile;
    const {success: wishlistRemoveSuccess} = userRemoveWishlist;

    const myOrders = useSelector((state)=>state.orders.myOrders);
    const {orders} = myOrders;


    const history = useHistory();
    
    useEffect(()=>{
        dispatch(getUserProfile())
        dispatch(listMyOrders())
    },[dispatch, wishlistRemoveSuccess])

    return (
        <div>
            {loading ? <LoadingSpinner/> : error ? <Message>{error}</Message> : <>
            <div className="account-banner">
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <button className="btn logout-btn" onClick={()=>dispatch(logout())}>Logout</button>
                {user.isAdmin &&
                <div className="admin-bar">
                    <div className="admin-links">
                        <Link className="btn btn-primary" to="/admin/orders">Orders</Link>
                        <Link className="btn btn-primary" to="/admin/users"> Users</Link>
                        <Link className="btn btn-primary" to="/admin/products">Products</Link>
                    </div> 
                </div>
                }
            </div>
            <h1 className="page-title">My Account</h1>
        
            <section className="account-section account-details">
                <div className="title-box-account">
                    <span className="account-icon"><FaUserEdit/></span>
                    <h2>Account details</h2>
                </div>
                <div className="section-content">
                    <ul className="account-details-list">
                        <li>Username: {user.username}</li>
                        <li>Email: {user.email}</li>
                    </ul>
                    <div className="shipping-info">
                        <h4>Shipping Information</h4>   
                        {user.shippingAddress && user.shippingAddress.address ?
                        <ul>
                            <li>{user.shippingAddress.address}</li>
                            <li>{user.shippingAddress.city}, {user.shippingAddress.province}</li>
                            <li>{user.shippingAddress.country}</li>
                            <li>{user.shippingAddress.zipcode}</li>
                        </ul>: <p>No shipping information on file.</p>}
                    </div>
                    <button className="btn account-edit-btn" onClick={()=>history.push('/account/edit-profile')}>edit</button>
                </div>
            </section>
                
            <section className="account-section account-wishlist">
                <div className="title-box-account">
                    <span className="account-icon"><FaRegHeart/></span>
                    <h2>Wishlist</h2>
                </div>
                    <div className="section-content">
                        <p>Add items to your wishlist by clicking the heart next to the name of the product.</p>
                        <div className="profile-wishlist">
                            {user.wishlist && user.wishlist.length>0 ?
                            user.wishlist.slice(0,3).map((item)=>{
                                return(
                                    <WishlistCard key={item._id} {...item}/>
                                )
                            }) : 
                                <Message>You haven't added any items to your wishlist!</Message>}
                        </div>
                        
                        <Link className="btn wishlist-btn" to="/account/wishlist">See all items</Link>
                    </div>
                    
            </section>
            <section className="account-section account-orders">
                <div className="title-box-account">
                    <span className="account-icon"><GoPackage/></span>
                    <h2>Orders</h2>
                </div>
                
                <div className="section-content">
                    <p>Your most recent orders.</p>
                    <div className="profile-orders">
                        {orders && orders.length>0 ? orders.slice(0,3).map((order)=>{
                            return(
                                <OrderCard key={order._id} {...order}/>
                            )
                        }) : <Message>You haven't made any orders.</Message>}
                    </div>
                    {user.orders && user.orders.length>3 && <button className="btn">See more orders</button>}
                </div>
                
            </section>

               </>}
            </div>
    )
}
