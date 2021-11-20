import React from 'react';
import {Link} from 'react-router-dom';
import {FaTwitter, FaInstagram, FaPinterest} from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Footer() {
    const user = useSelector((state)=>state.user.userLogin);
    const {userInfo} = user;

    return (
        <footer>
            <div className="footer-container">
                <div className="footer-items">
                    <div className="quick-links">
                        <h4>Quick Links</h4>
                        <ul> 
                            <li ><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                        </ul>
                    </div>
                    <div className="account-links">
                        <h4>My Account</h4>
                        {userInfo ? 
                        <ul>
                            <li><Link to="/account">Account Information</Link></li>
                            <li><Link to="/account/orders">Orders</Link></li>
                            <li><Link to="/account/wishlist">Wishlist</Link></li>
                        </ul>
                        :
                        <ul>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </ul>
                        
                        }
                    </div>
                    
                    <div className="about-links">
                        <h4>Keep in touch</h4>
                        <p>Questions? inquire@tea-commerce.com</p>
                    </div>
                </div>
                <div className="media-links">
                    <ul>
                        <li><a href="#!" className="footer-media-link"><FaInstagram/></a></li>
                        <li><a href="#!" className="footer-media-link"><FaTwitter/></a></li>
                        <li><a href="#!" className="footer-media-link"><FaPinterest/></a></li>
                    </ul>
                </div>

                <p className="copyright-text">Copyright &copy; 2021 Tea Commerce</p>
            </div>
        </footer>
    )
}
