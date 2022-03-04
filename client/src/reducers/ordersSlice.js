import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../actions/orderActions";

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
        // orderAdded(state, action) {
        //     state.orders.push(action.payload);
        //     state.createdOrder = action.payload;
        // },
        orderPaid(state, action) {
            state.currentOrder = action.payload;
        },
        orderDelivered(state, action) {
            state.currentOrder = action.payload;
            state.orderDeliveredSuccess = true;
        },
    },
    extraReducers: (builder) => {
        // Order added builders
        builder.addCase(createOrder.pending, (state) => {
            state.creatingOrder = true;
        });
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            state.orders.push(payload);
            state.createdOrder = payload;
            state.creatingOrder = false;
            state.orderCreatedSuccess = true;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.orderCreatedError = action.payload;
            state.creatingOrder = false;
        });
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
