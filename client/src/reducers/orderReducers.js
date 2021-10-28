import { combineReducers } from "redux";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, LIST_MY_ORDERS_REQUEST, LIST_MY_ORDERS_SUCCESS, LIST_MY_ORDERS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, MY_ORDER_DETAILS_REQUEST, MY_ORDER_DETAILS_SUCCESS, MY_ORDER_DETAILS_FAIL, ORDER_UPDATE_PAID_SUCCESS, ORDER_UPDATE_PAID_REQUEST, ORDER_UPDATE_PAID_FAIL, ORDER_UPDATE_DELIVERED_REQUEST, ORDER_UPDATE_DELIVERED_SUCCESS, ORDER_UPDATE_DELIVERED_FAIL, LIST_ORDERS_REQUEST, LIST_ORDERS_SUCCESS, LIST_ORDERS_FAIL } from "../constants/orderConstants";


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
            return{...state,loading: true}
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

const listOrdersReducer = (state = {orders: []},action)=>{
    switch(action.type){
        case LIST_ORDERS_REQUEST:
            return{...state,loading: true}
        case LIST_ORDERS_SUCCESS:
            return{loading: false,
            orders: action.payload}
        case LIST_ORDERS_FAIL:
            return{loading: false,
            error: action.payload}
        default:
            return state;
    }
}

const orderDetailsReducer = (state = { loading: true, order:{orderItems: [], shippingAddress: {}}},action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return{...state, loading: true}
        case ORDER_DETAILS_SUCCESS:
            return{loading: false,
            order: action.payload}
        case ORDER_DETAILS_FAIL:
            return{loading: false,
            error: action.payload}
        default:
            return state;
    }
}

const myOrderDetailsReducer = (state = { loading: true, order:{orderItems: [], shippingAddress: {}}},action)=>{
    switch(action.type){
        case MY_ORDER_DETAILS_REQUEST:
            return{...state, loading: true}
        case MY_ORDER_DETAILS_SUCCESS:
            return{loading: false,
            order: action.payload}
        case MY_ORDER_DETAILS_FAIL:
            return{loading: false,
            error: action.payload}
        default:
            return state;
    }
}

const orderPaidReducer = (state = {}, action)=>{
    switch(action.type){
        case ORDER_UPDATE_PAID_REQUEST:
            return{loading: true}
        case ORDER_UPDATE_PAID_SUCCESS:
            return {loading: false, success: true}
        case ORDER_UPDATE_PAID_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

const orderDeliveredReducer = (state = {}, action)=>{
    switch(action.type){
        case ORDER_UPDATE_DELIVERED_REQUEST:
            return{loading: true}
        case ORDER_UPDATE_DELIVERED_SUCCESS:
            return {loading: false, success: true}
        case ORDER_UPDATE_DELIVERED_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}



export const orderReducer = combineReducers({
    createdOrder : createOrderReducer,
    myOrders: listMyOrdersReducer,
    listedOrders: listOrdersReducer,
    orderDetails: orderDetailsReducer,
    myOrderDetails: myOrderDetailsReducer,
    orderPaid: orderPaidReducer,
    orderDelivered: orderDeliveredReducer
})