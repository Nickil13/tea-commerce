import React from "react";
import { FaRegHeart, FaUser } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { Link } from "react-router-dom";
import AdminBar from "./AdminBar";

export default function AccountBar({ username, email, role }) {
    return (
        <div className="account-banner">
            <div className="user-bar">
                <div>
                    <h3>{username}</h3>
                    <p>{email}</p>
                </div>

                <ul className="banner-links">
                    <li>
                        <Link to="/account/wishlist">
                            <span>
                                <FaRegHeart />
                            </span>
                            <p>Wishlist</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/account/orders">
                            <span>
                                <GoPackage />
                            </span>
                            <p>Orders</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/account">
                            <span>
                                <FaUser />
                            </span>
                            <p>My account</p>
                        </Link>
                    </li>
                </ul>
            </div>
            {role === "admin" && <AdminBar />}
        </div>
    );
}
