import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Message } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { login, updateUserProfile } from "../actions/userActions";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const { authenticated, loginError } = useSelector(
        (state) => state.usersSlice
    );

    const { cartItems: localCartItems } = useSelector(
        (state) => state.localCartSlice
    );

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (authenticated) {
            // If the user is logging in in order to checkout, push to shipping.
            // Update the users cart to have the local cart items.
            if (location.search.includes("redirect")) {
                history.push(location.search.split("=")[1]);
                dispatch(
                    updateUserProfile({
                        cartItems: localCartItems,
                    })
                );
            } else {
                history.push("/account");
            }
        }
    }, [authenticated, dispatch, history, localCartItems, location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginInfo = { username, password };
        dispatch(login(loginInfo));
    };

    const handleDemoLogin = () => {
        dispatch(login("demoUser1", "d3m0us3r"));
    };
    return (
        <div className="login-container" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <form className="login-form">
                <div className="input-control">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        className={loginError ? "invalid-input-dark" : ""}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-control">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        className={loginError ? "invalid-input-dark" : ""}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {loginError && <Message type="error">{loginError}</Message>}
                <button type="submit" className="btn btn-primary">
                    Log in
                </button>
            </form>
            <p>
                Don't have an account?{" "}
                <Link
                    to={
                        location.search.includes("redirect")
                            ? `/signup?redirect=${
                                  location.search.split("=")[1]
                              }`
                            : "/signup"
                    }
                >
                    Sign up
                </Link>
                <br />
                or{" "}
                <span className="demo-login-link" onClick={handleDemoLogin}>
                    login as a demo user
                </span>
            </p>
        </div>
    );
}
