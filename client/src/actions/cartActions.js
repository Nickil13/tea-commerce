import { CART_ADD_ITEM, CART_CLEAR_ITEMS } from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id,countInStock) => async (dispatch, getState) => {
    console.log(id,countInStock);
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
                countInStock,
                ingredients: item.ingredients,
                rating: item.rating,
                flavourImage: item.flavourImage
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