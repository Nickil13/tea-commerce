import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { GrMenu } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, logout } from "../actions/userActions";
import { useGlobalContext } from "../context";
import { teaProductCategories as categories } from "../resources/teaInfoData";

export default function Navbar() {
    const dispatch = useDispatch();
    const {
        user,
        authenticated,
        cartItemAddedSuccess,
        cartItemRemovedSuccess,
    } = useSelector((state) => state.usersSlice);

    const { cartItems: localCartItems } = useSelector(
        (state) => state.localCartSlice
    );

    const [showDropdown, setShowDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const { openSidebar } = useGlobalContext();

    const history = useHistory();
    const navbar = useRef(null);
    const container = useRef(null);

    const cartItemAmount = cartItems
        ? cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)
        : 0;

    useEffect(() => {
        if (authenticated) {
            if (!user.username) {
                dispatch(getUserProfile());
            } else {
                setCartItems(user.cartItems);
            }
        } else {
            setCartItems(localCartItems);
        }
    }, [
        user,
        authenticated,
        localCartItems,
        dispatch,
        cartItemAddedSuccess,
        cartItemRemovedSuccess,
    ]);

    useEffect(() => {
        document.addEventListener("mousedown", closeDropdownMenu);
        return () => {
            document.removeEventListener("mousedown", closeDropdownMenu);
        };
    }, []);

    const closeDropdownMenu = (e) => {
        if (navbar.current && !navbar.current.contains(e.target)) {
            setShowDropdown(false);
        }
    };

    const handleDropdownClick = (e) => {
        const temp = e.target.getBoundingClientRect();
        const dropdownItems = document.getElementById("nav-dropdown-items");
        const itemsWidth =
            dropdownItems.getBoundingClientRect().width !== 0
                ? dropdownItems.getBoundingClientRect().width
                : 125;

        // Get dimensions of the container
        const center = (temp.left + temp.right) / 2;
        const bottom = temp.bottom - 10;
        const dropdown = container.current;

        dropdown.style.left = `-${
            Math.floor(itemsWidth / 2 - (center - temp.left)) + 4
        }px`;
        dropdown.style.top = `${Math.floor(bottom)}px`;

        setShowDropdown(true);
    };

    const handleLogoutClick = () => {
        setShowDropdown(false);
        history.push("/");
        dispatch(logout());
    };

    const handleAccountClick = () => {
        setShowDropdown(false);
        history.push(`${user.username ? "/account" : "/login"}`);
    };

    return (
        <div className="nav-container" ref={navbar}>
            <nav>
                <Link className="logo" to="/">
                    Tea Commerce
                </Link>
                <ul className="nav-links">
                    {categories.map((category, index) => {
                        let url =
                            category.type === "all"
                                ? "/shop"
                                : `/shop/${category.type}`;
                        return (
                            <li key={index}>
                                <NavLink
                                    activeClassName="active-nav"
                                    to={url}
                                    exact
                                >
                                    {category.type === "all"
                                        ? "Shop All"
                                        : category.type}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <div className="nav-icon-container">
                    <ul className="nav-icons">
                        {authenticated ? (
                            <div className="nav-dropdown">
                                <span onClick={handleDropdownClick}>
                                    <FaUserCircle className="nav-icon nav-icon-loggedin" />
                                </span>
                                <ul
                                    className={`dropdown-items ${
                                        showDropdown && "dropdown-items show"
                                    }`}
                                    ref={container}
                                    id="nav-dropdown-items"
                                >
                                    <h4>{user.username}</h4>
                                    <li>
                                        <button
                                            onClick={handleAccountClick}
                                            className="btn dropdown-btn"
                                        >
                                            Account
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogoutClick}
                                            className="btn dropdown-btn"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <li>
                                <Link to="/login">
                                    <FaUserCircle className="nav-icon" />
                                </Link>
                            </li>
                        )}

                        <li className="cart-link">
                            <Link to="/cart">
                                <IoCart className="nav-icon" />
                                {cartItemAmount > 0 && (
                                    <span className="cart-icon-amount">
                                        {cartItemAmount}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                    <div className="sidebar-toggle" onClick={openSidebar}>
                        <GrMenu />
                    </div>
                </div>
            </nav>
        </div>
    );
}
