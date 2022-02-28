import { createSlice } from "@reduxjs/toolkit";
import { login, updateUserProfile } from "../actions/userActions";

const initialState = {
    loading: false,
    user: {},
    authenticated: false,
    users: [],
    error: "",
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersLoading(state) {
            state.loading = true;
        },
        userLoaded(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        usersLoaded(state, action) {
            state.loading = false;
            state.users = [...action.payload];
        },
        userRegistered(state, action) {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload;
        },
        userLoggedOut() {
            return initialState;
        },
        userAuthenticated(state) {
            state.authenticated = true;
        },
        userError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        cartItemAdded(state, action) {
            state.user.cartItems = [...action.payload];
            state.cartItemAddedSuccess = true;
        },
        cartItemRemoved(state, action) {
            state.user.cartItems = [...action.payload];
        },
        cartCleared(state) {
            state.user.cartItems = [];
        },
        wishlistItemAdded(state, action) {
            state.user.wishlist = [...action.payload];
            state.wishlistAddedSuccess = true;
        },
        wishlistItemRemoved(state, action) {
            state.user.wishlist = [...action.payload];
        },
    },
    extraReducers: (builder) => {
        // User login builders
        builder.addCase(login.pending, (state) => {
            state.loggingIn = true;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.loggingIn = false;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginError = action.payload;
            state.loggingIn = false;
        });

        // User update builders
        builder.addCase(updateUserProfile.pending, (state) => {
            state.userUpdating = true;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.userUpdating = false;
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.userUpdatingError = action.payload;
            state.userUpdating = false;
        });
    },
});

export const {
    usersLoading,
    userLoaded,
    usersLoaded,
    userRegistered,
    userLoggedOut,
    userAuthenticated,
    userError,
    cartItemAdded,
    cartItemRemoved,
    cartCleared,
    wishlistItemAdded,
    wishlistItemRemoved,
} = usersSlice.actions;

export default usersSlice.reducer;
