import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    myOrdersLoaded,
    orderDelivered,
    orderError,
    orderLoaded,
    orderPaid,
    ordersLoaded,
    ordersLoading,
} from "../reducers/ordersSlice";

export const listOrders = (pageNumber, keyword) => async (dispatch) => {
    try {
        dispatch(ordersLoading());

        const { data } = await axios.get(
            `/api/orders?keyword=${keyword}&page=${pageNumber}`
        );

        dispatch(ordersLoaded(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(orderError(errorMessage));
    }
};

export const listMyOrders = () => async (dispatch) => {
    try {
        dispatch(ordersLoading());
        const { data } = await axios.get("/api/orders/myorders");
        dispatch(myOrdersLoaded(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(orderError(errorMessage));
    }
};

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (order, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post("/api/orders", order, config);

            return data;
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(ordersLoading());
        const { data } = await axios.get(`/api/orders/${id}`);
        dispatch(orderLoaded(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(orderError(errorMessage));
    }
};

export const getMyOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(ordersLoading());
        const { data } = await axios.get(`/api/orders/myorders/${id}`);

        dispatch(orderLoaded(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(orderError(errorMessage));
    }
};

export const updateOrderToPaid =
    (orderId, paymentResult) => async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.put(
                `/api/orders/${orderId}/pay`,
                { ...paymentResult },
                config
            );

            dispatch(orderPaid(data));
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            dispatch(orderError(errorMessage));
        }
    };

export const updateOrderToDelivered = (orderId) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/orders/${orderId}/deliver`, {});

        dispatch(orderDelivered(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(orderError(errorMessage));
    }
};
