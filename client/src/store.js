import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/usersSlice";

import productReducer from "./reducers/productsSlice";
import orderReducer from "./reducers/ordersSlice";

import { checkoutReducer } from "./reducers/checkoutReducers";
import { localCartReducer } from "./reducers/localCartReducer";

// const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
// const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
//     ? JSON.parse(localStorage.getItem("paymentMethod"))
//     : null;
// const localCartItemsFromStorage = localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [];

// const initialState = {
//     user: {
//         userLogin: { userInfo: userInfoFromStorage },
//         userPaymentMethod: { paymentMethod: paymentMethodFromStorage },
//     },
//     localCart: { cartItems: localCartItemsFromStorage },
// };

const store = configureStore({
    reducer: {
        usersSlice: userReducer,
        productsSlice: productReducer,
        ordersSlice: orderReducer,
        checkout: checkoutReducer,
        localCart: localCartReducer,
    },
});

export default store;
