import React from 'react';
import { useGlobalContext } from '../context';
import { FaCreditCard, FaAddressCard, FaRegStar} from 'react-icons/fa';
import { GoPackage} from 'react-icons/go';



export default function Account() {
    const{user,logout} = useGlobalContext();
    const{username,email,address,paymentInfo} = user;
    const{street,city,state,country,zipcode} = address;

    return (
        <main>
            <div className="container">
                <div className="account-title-box">
                    <h1 className="account-title">My Account: {username}</h1>
                    <button className="btn logout-btn" onClick={logout}>Logout</button>
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
                        {user.orders.length>0 ? <p>I have orders</p> : <p>You have not made any orders.</p>}
                    </div>
                    <span className="account-icon"><GoPackage/></span>
                </section>

                <section className="account-section account-wishlist">
                    <h2>Wishlist</h2>
                    <div className="section-content">
                        {user.wishlist.length>0 ? <p>There's some items in my wishlist.</p> : <p>You haven't added any items to your wishlist!</p>}
                    </div>
                    <span className="account-icon"><FaRegStar/></span>
                </section>
               
            </div>
            
            
        </main>
    )
}
