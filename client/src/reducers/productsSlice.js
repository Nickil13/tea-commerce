import { createSlice } from "@reduxjs/toolkit";
import { uploadProductImage } from "../actions/productActions";

const initialState = {
    loading: false,
    products: [],
    product: {},
    error: "",
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productError(state, action) {
            const error = action.payload.error;
            console.log(error);
            state.error = error;
        },
        productsLoaded(state, action) {
            const { products, page, pages } = action.payload;
            state.products = [...products];
            state.page = page;
            state.pages = pages;
            state.loading = false;
        },
        productsLoading(state) {
            state.loading = true;
        },
        productLoaded(state, action) {
            state.product = action.payload;
            state.loading = false;
        },
        productTopReviewLoaded(state, action) {
            state.topReview = action.payload;
            state.loading = false;
        },
        productAdded(state, action) {
            state.products.push(action.payload);
        },
        productEdited(state, action) {
            const index = state.products.find(
                (product) => product._id === action.payload._id
            );
            const newProducts = [...state.products];
            newProducts[index] = action.payload;
            state.products = newProducts;
        },
        productDeleted(state, action) {
            state.products = state.products.filter(
                (product) => product._id !== action.payload.id
            );
            state.successDelete = true;
        },
        productUploadImageReset(state) {
            state.productImageError = "";
            state.productImage = null;
        },
    },

    extraReducers: (builder) => {
        //Upload Product Image builders
        builder.addCase(uploadProductImage.pending, (state) => {
            state.productImageUploading = true;
        });
        builder.addCase(uploadProductImage.fulfilled, (state, { payload }) => {
            state.productImage = payload;
            state.productImageUploading = false;
        });
        builder.addCase(uploadProductImage.rejected, (state, action) => {
            state.productImageError = action.payload;
            state.productImageUploading = false;
        });
        //
    },
});

export const {
    productError,
    productsLoaded,
    productsLoading,
    productLoaded,
    productAdded,
    productEdited,
    productDeleted,
    productTopReviewLoaded,
    productUploadImageReset,
} = productsSlice.actions;

export default productsSlice.reducer;
