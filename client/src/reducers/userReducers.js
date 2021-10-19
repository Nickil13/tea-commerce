import { GET_USER_PROFILE_FAIL, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, WISHLIST_ADD_ITEM_FAIL, WISHLIST_ADD_ITEM_REQUEST, WISHLIST_ADD_ITEM_SUCCESS } from "../constants/userConstants";
import { combineReducers } from "redux";

const userLoginReducer = (state = {}, action) => {
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
const userGetProfileReducer = (state = {}, action) => {
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

        default: 
            return state;
    }
}


export const userReducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userProfile : userGetProfileReducer,
    userAddWishlist : userAddWishlistItemReducer
})