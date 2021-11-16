import axios from "axios";
import {CHECKOUT_DETAILS_REQUEST, CHECKOUT_DETAILS_SUCCESS, CREATE_CHECKOUT_SESSION_REQUEST, CREATE_CHECKOUT_SESSION_SUCCESS, CREATE_CHECKOUT_SESSION_FAIL, CHECKOUT_DETAILS_FAIL} from "../constants/checkoutConstants";


export const getCheckoutDetails = (id) => async (dispatch)=>{
    try{
        dispatch({
            type: CHECKOUT_DETAILS_REQUEST
        })

        const {data} = await axios.get(`/api/stripe/sessions/${id}`);

        dispatch({
            type: CHECKOUT_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: CHECKOUT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const createCheckoutSession = (orderId, cartItems, taxes, shipping) => async (dispatch, getState)=>{
    try{
        dispatch({
            type: CREATE_CHECKOUT_SESSION_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const orderInfo = {orderId, cartItems, taxes, shipping};

        const {data} = await axios.post('/api/stripe/sessions', orderInfo, config);

        dispatch({
            type: CREATE_CHECKOUT_SESSION_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: CREATE_CHECKOUT_SESSION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}