import { combineReducers } from "redux";
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SEARCH_FAIL, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_RESET, PRODUCT_SEARCH_SUCCESS } from "../constants/productConstants";

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
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}



export const productReducer = combineReducers({
    productList: productListReducer,
    productSearch: productSearchReducer,
    productDetails: productDetailsReducer
});