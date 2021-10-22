import axios from 'axios';
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_FAIL, PRODUCT_SEARCH_SUCCESS } = require("../constants/productConstants")


export const listProducts = (category,type,pageNumber) => async (dispatch)=>{
    try{
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });

        const { data } = await axios.get(`/api/products?category=${category}&type=${type}&page=${pageNumber}`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
    
}

export const searchProducts = (keyword, pageNumber) => async (dispatch) =>{
    
    try{
        dispatch({
            type: PRODUCT_SEARCH_REQUEST
        })

        const {data} = await axios.get(`/api/products?keyword=${keyword}&page=${pageNumber}`)

        dispatch({
            type: PRODUCT_SEARCH_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_SEARCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const getProductDetails = (id) => async(dispatch)=>{
    try{
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}