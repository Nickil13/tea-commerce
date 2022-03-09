import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    checkoutError,
    checkoutLoading,
    checkoutSessionLoaded,
} from "../reducers/checkoutSlice";

export const getCheckoutDetails = createAsyncThunk(
    "checkout/getDetails",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/stripe/sessions/${id}`);

            return data;
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);

export const createCheckoutSession =
    (orderId, cartItems, taxes, shipping) => async (dispatch) => {
        try {
            dispatch(checkoutLoading());
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const orderInfo = { orderId, cartItems, taxes, shipping };

            const { data } = await axios.post(
                "/api/stripe/sessions",
                orderInfo,
                config
            );

            dispatch(checkoutSessionLoaded(data));
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            dispatch(checkoutError(errorMessage));
        }
    };
