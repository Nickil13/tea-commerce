import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../actions/userActions";
import { AccountBar, LoadingSpinner, Message } from "../components";
import { Helmet } from "react-helmet";

export default function UserProfile() {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.usersSlice);
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            dispatch(getUserProfile());
        }
    }, [user, dispatch]);

    return (
        <div>
            <Helmet>
                <title>My Account | Tea-Commerce</title>
                <meta
                    name="description"
                    content="User profile and information."
                />
            </Helmet>
            {loading ? (
                <div className="content-container">
                    <LoadingSpinner />
                </div>
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <AccountBar
                        username={user.username}
                        email={user.email}
                        role={user.role}
                    />
                    <h1 className="page-title">My Account</h1>

                    <section className="account-section">
                        <div className="section-container">
                            <div className="section-content">
                                <ul className="account-details-list">
                                    <li>
                                        <strong>Username: </strong>{" "}
                                        {user.username}
                                    </li>
                                    <li>
                                        <strong>Email: </strong> {user.email}
                                    </li>
                                </ul>
                                <div className="shipping-info">
                                    <h4>Shipping Information</h4>
                                    {user.shippingAddress?.address ? (
                                        <ul>
                                            <li>
                                                {user.shippingAddress.address}
                                            </li>
                                            <li>
                                                {user.shippingAddress.city},{" "}
                                                {user.shippingAddress.province}
                                            </li>
                                            <li>
                                                {user.shippingAddress.country}
                                            </li>
                                            <li>
                                                {user.shippingAddress.zipcode}
                                            </li>
                                        </ul>
                                    ) : (
                                        <p>No shipping information on file.</p>
                                    )}
                                </div>
                                <button
                                    className="btn"
                                    onClick={() =>
                                        history.push("/account/edit-profile")
                                    }
                                >
                                    edit
                                </button>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
