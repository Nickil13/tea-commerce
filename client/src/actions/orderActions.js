import axios from "axios";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, LIST_MY_ORDERS_FAIL, LIST_MY_ORDERS_REQUEST, LIST_MY_ORDERS_SUCCESS, LIST_ORDERS_FAIL, LIST_ORDERS_REQUEST, LIST_ORDERS_SUCCESS, MY_ORDER_DETAILS_FAIL, MY_ORDER_DETAILS_REQUEST, MY_ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_UPDATE_DELIVERED_FAIL, ORDER_UPDATE_DELIVERED_REQUEST, ORDER_UPDATE_DELIVERED_SUCCESS, ORDER_UPDATE_PAID_FAIL, ORDER_UPDATE_PAID_REQUEST, ORDER_UPDATE_PAID_SUCCESS } from "../constants/orderConstants";



export const createOrder = (order) => async (dispatch, getState)=>{
    console.log(order);
    try{
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        const {user: {userLogin: {userInfo}}} = getState();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`

            }
        }
        const {data} = await axios.post('/api/orders', order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const listMyOrders = () => async(dispatch, getState)=>{
    try{
        dispatch({
            type: LIST_MY_ORDERS_REQUEST
        })

        const {user: {userLogin: {userInfo}}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/orders/myorders', config);

        dispatch({
            type: LIST_MY_ORDERS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: LIST_MY_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {user: {userLogin: {userInfo}}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const getMyOrderDetails = (id) => async(dispatch, getState)=>{
    try{
        dispatch({
            type: MY_ORDER_DETAILS_REQUEST
        })

        const {user: {userLogin: {userInfo}}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/myorders/${id}`, config);

        dispatch({
            type: MY_ORDER_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: MY_ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const updateOrderToPaid = (orderId, paymentResult) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: ORDER_UPDATE_PAID_REQUEST
        });

        const {user: {userLogin: {userInfo}}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.put(`/api/orders/${orderId}/pay`, {...paymentResult}, config);

        dispatch({
            type: ORDER_UPDATE_PAID_SUCCESS
        })

    }catch(error){
        dispatch({
            type: ORDER_UPDATE_PAID_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        });
    }
}

export const listOrders = (pageNumber, keyword) => async(dispatch, getState)=>{
    try{
        dispatch({
            type: LIST_ORDERS_REQUEST
        })

        const {user: {userLogin: {userInfo}}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.get(`/api/orders?keyword=${keyword}&page=${pageNumber}`, config);

        dispatch({
            type: LIST_ORDERS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: LIST_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        });
    }
}

export const updateOrderToDelivered = (orderId) =>async(dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_UPDATE_DELIVERED_REQUEST
        });
        
        const {user: {userLogin: {userInfo}}} = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.put(`/api/orders/${orderId}/deliver`, {}, config);

        dispatch({
            type: ORDER_UPDATE_DELIVERED_SUCCESS
        })

    }catch(error){
        dispatch({
            type: ORDER_UPDATE_DELIVERED_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        });
    }
}

