import React, { useEffect } from 'react';
import { FaRegHeart} from 'react-icons/fa';
import { GoPackage} from 'react-icons/go';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile} from '../actions/userActions';
import { AdminBar, LoadingSpinner, Message} from '../components';

export default function UserProfile() {
    const dispatch = useDispatch();
    const {userProfile} = useSelector((state)=>state.user);
    const {user, loading, error} = userProfile;

    const history = useHistory();
    
    useEffect(()=>{
        dispatch(getUserProfile());
    },[dispatch])

    return (
        <div>
            {loading ? <div className="content-container"><LoadingSpinner/></div> : error ? <Message>{error}</Message> : <>
            <div className="account-banner">
                <div className="user-bar">
                    <div>
                        <h3>{user.username}</h3>
                        <p>{user.email}</p>
                    </div>
                    
                    <ul className="banner-links">
                        <li>
                            <Link to="/account/wishlist">
                            <span><FaRegHeart/></span>
                            <p>Wishlist</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/account/orders">
                                <span><GoPackage/></span>
                                <p>Orders</p>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
                {user.isAdmin &&<AdminBar/>}
            </div>

            <h1 className="page-title">My Account</h1>
        
            <section className="account-section account-details">
                
                <div className="section-content">
                    <ul className="account-details-list">
                        <li><strong>Username: </strong> {user.username}</li>
                        <li><strong>Email: </strong> {user.email}</li>
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
                    <button className="btn" onClick={()=>history.push('/account/edit-profile')}>edit</button>
                </div>
            </section>
               </>}
            </div>
    )
}
