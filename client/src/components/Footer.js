import React from 'react'
import {Link} from 'react-router-dom';
import {FaTwitter, FaInstagram, FaPinterest} from 'react-icons/fa';
import { useGlobalContext} from '../context';
export default function Footer() {
    const{isLoggedIn} = useGlobalContext();
    return (
        <footer>
            <div className="footer-items">
                <ul className="quick-links"> <strong>Quick Links</strong>
                    <li ><Link to="/" className="footer-link">Home</Link></li>
                    <li><Link to="/shop" className="footer-link">Shop</Link></li>
                    <li><Link to="/cart" className="footer-link">Cart</Link></li>
                    <li><Link to="/recipes" className="footer-link">Recipes</Link></li>
                </ul>
                {isLoggedIn ? 
                <ul className="account-links"> <strong>My Account</strong>
                    <li><Link to="/account" className="footer-link">Account Information</Link></li>
                    <li><Link to="/account" className="footer-link">Orders</Link></li>
                    <li><Link to="/account" className="footer-link">Wishlist</Link></li>
                </ul>
                :
                <ul className="account-links"> <strong>My Account</strong>
                    <li><Link to="/login" className="footer-link">Login</Link></li>
                    <li><Link to="/signup" className="footer-link">Signup</Link></li>
                </ul>
                
                }
                
                <ul className="about-links"> <strong>Keep in touch</strong>
                    <li><p>Questions? inquire@tea-commerce.com</p></li>
                    <div className="media-links">
                        <li><a href="#!" className="footer-media-link"><FaInstagram/></a></li>
                        <li><a href="#!" className="footer-media-link"><FaTwitter/></a></li>
                        <li><a href="#!" className="footer-media-link"><FaPinterest/></a></li>
                    </div>
                    
                </ul>
                <p className="copyright-text">Copyright &copy; 2021 Tea Commerce</p>
            </div>
        </footer>
    )
}
