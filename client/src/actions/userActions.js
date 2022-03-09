import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    cartCleared,
    cartItemAdded,
    cartItemQuantityUpdated,
    cartItemRemoved,
    selectedUserDeleted,
    selectedUserLoaded,
    userAuthenticated,
    userAuthenticatedError,
    userAuthenticating,
    userError,
    userLoaded,
    userLoggedOut,
    userPaymentMethodSaved,
    userRegistered,
    usersLoaded,
    usersLoading,
    wishlistItemAdded,
    wishlistItemRemoved,
} from "../reducers/usersSlice";

export const login = createAsyncThunk(
    "users/login",
    async (loginInfo, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/users/login",
                loginInfo,
                config
            );

            return data;
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const logout = () => async (dispatch) => {
    try {
        await axios.get("/api/users/logout");

        dispatch(userLoggedOut());

        localStorage.removeItem("tc-preferredPaymentMethod");
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};

export const isUserLoggedIn = () => async (dispatch) => {
    try {
        dispatch(userAuthenticating());
        const { data } = await axios.get("/api/users/isLoggedIn");

        dispatch(userAuthenticated(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userAuthenticatedError(errorMessage));
    }
};

export const registerUser =
    (username, email, password, confirmPassword) => async (dispatch) => {
        try {
            dispatch(usersLoading());

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match.");
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/users",
                {
                    username,
                    email,
                    password,
                },
                config
            );

            dispatch(userRegistered(data));

            const userInfo = {
                username,
                password,
            };
            //Log in after registering
            dispatch(login(userInfo));
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            dispatch(userError(errorMessage));
        }
    };

export const updateCurrentUser = createAsyncThunk(
    "users/updateUser",
    async (user, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.put(
                "/api/users/currentUser",
                user,
                config
            );

            return data;
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "users/updateUserProfile",
    async (user, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.put(
                "/api/users/profile",
                user,
                config
            );

            return data;
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch(usersLoading());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.get("/api/users/profile", config);

        dispatch(userLoaded(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};

// Cart actions
export const addToCart = (id, quantity) => async (dispatch) => {
    try {
        const { data: user } = await axios.get("/api/users/profile");

        const { data: product } = await axios.get(`/api/products/${id}`);

        // Check if the item is already in the cart
        const itemExists = user.cartItems.find((item) => item._id === id);

        let newCartItems = [];

        if (itemExists) {
            newCartItems = user.cartItems.map((item) => {
                if (item._id === id) {
                    let newQuantity = item.quantity + Number(quantity);
                    if (newQuantity > item.countInStock) {
                        item.quantity = item.countInStock;
                    } else {
                        item.quantity = item.quantity + Number(quantity);
                    }
                    return item;
                } else {
                    return item;
                }
            });
        } else {
            newCartItems = [
                ...user.cartItems,
                {
                    _id: id,
                    name: product.name,
                    category: product.category,
                    productType: product.productType,
                    image: product.image,
                    price: product.price,
                    countInStock: product.countInStock,
                    flavourImage: product.flavourImage,
                    quantity,
                },
            ];
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            "/api/users/currentUser",
            { cartItems: newCartItems },
            config
        );

        dispatch(cartItemAdded(data.cartItems));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};
export const removeFromCart = (id) => async (dispatch) => {
    try {
        // Get the user details
        const { data: user } = await axios.get("/api/users/profile");

        const newUser = {
            cartItems: user.cartItems.filter((item) => item._id !== id),
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            "/api/users/currentUser",
            newUser,
            config
        );

        dispatch(cartItemRemoved(data.cartItems));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};

export const updateCartItemQuantity = (id, quantity) => async (dispatch) => {
    try {
        // Get the user details
        const { data: user } = await axios.get("/api/users/profile");

        const newCartItems = user.cartItems.map((item) => {
            if (item._id === id) {
                item.quantity = Number(quantity);
                return item;
            } else {
                return item;
            }
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios.put(
            "/api/users/currentUser",
            { cartItems: newCartItems },
            config
        );
        dispatch(cartItemQuantityUpdated(newCartItems));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};

export const clearCartItems = () => async (dispatch) => {
    try {
        await axios.put("/api/users/profile", { cartItems: [] });

        dispatch(cartCleared());
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
    dispatch(userPaymentMethodSaved(paymentMethod));

    localStorage.setItem(
        "tc-preferredPaymentMethod",
        JSON.stringify(paymentMethod)
    );
};

export const addToWishlist = (id) => async (dispatch) => {
    try {
        // Get the user details
        const { data: user } = await axios.get("/api/users/profile");

        const { data: product } = await axios.get(`/api/products/${id}`);

        // Check if the item is already in the wishlist
        if (user.wishlist.find((item) => item._id === product._id)) {
            throw new Error("Item already in the wishlist.");
        }
        const newUser = {
            wishlist: [
                ...user.wishlist,
                {
                    name: product.name,
                    image: product.image,
                    category: product.category,
                    productType: product.productType,
                    _id: product._id,
                },
            ],
        };

        const putConfig = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            "/api/users/currentUser",
            newUser,
            putConfig
        );

        dispatch(wishlistItemAdded(data.wishlist));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};

export const removeWishlistItem = (id) => async (dispatch) => {
    try {
        // Get the user details
        const { data: user } = await axios.get("/api/users/profile");

        const newUser = {
            wishlist: user.wishlist.filter((item) => item._id !== id),
        };

        const putConfig = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            "/api/users/currentUser",
            newUser,
            putConfig
        );

        dispatch(wishlistItemRemoved(data.wishlist));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};

export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch(usersLoading());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);
        dispatch(selectedUserLoaded(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};

// Admin actions for managing users
export const listUsers = (pageNumber, keyword) => async (dispatch) => {
    try {
        dispatch(usersLoading());

        const { data } = await axios.get(
            `/api/users?keyword=${keyword}&page=${pageNumber}`
        );

        dispatch(usersLoaded(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};

export const updateUser = createAsyncThunk(
    "/users/updateSelectedUser",
    async (args, { rejectWithValue }) => {
        const { id, user } = args;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.put(`/api/users/${id}`, user, config);

            return data;
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteUser = (id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios.delete(`/api/users/${id}`, config);

        dispatch(selectedUserDeleted(id));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(userError(errorMessage));
    }
};
