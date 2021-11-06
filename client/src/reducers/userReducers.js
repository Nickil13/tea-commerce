import { combineReducers } from "redux";
import { CART_ADD_ITEM_FAIL, CART_ADD_ITEM_REQUEST, CART_ADD_ITEM_RESET, CART_ADD_ITEM_SUCCESS, CART_CLEAR_ITEMS_FAIL, CART_CLEAR_ITEMS_REQUEST, CART_CLEAR_ITEMS_SUCCESS, CART_REMOVE_ITEM_FAIL, CART_REMOVE_ITEM_REQUEST, CART_REMOVE_ITEM_RESET, CART_REMOVE_ITEM_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_USER_PROFILE_FAIL, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LIST_USERS_FAIL, LIST_USERS_REQUEST, LIST_USERS_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_RESET, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, WISHLIST_ADD_ITEM_FAIL, WISHLIST_ADD_ITEM_REQUEST, WISHLIST_ADD_ITEM_RESET, WISHLIST_ADD_ITEM_SUCCESS, WISHLIST_REMOVE_ITEM_FAIL, WISHLIST_REMOVE_ITEM_REQUEST, WISHLIST_REMOVE_ITEM_SUCCESS } from "../constants/userConstants";


const userLoginReducer = (state = { }, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { loading: true}

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo:action.payload}
        
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload}
        
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

const userRegisterReducer = (state = {}, action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}

        case USER_REGISTER_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload}

        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}
const userGetProfileReducer = (state = { user: { cartItems: [],shippingAddress: {}}}, action) => {
    switch(action.type){
        case GET_USER_PROFILE_REQUEST:
            return { ...state, loading: true }

        case GET_USER_PROFILE_SUCCESS:
            return {loading: false, success: true, user:action.payload}

        case GET_USER_PROFILE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type){
        case UPDATE_USER_PROFILE_REQUEST:
            return { loading: true }

        case UPDATE_USER_PROFILE_SUCCESS:
            return {loading: false, success: true}

        case UPDATE_USER_PROFILE_FAIL:
            return {loading: false, error: action.payload}

        case UPDATE_USER_PROFILE_RESET:
            return {}
            
        default:
            return state;
    }
}

const userAddToCartReducer = (state = {}, action)=>{
    switch(action.type){
        case CART_ADD_ITEM_REQUEST:
            return {loading: true}

        case CART_ADD_ITEM_SUCCESS:
            return {loading: false, success: true}

        case CART_ADD_ITEM_FAIL:
            return {loading: false, error: action.payload}
        
        case CART_ADD_ITEM_RESET:
            return {}

        default: 
            return state;
    }
}
const userRemoveFromCartReducer = (state = {}, action)=>{
    switch(action.type){
        case CART_REMOVE_ITEM_REQUEST:
            return {loading: true}

        case CART_REMOVE_ITEM_SUCCESS:
            return {loading: false, success: true}

        case CART_REMOVE_ITEM_FAIL:
            return {loading: false, error: action.payload}

        case CART_REMOVE_ITEM_RESET:
            return {}

        default: 
            return state;
    }
}

const userClearCartReducer = (state = {}, action)=>{
    switch(action.type){
        case CART_CLEAR_ITEMS_REQUEST:
            return {loading: true}

        case CART_CLEAR_ITEMS_SUCCESS:
            return {loading: false, success: true}

        case CART_CLEAR_ITEMS_FAIL:
            return {loading: false, error: action.payload}
        
        default: 
            return state;
    }
}

const userAddWishlistItemReducer = (state = {}, action)=>{
    switch(action.type){
        case WISHLIST_ADD_ITEM_REQUEST:
            return {loading: true}

        case WISHLIST_ADD_ITEM_SUCCESS:
            return {loading: false, success: true}

        case WISHLIST_ADD_ITEM_FAIL:
            return {loading: false, error: action.payload}
        
        case WISHLIST_ADD_ITEM_RESET:
            return {}
        default: 
            return state;
    }
}

const userRemoveWishlistItemReducer = (state = {}, action)=>{
    switch(action.type){
        case WISHLIST_REMOVE_ITEM_REQUEST:
            return {loading: true}

        case WISHLIST_REMOVE_ITEM_SUCCESS:
            return {loading: false, success: true}

        case WISHLIST_REMOVE_ITEM_FAIL:
            return {loading: false, error: action.payload}
        
        default: 
            return state;
    }
}

//Admin Reducers
const userDetailsReducer = ( state = { user: {} }, action) =>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {...state, loading: true}

        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload}

        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        default: 
            return state;
    }
}

const userListReducer = ( state = { users: []}, action) =>{
    switch(action.type){
        case LIST_USERS_REQUEST:
            return {...state,loading: true}

        case LIST_USERS_SUCCESS:
            return {loading: false, users: action.payload.users, page:action.payload.page, pages:action.payload.pages}

        case LIST_USERS_FAIL:
            return {loading: false, error: action.payload}
        
        default: 
            return state;
    }
}

const userUpdateReducer = ( state = {}, action) =>{
    switch(action.type){
        case UPDATE_USER_REQUEST:
            return {loading: true}

        case UPDATE_USER_SUCCESS:
            return {loading: false, user: action.payload, success: true}

        case UPDATE_USER_FAIL:
            return {loading: false, error: action.payload}

        case UPDATE_USER_RESET:
            return {}

        default: 
            return state;
    }
}

const userDeleteReducer = ( state = {}, action) =>{
    switch(action.type){
        case DELETE_USER_REQUEST:
            return {loading: true}

        case DELETE_USER_SUCCESS:
            return {loading: false, success: true}

        case DELETE_USER_FAIL:
            return {loading: false, error: action.payload}
        
        default: 
            return state;
    }
}


export const userReducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userProfile : userGetProfileReducer,
    userAddCart : userAddToCartReducer,
    userRemoveCart: userRemoveFromCartReducer,
    userClearCart: userClearCartReducer,
    userAddWishlist : userAddWishlistItemReducer,
    userRemoveWishlist : userRemoveWishlistItemReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer
})