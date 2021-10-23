import axios from 'axios';
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_FAIL, PRODUCT_SEARCH_SUCCESS, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_TOP_REVIEW_REQUEST, PRODUCT_TOP_REVIEW_SUCCESS, PRODUCT_TOP_REVIEW_FAIL } = require("../constants/productConstants")


export const listProducts = (category,type,pageNumber) => async (dispatch)=>{
    try{
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });

        const {data} = await axios.get(`/api/products?category=${category}&type=${type}&page=${pageNumber}`);

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

        const {data} = await axios.get(`/api/products/${id}`)

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


export const createProductReview = (id, review) => async(dispatch, getState)=>{
    
    try{
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })
        if(review.comment==='' || review.rating ===0){
            throw new Error("Fields not filled in.");
        }
        const {user: {userLogin: {userInfo}}} = getState();

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
       
    
        await axios.post(`/api/products/${id}/reviews`, review, config);

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })

    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const getTopProductReview = (id) => async(dispatch)=>{
    
    try{
        dispatch({
            type: PRODUCT_TOP_REVIEW_REQUEST
        })
        
        const {data} = await axios.get(`/api/products/${id}/reviews/top-review`);
       
        dispatch({
            type: PRODUCT_TOP_REVIEW_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_TOP_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}