import React, { useState, useEffect, useRef } from 'react'
import {Link, NavLink, useHistory} from "react-router-dom";
import { FaShoppingCart, FaBars, FaUserCircle } from 'react-icons/fa';
import { GiTeapot } from 'react-icons/gi';
import { useSelector, useDispatch} from 'react-redux';
import { getUserProfile, logout} from '../actions/userActions';
import { useGlobalContext } from '../context';
import { CART_ADD_ITEM_RESET, CART_REMOVE_ITEM_RESET } from '../constants/userConstants';

export default function Navbar() {
    const dispatch = useDispatch();
    const {userProfile, userRemoveFromCart, userAddToCart} = useSelector((state)=>state.user);
    const {user} = userProfile;
    const {success: addToCartSuccess} = userAddToCart;
    const {success: removeFromCartSuccess} = userRemoveFromCart;

    const[showDropdown,setShowDropdown] = useState(false);
    const{openSidebar} = useGlobalContext();
    const history = useHistory();
    const navbar = useRef(null);

    const cartItemAmount = user && user.cartItems.reduce((acc,item)=>acc + Number(item.quantity), 0);

    useEffect(()=>{
        if(user && !user.username || addToCartSuccess || removeFromCartSuccess){
            dispatch(getUserProfile());
            dispatch({type: CART_REMOVE_ITEM_RESET});
            dispatch({type: CART_ADD_ITEM_RESET})
        }
    }, [user, dispatch, addToCartSuccess, removeFromCartSuccess])

    useEffect(()=>{
        document.addEventListener("mousedown", handleDropdownMenu);
        return () => {
            document.removeEventListener("mousedown", handleDropdownMenu);
        }
    },[])

    const handleDropdownMenu = (e) => {
        if(navbar.current && !navbar.current.contains(e.target)){
            setShowDropdown(false);
        }
        
    }

    const handleLogoutClick = () => {
        setShowDropdown(false);
        history.push("/");
        dispatch(logout());
    }

    const handleAccountClick = () => {
        setShowDropdown(false);
        history.push(`${user.username ? "/account" : "/login"}`);
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
                    {user && user.username ? 
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
                            {cartItemAmount>0 && <span className="cart-icon-amount">{cartItemAmount}</span>}
                        </Link>
                    </li>
                </ul>
            </nav>      
        </div>
    )
}
