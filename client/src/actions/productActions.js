import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    productDeleted,
    productError,
    productLoaded,
    productsLoaded,
    productsLoading,
    productTopReviewLoaded,
} from "../reducers/productsSlice";

// Fetch all products
export const listProducts =
    (category, type, pageNumber, keyword) => async (dispatch) => {
        try {
            dispatch(productsLoading());

            const { data } = await axios.get(
                `/api/products?category=${category}&type=${type}&keyword=${keyword}&page=${pageNumber}`
            );

            dispatch(productsLoaded(data));
        } catch (error) {
            let errorMessage = error.response?.data.message || error.message;
            dispatch(productError(errorMessage));
        }
    };

// Fetch a product by ID
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productsLoading());

        const { data } = await axios.get(`/api/products/${id}`);
        dispatch(productLoaded(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(productError(errorMessage));
    }
};

// Add a product review
export const createProductReview = createAsyncThunk(
    "products/addReview",
    async (args, { rejectWithValue }) => {
        const { id, review } = args;
        try {
            if (review.comment === "" || review.rating === 0) {
                throw new Error("Fields not filled in.");
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                `/api/products/${id}/reviews`,
                review,
                config
            );

            return data;
        } catch (err) {
            console.error(err);
            let error = err;
            return rejectWithValue(error.response.data);
        }
    }
);

// Fetch the top review for a product by product ID
export const getTopProductReview = (id) => async (dispatch) => {
    try {
        dispatch(productsLoading());

        const { data } = await axios.get(
            `/api/products/${id}/reviews/top-review`
        );

        dispatch(productTopReviewLoaded(data));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(productError(errorMessage));
    }
};

// Add a new product
export const createProduct = createAsyncThunk(
    "products/addProduct",
    async (product, { rejectWithValue }) => {
        try {
            if (
                !product.name ||
                !product.productType ||
                !product.category ||
                !product.image ||
                !product.ingredients ||
                !product.description ||
                !product.price ||
                !product.countInStock
            ) {
                throw new Error("Please fill in all required fields");
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post("/api/products", product, config);

            return data;
        } catch (err) {
            let error = err;
            return rejectWithValue(error.response.data);
        }
    }
);

// Edit a product
export const editProduct = createAsyncThunk(
    "products/editProduct",
    async (product, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `/api/products/${product._id}`,
                product,
                config
            );

            return data;
        } catch (err) {
            let error = err;
            return rejectWithValue(error.response.data);
        }
    }
);

// Delete a product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/products/${id}`);

        dispatch(productDeleted(id));
    } catch (error) {
        let errorMessage = error.response?.data.message || error.message;
        dispatch(productError(errorMessage));
    }
};

// Upload a product image
export const uploadProductImage = createAsyncThunk(
    "products/loadImage",
    async (arg, { rejectWithValue }) => {
        const { imageURI, name } = arg;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                "/api/cloudinary/upload",
                JSON.stringify({ data: imageURI, name }),
                config
            );

            return data;
        } catch (err) {
            let error = err;
            return rejectWithValue(error.response.data);
        }
    }
);
