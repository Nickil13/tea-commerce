import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    WISHLIST_ADD_ITEM_REQUEST,
    WISHLIST_ADD_ITEM_FAIL,
    WISHLIST_ADD_ITEM_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    WISHLIST_REMOVE_ITEM_REQUEST,
    WISHLIST_REMOVE_ITEM_SUCCESS,
    WISHLIST_REMOVE_ITEM_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LIST_USERS_REQUEST,
    LIST_USERS_SUCCESS,
    LIST_USERS_FAIL,
    USER_CART_ADD_ITEM_FAIL,
    USER_CART_ADD_ITEM_REQUEST,
    USER_CART_ADD_ITEM_SUCCESS,
    USER_CART_CLEAR_ITEMS_REQUEST,
    USER_CART_CLEAR_ITEMS_SUCCESS,
    USER_CART_CLEAR_ITEMS_FAIL,
    USER_CART_SAVE_PAYMENT_METHOD,
    USER_CART_REMOVE_ITEM_REQUEST,
    USER_CART_REMOVE_ITEM_SUCCESS,
    USER_CART_REMOVE_ITEM_FAIL,
    USER_CART_UPDATE_QUANTITY_FAIL,
    USER_CART_UPDATE_QUANTITY_REQUEST,
    USER_CART_UPDATE_QUANTITY_SUCCESS,
    GET_USER_PROFILE_RESET,
    IS_USER_LOGIN_REQUEST,
    IS_USER_LOGIN_SUCCESS,
    IS_USER_LOGIN_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
} from "../constants/userConstants";

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("/api/users/login", { username, password }, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGOUT_REQUEST,
        });

        const data = await axios.get("/api/users/logout");
        console.log(data);

        dispatch({
            type: USER_LOGOUT_SUCCESS,
        });

        dispatch({
            type: GET_USER_PROFILE_RESET,
        });
        localStorage.removeItem("paymentMethod");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const isUserLoggedIn = () => async (dispatch) => {
    try {
        dispatch({
            type: IS_USER_LOGIN_REQUEST,
        });

        const { data } = await axios.get("/api/users/isLoggedIn");

        dispatch({
            type: IS_USER_LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: IS_USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const registerUser = (username, email, password, confirmPassword) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

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

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });

        //Log in after registering
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_PROFILE_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put("/api/users/profile", user, config);

        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_USER_PROFILE_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.get("/api/users/profile", config);

        dispatch({
            type: GET_USER_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const addToCart = (id, quantity) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CART_ADD_ITEM_REQUEST,
        });

        const { data: user } = await axios.get("/api/users/profile");

        const { data: product } = await axios.get(`/api/products/${id}`);

        // Check if the item is already in the wishlist
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
        await axios.put("/api/users/profile", { cartItems: newCartItems }, config);

        dispatch({
            type: USER_CART_ADD_ITEM_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_CART_ADD_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const removeFromCart = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CART_REMOVE_ITEM_REQUEST,
        });
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

        await axios.put("/api/users/profile", newUser, config);

        dispatch({
            type: USER_CART_REMOVE_ITEM_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_CART_REMOVE_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
export const updateCartItemQuantity = (id, quantity) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CART_UPDATE_QUANTITY_REQUEST,
        });

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

        await axios.put("/api/users/profile", { cartItems: newCartItems }, config);

        dispatch({
            type: USER_CART_UPDATE_QUANTITY_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_CART_UPDATE_QUANTITY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
export const clearCartItems = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_CART_CLEAR_ITEMS_REQUEST,
        });

        await axios.put("/api/users/profile", { cartItems: [] });

        dispatch({
            type: USER_CART_CLEAR_ITEMS_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_CART_CLEAR_ITEMS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
    dispatch({
        type: USER_CART_SAVE_PAYMENT_METHOD,
        payload: paymentMethod,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};

export const addToWishlist = (id) => async (dispatch) => {
    try {
        dispatch({
            type: WISHLIST_ADD_ITEM_REQUEST,
        });
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
        await axios.put("/api/users/profile", newUser, putConfig);

        dispatch({
            type: WISHLIST_ADD_ITEM_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: WISHLIST_ADD_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const removeWishlistItem = (id) => async (dispatch) => {
    try {
        dispatch({
            type: WISHLIST_REMOVE_ITEM_REQUEST,
        });

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

        await axios.put("/api/users/profile", newUser, putConfig);

        dispatch({
            type: WISHLIST_REMOVE_ITEM_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: WISHLIST_REMOVE_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Admin Actions
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const listUsers = (pageNumber, keyword) => async (dispatch) => {
    try {
        dispatch({
            type: LIST_USERS_REQUEST,
        });

        const { data } = await axios.get(`/api/users?keyword=${keyword}&page=${pageNumber}`);

        dispatch({
            type: LIST_USERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LIST_USERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios.put(`/api/users/${id}`, user, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios.delete(`/api/users/${id}`, config);

        dispatch({
            type: DELETE_USER_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
