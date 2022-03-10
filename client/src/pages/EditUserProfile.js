import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import { LoadingSpinner, Message } from "../components";
import { userProfileUpdatingReset } from "../reducers/usersSlice";
import { Helmet } from "react-helmet";

export default function EditUserProfile() {
    const dispatch = useDispatch();
    const {
        user,
        loading,
        error,
        userProfileUpdating,
        userProfileUpdatingError,
        userProfileUpdatingSuccess,
    } = useSelector((state) => state.usersSlice);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [formEdited, setFormEdited] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (!user.username) {
            dispatch(getUserProfile());
        } else {
            setUsername(user.username);
            setEmail(user.email);
            if (user.shippingAddress.address) {
                setAddress(user.shippingAddress.address);
                setCity(user.shippingAddress.city);
                setCountry(user.shippingAddress.country);
                setProvince(user.shippingAddress.province);
                setPostalCode(user.shippingAddress.postalCode);
            }
        }
        if (userProfileUpdatingSuccess) {
            dispatch(userProfileUpdatingReset());
            history.push("/account");
        }
    }, [dispatch, user, userProfileUpdatingSuccess, history]);

    const handlePersonalSubmit = (e) => {
        let validEmail = true;
        e.preventDefault();
        setFormEdited("personal");
        setMessage("");

        if (email) {
            let atloc = email.indexOf("@");
            let dotloc = email.indexOf(".");
            if (atloc < 1 || dotloc - atloc < 2) {
                validEmail = false;
            }
        }
        if (validEmail) {
            if (password) {
                if (password !== confirmPassword) {
                    setMessage("Passwords do not match.");
                } else {
                    const userInfo = {
                        username,
                        email,
                        password,
                        confirmPassword,
                    };
                    dispatch(updateUserProfile(userInfo));
                }
            } else {
                const userInfo = {
                    username,
                    email,
                };
                dispatch(updateUserProfile(userInfo));
            }
        } else {
            setMessage("Invalid email.");
        }
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setFormEdited("address");
        if (!address || !city || !country || !province || !postalCode) {
            setMessage("Not all fields are filled in.");
        } else {
            dispatch(
                updateUserProfile({
                    shippingAddress: {
                        address,
                        city,
                        country,
                        province,
                        postalCode,
                    },
                })
            );
        }
    };

    return (
        <div>
            <Helmet>
                <title>Edit Profile | Tea-Commerce</title>
                <meta
                    name="description"
                    content="Edit user information and shipping address."
                />
            </Helmet>
            <h1 className="page-title">Edit User Profile</h1>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <form
                        className="edit-profile-form"
                        onSubmit={handlePersonalSubmit}
                    >
                        <h2>Personal Information</h2>
                        <div className="input-control">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Edit
                        </button>
                        {formEdited === "personal" &&
                            (userProfileUpdating ? (
                                <LoadingSpinner />
                            ) : userProfileUpdatingError ? (
                                <Message>{userProfileUpdatingError}</Message>
                            ) : userProfileUpdatingSuccess ? (
                                <Message>Personal information updated.</Message>
                            ) : (
                                message && <Message>{message}</Message>
                            ))}
                    </form>

                    <form
                        className="edit-profile-form"
                        onSubmit={handleAddressSubmit}
                    >
                        <h2>Shipping Address</h2>
                        <div className="input-control">
                            <label htmlFor="street">Address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="province">Province</label>
                            <input
                                type="text"
                                name="province"
                                id="province"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                id="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Edit
                        </button>
                        {formEdited === "address" &&
                            (userProfileUpdating ? (
                                <LoadingSpinner />
                            ) : userProfileUpdatingError ? (
                                <Message>{userProfileUpdatingError}</Message>
                            ) : userProfileUpdatingSuccess ? (
                                <Message>Address updated.</Message>
                            ) : (
                                message && <Message>{message}</Message>
                            ))}
                    </form>
                </>
            )}
        </div>
    );
}
