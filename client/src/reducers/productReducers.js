import { combineReducers } from "redux";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_GET_FAIL, PRODUCT_GET_REQUEST, PRODUCT_GET_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SEARCH_FAIL, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_RESET, PRODUCT_SEARCH_SUCCESS, PRODUCT_TOP_REVIEW_FAIL, PRODUCT_TOP_REVIEW_REQUEST, PRODUCT_TOP_REVIEW_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";

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

const productGetReducer = (state = { products: []},action) => {
    switch(action.type){
        case PRODUCT_GET_REQUEST:
            return { loading: true, products: []}
        case PRODUCT_GET_SUCCESS:
            return { loading: false, products: action.payload.products, page:action.payload.page, pages:action.payload.pages}
        case PRODUCT_GET_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

const productSearchReducer = (state = { products: []}, action) =>{
    switch(action.type){
        case PRODUCT_SEARCH_REQUEST:
            return { loading: true, products: []}
        case PRODUCT_SEARCH_SUCCESS:
            return { loading: false, success: true, products: action.payload.products, page: action.payload.page,
            pages: action.payload.pages}
        case PRODUCT_SEARCH_FAIL:
            return { loading: false, error: action.payload}
        case PRODUCT_SEARCH_RESET:
            return {}
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
            return {loading: false, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

const productUpdateReducer = (state = { product: {}}, action) =>{
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_UPDATE_FAIL:
            return {loading: false, error: action.payload}
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



export const productReducer = combineReducers({
    productList: productListReducer,
    productSearch: productSearchReducer,
    productDetails: productDetailsReducer,
    productCreateReview: productCreateReviewReducer,
    productTopReview: productTopReviewReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productGet: productGetReducer
});