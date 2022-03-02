import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/usersSlice";
import productReducer from "./reducers/productsSlice";
import orderReducer from "./reducers/ordersSlice";
import localCartReducer from "./reducers/localCartSlice";

import { checkoutReducer } from "./reducers/checkoutReducers";

import { isUserLoggedIn } from "./actions/userActions";

const store = configureStore({
    reducer: {
        usersSlice: userReducer,
        productsSlice: productReducer,
        ordersSlice: orderReducer,
        checkout: checkoutReducer,
        localCartSlice: localCartReducer,
    },
});

// Fetch user authentication
store.dispatch(isUserLoggedIn());

export default store;
