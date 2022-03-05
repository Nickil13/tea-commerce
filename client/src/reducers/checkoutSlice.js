import { createSlice } from "@reduxjs/toolkit";
import { getCheckoutDetails } from "../actions/checkoutActions";

const initialState = {
    checkoutDetails: {},
    checkoutSession: {},
    error: "",
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        checkoutLoading(state) {
            state.loading = true;
        },
        checkoutSessionLoaded(state, action) {
            state.loading = false;
            state.checkoutSession = action.payload;
            state.checkoutSessionSuccess = true;
        },
        checkoutError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        checkoutDetailsReset(state) {
            state.checkoutDetailsLoadedError = "";
            state.checkoutDetailsLoadedSuccess = false;
        },
    },
    extraReducers: (builder) => {
        // Checkout Details request builders
        builder.addCase(getCheckoutDetails.pending, (state) => {
            state.loadingCheckoutDetails = true;
        });
        builder.addCase(getCheckoutDetails.fulfilled, (state, { payload }) => {
            state.checkoutDetails = payload;
            state.loadingCheckoutDetails = false;
            state.checkoutDetailsLoadedSuccess = true;
        });
        builder.addCase(getCheckoutDetails.rejected, (state, action) => {
            state.checkoutDetailsLoadedError = action.payload;
            state.loadingCheckoutDetails = false;
        });
    },
});

export const {
    checkoutLoading,
    checkoutSessionLoaded,
    checkoutError,
    checkoutDetailsReset,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
