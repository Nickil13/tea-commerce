import axios from "axios";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, LIST_MY_ORDERS_FAIL, LIST_MY_ORDERS_REQUEST, LIST_MY_ORDERS_SUCCESS } from "../constants/orderConstants";



export const createOrder = (order) => async (dispatch, getState)=>{
    console.log(order);
    try{
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        const {user} = getState();
        
        const userInfo = user.userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`

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

export const listMyOrders = () => async(dispatch, useState)=>{
    try{
        dispatch({
            type: LIST_MY_ORDERS_REQUEST
        })

        const {user} = useState();
        const userInfo = user.userLogin.userInfo;

        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
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

export const listOrders = () => async(dispatch)=>{

}