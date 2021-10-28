import React, { useEffect } from 'react';
import { FaRegHeart, FaUserEdit} from 'react-icons/fa';
import { GoPackage} from 'react-icons/go';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logout, removeWishlistItem } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { OrderCard } from '../components';

export default function UserProfile() {
    const dispatch = useDispatch();
    const {userProfile, userRemoveWishlist} = useSelector((state)=>state.user);
    // const {user, loading} = userProfile;
    const user = userProfile.user || {};
    const {success: wishlistRemoveSuccess} = userRemoveWishlist;

    const myOrders = useSelector((state)=>state.orders.myOrders);
    const {orders} = myOrders;


    const history = useHistory();
    
    useEffect(()=>{
        dispatch(getUserProfile())
        dispatch(listMyOrders())
    },[dispatch])

    useEffect(()=>{
        dispatch(getUserProfile())
    },[wishlistRemoveSuccess])

    const handleWishlistRemoveItem = (id) =>{
        dispatch(removeWishlistItem(id))
    }

    return (
        <div>
            <div className="account-banner">
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <button className="btn logout-btn" onClick={()=>dispatch(logout())}>Logout</button>
            </div>
            <h1 className="account-title">My Account</h1>
        
            <section className="account-section account-details">
                <div className="title-box-account">
                    <h2>Account details</h2>
                    <span className="account-edit-icon" onClick={()=>history.push('/account/edit-profile')}><FaUserEdit/></span>
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
                            <li>{user.shippingAddress.city}, {user.shippingAddress.state}</li>
                            <li>{user.shippingAddress.country}</li>
                            <li>{user.shippingAddress.zipcode}</li>
                        </ul>: <p>No shipping information on file.</p>}
                    </div>
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
                                    <div key={item._id} className="wishlist-item">
                                        <Link to={`/shop/${item.category}/${item.productType}/${item._id}`}><img src={item.image} alt={item.name}/></Link>
                                        {item.flavourImage &&
                                        <div className="flavour-container">
                                            <img src={item.flavourImage} alt={item.name} />
                                        </div>} 
                                        <h3>{item.name}</h3>
                                        <span>{item.productType}</span>
                                        {/* <button className="btn" onClick={()=>handleWishlistRemoveItem(item._id)}>remove</button> */}
                                    </div>
                                )
                            }) : <p>You haven't added any items to your wishlist!</p>}
                        </div>
                        
                        {user.wishlist && user.wishlist.length>3 && <button className="btn">See more items</button>}
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
                        }) : <p>You haven't made any orders.</p>}
                    </div>
                    {user.orders && user.orders.length>3 && <button className="btn">See more orders</button>}
                </div>
                
            </section>

               
            </div>
    )
}
