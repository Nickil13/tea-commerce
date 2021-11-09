import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM, CART_UPDATE_QUANTITY } from '../constants/localCartConstants';
import axios from 'axios';

export const addToLocalCart = (id,quantity) => async (dispatch, getState) => {
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
        
        localStorage.setItem('cartItems', JSON.stringify(getState().localCart.cartItems));
        

    }catch(error){
        console.log(`Error adding item to cart:${error}`);
    }   
}

export const clearLocalCart = () => (dispatch)=>{
    localStorage.removeItem('cartItems');
    dispatch({
        type: CART_CLEAR_ITEMS
    })
}

export const updateLocalCartItemQuantity = (id,quantity) => (dispatch,getState) => {

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
        localStorage.setItem('cartItems', JSON.stringify(getState().localCart.cartItems));
    }
}

export const removeLocalCartItem = (id) => (dispatch, getState) =>{

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            _id: id
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().localCart.cartItems));
}

