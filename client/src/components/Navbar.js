import React, { useState, useEffect, useRef } from 'react'
import {Link, NavLink, useHistory} from "react-router-dom";
import { FaShoppingCart, FaBars, FaUserCircle } from 'react-icons/fa';
import { GiTeapot } from 'react-icons/gi';
import { GoSearch } from 'react-icons/go';
import { useSelector, useDispatch} from 'react-redux';
import { logout} from '../actions/userActions';
import { useGlobalContext } from '../context';

export default function Navbar() {
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.user.userLogin);
    const {userInfo} = user;
    
    const cart = useSelector((state)=>state.cart);
    const {cartItems} = cart;

    const[showDropdown,setShowDropdown] = useState(false);
    const{openSidebar, openSearchModal} = useGlobalContext();
    const history = useHistory();
    const navbar = useRef(null) ;

    const cartItemAmount = cartItems.reduce((acc,item)=>acc + Number(item.quantity), 0);

    const handleDropdownMenu = (e) => {
        if(navbar.current && !navbar.current.contains(e.target)){
            setShowDropdown(false);
        }
        
    }
    useEffect(()=>{
        document.addEventListener("mousedown", handleDropdownMenu);
        return () => {
            document.removeEventListener("mousedown", handleDropdownMenu);
        }
    },[])

    const handleLogoutClick = () => {
        setShowDropdown(false);
        history.push("/");
        dispatch(logout());
    }

    const handleAccountClick = () => {
        setShowDropdown(false);
        history.push(`${user ? "/account" : "/login"}`);
    }
  
    return (
        <div className="nav-container" ref={navbar}>
            <nav>
                <div className="sidebar-toggle"
                    onClick={openSidebar}><FaBars/></div>

                <Link className="logo" to="/">Tea Commerce</Link>

                <ul className="nav-links"><li>
                        <NavLink activeClassName="active-nav" className="nav-link" to="/shop" exact>
                            Shop All</NavLink>
                    </li>
                    <li>
                        <NavLink
                        activeClassName="active-nav" className="nav-link" to="/shop/loose leaf">
                            Loose Leaf</NavLink>
                    </li>
                    <li>
                        <NavLink
                        activeClassName="active-nav"  className="nav-link" to="/shop/matcha">
                            Matcha</NavLink>
                    </li>
                    <li>
                        <NavLink
                        activeClassName="active-nav" className="nav-link" to="/shop/tea mixes">
                            Mixes</NavLink>
                    </li>
                    
                </ul>
                <ul className="nav-icons">
                    <li className="nav-link search-link">
                        <GoSearch className="nav-icon" onClick={openSearchModal}/>
                    </li>
                    {userInfo ? 
                    <div className="nav-dropdown">
                        <FaUserCircle className="nav-icon nav-icon-loggedin" onClick={()=>setShowDropdown(true)}/>
                        {showDropdown &&
                        <ul className="dropdown-items"> 
                            <li className="dropdown-username">
                            <GiTeapot className="dropdown-icon"/>{user.username}</li>
                            <li>
                                <button onClick={handleAccountClick} className="btn dropdown-btn"> My Account
                                    </button>
                            </li>
                            <li>
                                <button onClick={handleLogoutClick} className="btn dropdown-btn"> Logout
                                    </button>
                            </li>
                    </ul>}
                        
                    </div>
                     :
                    <li className="nav-link">
                        <Link to="/login">
                            <FaUserCircle className="nav-icon"/>
                        </Link>
                    </li>
                    } 
                    <li className="nav-link cart-link">
                        <Link to="/cart">
                            <FaShoppingCart className="nav-icon" />
                            <span className="cart-icon-amount">{cartItemAmount}</span>
                        </Link>
                    </li>
                </ul>
            </nav>      
        </div>
    )
}
