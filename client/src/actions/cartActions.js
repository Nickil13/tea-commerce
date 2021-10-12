import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_INFO, CART_UPDATE_QUANTITY } from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id,quantity) => async (dispatch, getState) => {
    
    try{
        const { data: item } = await axios.get(`/api/products/${id}`);
        
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                _id: id,
                name: item.name,
                category: item.category,
                productType: item.productType,
                image: item.image,
                price: item.price,
                countInStock: item.countInStock,
                flavourImage: item.flavourImage,
                quantity
            }
        })
        
        // If there is no user logged in, add to the local storage cart.
        const user = getState().user.userLogin;
        if(!user.username){
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        }
    }catch(error){
        console.log(`Error adding item to cart:${error}`);
    }   
}

export const clearCart = () => (dispatch)=>{
    localStorage.removeItem('cartItems');
    dispatch({
        type: CART_CLEAR_ITEMS
    })
}

export const updateCartItemQuantity = (id,quantity) => (dispatch,getState) => {

    dispatch({
        type: CART_UPDATE_QUANTITY,
        payload: {
            _id: id,
            quantity
        }
    })


    // If there is no user logged in, add to the local storage cart.
    const user = getState().user.userLogin;
    if(!user.username){
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
}

export const removeCartItem = (id) => (dispatch, getState) =>{

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            _id: id
        }
    })

    // If there is no user logged in, add to the local storage cart.
    const user = getState().user.userLogin;
    if(!user.username){
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }
}

export const saveShippingInfo = (address,city,province,country,postalCode) => (dispatch, getState) =>{

    dispatch({
        type: CART_SAVE_SHIPPING_INFO,
        payload: {
            address,
            city,
            province,
            country,
            postalCode
        }
    })

    localStorage.setItem('shippingInfo', JSON.stringify(getState().cart.shippingInfo));
}