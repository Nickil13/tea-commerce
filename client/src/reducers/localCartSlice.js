import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    error: "",
};

const localCartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        localCartItemAdded(state, action) {
            const newItem = action.payload;
            const itemExists = state.cartItems.find(
                (item) => item._id === newItem._id
            );

            if (itemExists) {
                state.cartItems = state.cartItems.map((item) => {
                    if (item._id === newItem._id) {
                        let newAmount =
                            item.quantity + Number(newItem.quantity);
                        item.quantity = newAmount;
                        return item;
                    } else {
                        return item;
                    }
                });
            } else {
                state.cartItems.push(newItem);
            }
        },
        localCartItemQuantityUpdated(state, action) {
            const { id, quantity } = action.payload;
            const newItems = state.cartItems.map((item) => {
                if (item._id === id) {
                    item.quantity = Number(quantity);
                    return item;
                } else {
                    return item;
                }
            });
            state.cartItems = [...newItems];
        },
        localCartItemRemoved(state, action) {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );
        },
        localCartCleared(state) {
            state.cartItems = [];
        },
        localCartError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    localCartItemAdded,
    localCartItemQuantityUpdated,
    localCartItemRemoved,
    localCartCleared,
    localCartError,
} = localCartSlice.actions;

export default localCartSlice.reducer;
