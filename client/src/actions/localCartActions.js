import axios from "axios";
import {
    localCartCleared,
    localCartError,
    localCartItemAdded,
    localCartItemQuantityUpdated,
    localCartItemRemoved,
} from "../reducers/localCartSlice";

export const addToLocalCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data: item } = await axios.get(`/api/products/${id}`);
        const newItem = {
            _id: id,
            name: item.name,
            category: item.category,
            productType: item.productType,
            image: item.image,
            price: item.price,
            countInStock: item.countInStock,
            flavourImage: item.flavourImage,
            quantity,
        };
        dispatch(localCartItemAdded(newItem));

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().localCartSlice.cartItems)
        );
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(localCartError(errorMessage));
    }
};

export const clearLocalCart = () => (dispatch) => {
    localStorage.removeItem("cartItems");
    dispatch(localCartCleared());
};

export const updateLocalCartItemQuantity =
    (id, quantity) => (dispatch, getState) => {
        dispatch(localCartItemQuantityUpdated({ id, quantity }));

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().localCartSlice.cartItems)
        );
    };

export const removeLocalCartItem = (id) => (dispatch, getState) => {
    dispatch(localCartItemRemoved(id));

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().localCartSlice.cartItems)
    );
};
