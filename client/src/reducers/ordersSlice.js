import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    orders: [],
    currentOrder: {
        orderItems: [],
        shippingAddress: {},
    },
    myOrders: [],
    error: "",
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        orderError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        ordersLoaded(state, action) {
            const { orders, page, pages } = action.payload;

            state.orders = [...orders];
            state.page = page;
            state.pages = pages;

            state.loading = false;
        },
        myOrdersLoaded(state, action) {
            state.orders = [...action.payload];
            state.loading = false;
        },
        orderLoaded(state, action) {
            state.currentOrder = action.payload;
            state.loading = false;
        },
        ordersLoading(state) {
            state.loading = true;
            state.error = "";
        },
        orderAdded(state, action) {
            state.orders.push(action.payload);
        },
        orderPaid(state, action) {
            state.currentOrder = action.payload;
        },
        orderDelivered(state, action) {
            state.currentOrder = action.payload;
            state.orderDeliveredSuccess = true;
        },
    },
});

export const {
    orderError,
    ordersLoaded,
    myOrdersLoaded,
    orderLoaded,
    ordersLoading,
    orderAdded,
    orderPaid,
    orderDelivered,
} = ordersSlice.actions;

export default ordersSlice.reducer;
