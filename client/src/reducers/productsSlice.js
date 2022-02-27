import { createSlice } from "@reduxjs/toolkit";
import {
    createProduct,
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
        productDeletedReset(state) {
            state.successDelete = false;
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

            state.productEditedSuccess = true;
            state.productEditedLoading = false;
        });
        builder.addCase(editProduct.rejected, (state, action) => {
            state.productEditedError = action.payload;
            state.productEditedLoading = false;
            state.productEditedSuccess = false;
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
    productDeletedReset,
} = productsSlice.actions;

export default productsSlice.reducer;
