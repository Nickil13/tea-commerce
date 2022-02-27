import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
    productAdded,
    productDeleted,
    productEdited,
    productError,
    productLoaded,
    productsLoaded,
    productsLoading,
    productTopReviewLoaded,
} from "../reducers/productsSlice";
// const {
//     PRODUCT_UPDATE_REQUEST,
//     PRODUCT_UPDATE_SUCCESS,
//     PRODUCT_UPDATE_FAIL,
//     PRODUCT_DELETE_REQUEST,
//     PRODUCT_DELETE_SUCCESS,
//     PRODUCT_DELETE_FAIL,
//     PRODUCT_UPLOAD_IMAGE_REQUEST,
//     PRODUCT_UPLOAD_IMAGE_SUCCESS,
//     PRODUCT_UPLOAD_IMAGE_FAIL,
// } = require("../constants/productConstants");

export const listProducts =
    (category, type, pageNumber, keyword) => async (dispatch) => {
        try {
            dispatch(productsLoading());

            const { data } = await axios.get(
                `/api/products?category=${category}&type=${type}&keyword=${keyword}&page=${pageNumber}`
            );

            dispatch(productsLoaded(data));
        } catch (error) {
            dispatch(productError(error));
        }
    };

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productsLoading());

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch(productLoaded(data));
    } catch (error) {
        dispatch(productError(error));
    }
};

export const createProductReview = (id, review) => async (dispatch) => {
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

        dispatch(updateProduct(data));
    } catch (error) {
        dispatch(productError(error));
    }
};

export const getTopProductReview = (id) => async (dispatch) => {
    try {
        dispatch(productsLoading());

        const { data } = await axios.get(
            `/api/products/${id}/reviews/top-review`
        );

        dispatch(productTopReviewLoaded(data));
    } catch (error) {
        dispatch(productError(error));
    }
};

//Admin Actions
// export const createProduct = (product) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: PRODUCT_CREATE_REQUEST,
//         });

//         if (
//             !product.name ||
//             !product.productType ||
//             !product.category ||
//             !product.image ||
//             !product.ingredients ||
//             !product.description ||
//             !product.price ||
//             !product.countInStock
//         ) {
//             throw new Error("Please fill in all required fields");
//         }
//         const {
//             user: {
//                 userLogin: { userInfo },
//             },
//         } = getState();

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         const { data } = await axios.post("/api/products", product, config);

//         dispatch({
//             type: PRODUCT_CREATE_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_CREATE_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };
export const createProduct = (product) => async (dispatch) => {
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
        // const {
        //     user: {
        //         userLogin: { userInfo },
        //     },
        // } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post("/api/products", product, config);

        dispatch(productAdded(data));
    } catch (error) {
        productError(productError(error));
    }
};

// export const updateProduct = (product) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: PRODUCT_UPDATE_REQUEST,
//         });

//         const {
//             user: {
//                 userLogin: { userInfo },
//             },
//         } = getState();

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         const { data } = await axios.put(
//             `/api/products/${product._id}`,
//             product,
//             config
//         );

//         dispatch({
//             type: PRODUCT_UPDATE_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_UPDATE_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };

export const updateProduct = (product) => async (dispatch) => {
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

        dispatch(productEdited(data));
    } catch (error) {
        console.log(error);
        dispatch(productError(error));
    }
};

// export const deleteProduct = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: PRODUCT_DELETE_REQUEST,
//         });

//         const {
//             user: {
//                 userLogin: { userInfo },
//             },
//         } = getState();

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         await axios.delete(`/api/products/${id}`, config);

//         dispatch({
//             type: PRODUCT_DELETE_SUCCESS,
//         });
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_DELETE_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };

export const deleteProduct = (id) => async (dispatch) => {
    try {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };

        // await axios.delete(`/api/products/${id}`, config);
        await axios.delete(`/api/products/${id}`);

        dispatch(productDeleted(id));
    } catch (error) {
        dispatch(productError(error));
    }
};

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
