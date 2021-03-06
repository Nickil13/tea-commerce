import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, updateCurrentUser } from "../actions/userActions";
import { LoadingSpinner, Message } from "../components";
import { Helmet } from "react-helmet";
export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const { authenticated, loading, error } = useSelector(
        (state) => state.usersSlice
    );
    const { cartItems: localCartItems } = useSelector(
        (state) => state.localCartSlice
    );
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] =
        useState(false);

    useEffect(() => {
        if (authenticated) {
            // If the user is logging in in order to checkout, push to shipping.
            // Update the users cart to have the local cart items.
            if (location.search.includes("redirect")) {
                history.push(location.search.split("=")[1]);
                dispatch(
                    updateCurrentUser({
                        cartItems: localCartItems,
                    })
                );
            } else {
                history.push("/account");
            }
        }
    }, [history, authenticated, location, localCartItems, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        //Form validation
        setUsernameError(false);
        setEmailError(false);
        setPasswordError(false);
        setPasswordConfirmationError(false);

        if (!username || !email || !password || !confirmPassword) {
            if (!username) {
                setUsernameError(true);
            }
            if (!email) {
                setEmailError(true);
            }
            if (!password) {
                setPasswordError(true);
            }
            if (!confirmPassword) {
                setPasswordConfirmationError(true);
            }
        } else {
            dispatch(registerUser(username, email, password, confirmPassword));
        }
    };

    return (
        <div
            className="login-container signup-container"
            onSubmit={handleSubmit}
        >
            <Helmet>
                <title>Signup | Tea-Commerce</title>
                <meta
                    name="description"
                    content="Create a Tea-Commerce account."
                />
            </Helmet>
            <h1>Sign up</h1>
            <form className="login-form">
                <div className="input-control">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        style={{ textTransform: "capitalize" }}
                        className={usernameError ? "invalid-input-dark" : ""}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && (
                        <p className="validation-error">invalid username</p>
                    )}
                </div>
                <div className="input-control">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        className={emailError ? "invalid-input-dark" : ""}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <p className="validation-error">invalid email</p>
                    )}
                </div>
                <div className="input-control">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        className={passwordError ? "invalid-input-dark" : ""}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                        <p className="validation-error">invalid password</p>
                    )}
                </div>
                <div className="input-control">
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="confirm password"
                        className={
                            passwordConfirmationError
                                ? "invalid-input-dark"
                                : ""
                        }
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordConfirmationError && (
                        <p className="validation-error">
                            confirmation required
                        </p>
                    )}
                </div>
                {error && <Message type="error">{error}</Message>}
                <button type="submit" className="btn btn-primary">
                    Sign up
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
            <img src="/images/blob.svg" alt="blob" className="signup-blob" />
            {loading && <LoadingSpinner />}
        </div>
    );
}
