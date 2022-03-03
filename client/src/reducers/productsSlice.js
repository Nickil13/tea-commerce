import { createSlice } from "@reduxjs/toolkit";
import {
    createProduct,
    createProductReview,
    editProduct,
    uploadProductImage,
} from "../actions/productActions";

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
            state.error = action.payload;
            state.loading = false;
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
            state.error = "";
        },
        productLoaded(state, action) {
            state.product = action.payload;
            state.loading = false;
        },
        productTopReviewLoaded(state, action) {
            state.topReview = action.payload;
            state.loading = false;
        },

        productDeleted(state, action) {
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
            state.successDelete = true;
        },
        productUploadImageReset(state) {
            state.productImageError = "";
            state.productImage = null;
        },
        productAddedReset(state) {
            state.productAdded = null;
            state.addingProduct = false;
            state.addingProductError = "";
        },
        productEditedReset(state) {
            state.productEditedSuccess = false;
            state.productEditedError = "";
            state.productEditedLoading = false;
        },
        productReviewReset(state) {
            state.productReviewAddedSuccess = false;
            state.productReviewAddedError = "";
        },
    },

    extraReducers: (builder) => {
        // Upload Product Image builders
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

        // Add Product builders
        builder.addCase(createProduct.pending, (state) => {
            state.addingProduct = true;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.productAdded = action.payload;
            state.products.push(action.payload);
            state.addingProduct = false;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.addingProductError = action.payload;
            state.addingProduct = false;
        });

        // Update Product builders
        builder.addCase(editProduct.pending, (state) => {
            state.productEditedLoading = true;
        });
        builder.addCase(editProduct.fulfilled, (state, action) => {
            const index = state.products.find(
                (product) => product._id === action.payload._id
            );
            const newProducts = [...state.products];
            newProducts[index] = action.payload;
            state.products = newProducts;
            state.product = action.payload;
            state.productEditedSuccess = true;
            state.productEditedLoading = false;
        });
        builder.addCase(editProduct.rejected, (state, action) => {
            state.productEditedError = action.payload;
            state.productEditedLoading = false;
            state.productEditedSuccess = false;
        });

        // Add Product builders
        builder.addCase(createProductReview.pending, (state) => {
            state.addingProductReview = true;
        });
        builder.addCase(createProductReview.fulfilled, (state, action) => {
            state.product = action.payload;
            state.productReviewAddedSuccess = true;
            state.addingProductReview = false;
        });
        builder.addCase(createProductReview.rejected, (state, action) => {
            state.productReviewAddedError = action.payload;
            state.addingProductReview = false;
        });
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
    productAddedReset,
    productEditedReset,
    productReviewReset,
} = productsSlice.actions;

export default productsSlice.reducer;
