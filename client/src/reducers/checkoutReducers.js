import { combineReducers } from "redux"
import { CHECKOUT_DETAILS_FAIL, CHECKOUT_DETAILS_REQUEST, CHECKOUT_DETAILS_SUCCESS, CREATE_CHECKOUT_SESSION_FAIL, CREATE_CHECKOUT_SESSION_REQUEST, CREATE_CHECKOUT_SESSION_SUCCESS } from "../constants/checkoutConstants"


const checkoutDetailsReducer = (state = {}, action) =>{
    switch(action.type){
        case CHECKOUT_DETAILS_REQUEST:
            return {
                loading: true
            }
        case CHECKOUT_DETAILS_SUCCESS:
            return {
                loading: false,
                success: true,
                session: action.payload
            }
        case CHECKOUT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const checkoutSessionReducer = (state = {}, action) =>{
    switch(action.type){
        case CREATE_CHECKOUT_SESSION_REQUEST:
            return {
                loading: true
            }
        case CREATE_CHECKOUT_SESSION_SUCCESS:
            return {
                loading: false,
                success: true,
                url: action.payload.url,
                id: action.payload.id
            }
        case CREATE_CHECKOUT_SESSION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}







export const checkoutReducer = combineReducers({
    checkoutDetails: checkoutDetailsReducer,
    checkoutSession: checkoutSessionReducer
})