import { combineReducers } from "redux";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_TOP_REVIEW_FAIL, PRODUCT_TOP_REVIEW_REQUEST, PRODUCT_TOP_REVIEW_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPLOAD_IMAGE_FAIL, PRODUCT_UPLOAD_IMAGE_REQUEST, PRODUCT_UPLOAD_IMAGE_RESET, PRODUCT_UPLOAD_IMAGE_SUCCESS } from "../constants/productConstants";

const productListReducer = (state = { products: []},action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products, page:action.payload.page, pages:action.payload.pages}
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

const productDetailsReducer = (state = { product: {}}, action) =>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true,...state}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload, success: true}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

const productCreateReviewReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state;
    }
}

const productTopReviewReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_TOP_REVIEW_REQUEST:
            return {loading: true}
        case PRODUCT_TOP_REVIEW_SUCCESS:
            return {loading: false, topReview: action.payload}
        case PRODUCT_TOP_REVIEW_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

const productCreateReducer = (state = {}, action) =>{
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

const productUpdateReducer = (state = { product: {}}, action) =>{
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, product: action.payload, success: true}
        case PRODUCT_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

const productDeleteReducer = (state = {}, action) =>{
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading: true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

const productUploadImageReducer = (state = {}, action)=>{
    switch(action.type){
        case PRODUCT_UPLOAD_IMAGE_REQUEST:
            return {loading: true}
        case PRODUCT_UPLOAD_IMAGE_SUCCESS:
            return {loading: false, uploadedResponse: action.payload.uploadedResponse, msg: action.payload.msg, success:true}
        case PRODUCT_UPLOAD_IMAGE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_UPLOAD_IMAGE_RESET:
            return {}
        default:
            return state;
    }
}



export const productReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreateReview: productCreateReviewReducer,
    productTopReview: productTopReviewReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productUploadImage: productUploadImageReducer
});