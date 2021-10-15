import axios from "axios";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../constants/orderConstants";



export const createOrder = (order) => async (dispatch)=>{
    console.log(order);
    try{
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
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

export const listOrders = () => async(dispatch)=>{

}