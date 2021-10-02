import { CART_ADD_ITEM, CART_CLEAR_ITEMS } from '../constants/cartConstants';
import teaItemData from '../teaItemData';

export const addToCart = (id,amount) => (dispatch, getState) => {
    
    const item = teaItemData.filter((tea)=>tea.id === id)[0];

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            id: item.id,
            name: item.name,
            category: item.category,
            type: item.type,
            image: item.image,
            price: item.price,
            amount
        }
    })
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    
}

export const clearCart = () => (dispatch)=>{
    localStorage.removeItem('cartItems');
    dispatch({
        type: CART_CLEAR_ITEMS
    })
}