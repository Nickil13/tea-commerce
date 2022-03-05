import { createSlice } from "@reduxjs/toolkit";
import { login, updateUserProfile, updateUser } from "../actions/userActions";

const initialState = {
    loading: false,
    user: {
        cartItems: [],
        shippingAddress: {},
    },
    authenticated: false,
    users: [],
    selectedUser: {},
    error: "",
    userPaymentMethod: localStorage.getItem("tc-preferredPaymentMethod")
        ? JSON.parse(localStorage.getItem("tc-preferredPaymentMethod"))
        : "Stripe",
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
        selectedUserLoaded(state, action) {
            state.loading = false;
            state.selectedUser = action.payload;
        },
        usersLoaded(state, action) {
            const { users, page, pages } = action.payload;
            state.loading = false;
            state.users = [...users];
            state.page = page;
            state.pages = pages;
        },
        userRegistered(state, action) {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload;
        },
        userLoggedOut() {
            return initialState;
        },
        userAuthenticated(state, action) {
            if (action.payload) {
                state.authenticated = true;
            } else {
                state.authenticated = false;
            }
            state.userAuthenticating = false;
        },
        userAuthenticating(state) {
            state.userAuthenticating = true;
        },
        userAuthenticatedError(state, action) {
            state.userAuthenticating = false;
            state.error = action.payload;
        },
        userError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        cartSuccessReset(state) {
            state.cartItemAddedSuccess = false;
        },
        cartItemAdded(state, action) {
            state.user.cartItems = [...action.payload];
            state.cartItemAddedSuccess = true;
        },
        cartItemRemoved(state, action) {
            state.user.cartItems = [...action.payload];
        },
        cartItemQuantityUpdated(state, action) {
            state.user.cartItems = [...action.payload];
        },
        cartCleared(state) {
            state.user.cartItems = [];
        },
        wishlistItemAdded(state, action) {
            state.user.wishlist = [...action.payload];
            state.wishlistItemAddedSuccess = true;
        },
        wishlistItemRemoved(state, action) {
            state.user.wishlist = [...action.payload];
        },
        wishlistSuccessReset(state) {
            state.wishlistItemAddedSuccess = false;
        },
        // Selected users for admin
        selectedUserDeleted(state, action) {
            state.users = state.users.filter(
                (user) => user._id !== action.payload
            );
        },
        selectedUserReset(state) {
            state.selectedUser = {};
            state.selectedUserUpdateSuccess = false;
            state.selectedUserUpdateError = "";
        },
        userUpdatingReset(state) {
            state.userUpdatingError = "";
            state.userUpdatingSuccess = false;
        },
        userPaymentMethodSaved(state, action) {
            state.userPaymentMethod = action.payload;
        },
    },
    extraReducers: (builder) => {
        // User login builders
        builder.addCase(login.pending, (state) => {
            state.loggingIn = true;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.authenticated = true;
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
            state.userUpdatingSuccess = true;
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.userUpdatingError = action.payload;
            state.userUpdating = false;
        });

        // Selected User update builders (for admin updating another user)
        builder.addCase(updateUser.pending, (state) => {
            state.selectedUserUpdating = true;
        });
        builder.addCase(updateUser.fulfilled, (state, { payload }) => {
            state.selectedUser = payload;
            state.selectedUserUpdateSuccess = true;
            state.selectedUserUpdating = false;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.selectedUserUpdateError = action.payload;
            state.selectedUserUpdating = false;
        });
    },
});

export const {
    usersLoading,
    userLoaded,
    usersLoaded,
    selectedUserLoaded,
    userRegistered,
    userLoggedOut,
    userAuthenticated,
    userAuthenticating,
    userAuthenticatedError,
    userError,
    cartItemAdded,
    cartItemRemoved,
    cartItemQuantityUpdated,
    cartCleared,
    cartSuccessReset,
    wishlistItemAdded,
    wishlistItemRemoved,
    wishlistSuccessReset,
    selectedUserDeleted,
    selectedUserReset,
    userUpdatingReset,
    userPaymentMethodSaved,
} = usersSlice.actions;

export default usersSlice.reducer;
