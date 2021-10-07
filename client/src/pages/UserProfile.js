import React from 'react';
import { FaCreditCard, FaAddressCard, FaRegStar} from 'react-icons/fa';
import { GoPackage} from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';



export default function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user.userLogin);
    console.log(user);
    const{username,email,address,paymentInfo, orders, wishlist} = user.userInfo;
    const{street,city,state,country,zipcode} = address;

    return (
            <div className="container">
                <div className="account-title-box">
                    <h1 className="account-title">My Account: {username}</h1>
                    <button className="btn logout-btn" onClick={()=>dispatch(logout())}>Logout</button>
                </div>
                
                <section className="account-section account-details">
                    <h2>Account details</h2>
                    <div className="section-content">
                        <ul className="account-details-list">
                            <li>Username: {username}</li>
                            <li>Email: {email}</li>
                            <li>Shipping Information: 
                                <ul className="shipping-info">
                                    <li>{street}</li>
                                    <li>{city}, {state}</li>
                                    <li>{country}</li>
                                    <li>{zipcode}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <span className="account-icon"><FaCreditCard/></span>
                </section>
                <section className="account-section account-payment-info">
                    <h2>Payment information</h2>
                    <div className="section-content">
                        <p>Card: {`${paymentInfo.cardType}, ${paymentInfo.cardNumber}`}</p>
                    </div>
                    <span className="account-icon"><FaAddressCard/></span>
                </section>
                
                <section className="account-section account-orders">
                    <h2>Orders</h2>
                    <div className="section-content">
                        {orders.length>0 ? <p>I have orders</p> : <p>You have not made any orders.</p>}
                    </div>
                    <span className="account-icon"><GoPackage/></span>
                </section>

                <section className="account-section account-wishlist">
                    <h2>Wishlist</h2>
                    <div className="section-content">
                        {wishlist.length>0 ? <p>There's some items in my wishlist.</p> : <p>You haven't added any items to your wishlist!</p>}
                    </div>
                    <span className="account-icon"><FaRegStar/></span>
                </section>
               
            </div>
    )
}
