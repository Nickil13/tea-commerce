import { combineReducers } from "redux";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, LIST_MY_ORDERS_REQUEST, LIST_MY_ORDERS_SUCCESS, LIST_MY_ORDERS_FAIL } from "../constants/orderConstants";


const createOrderReducer = (state = {}, action) =>{
    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return{loading: true}
        case CREATE_ORDER_SUCCESS:
            return{
                loading: false, 
                success: true, 
                order: action.payload}
        case CREATE_ORDER_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const listMyOrdersReducer = (state = {orders: []},action)=>{
    switch(action.type){
        case LIST_MY_ORDERS_REQUEST:
            return{loading: true}
        case LIST_MY_ORDERS_SUCCESS:
            return{loading: false,
            orders: action.payload}
        case LIST_MY_ORDERS_FAIL:
            return{loading: false,
            error: action.payload}
        default:
            return state;
    }
}

export const orderReducer = combineReducers({
    createdOrder : createOrderReducer,
    myOrders: listMyOrdersReducer
})