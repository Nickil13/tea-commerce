import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM } from "../constants/cartConstants";


export const cartReducer = (state = {cartItems:[]},action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const newItem = action.payload;
            const itemExists = state.cartItems.find((item)=>item.name === newItem.name);

            if(itemExists){
                return {
                    ...state,cartItems: state.cartItems.map((item)=>{
                        if(item.name === newItem.name){
                            let newAmount = item.amount + newItem.amount;
                            item.amount = newAmount;
                            return item;
                        }else{
                            return item;
                        }
                    })
                        
                }
            }else{
                return{
                    ...state, cartItems: [...state.cartItems, newItem]
                }
            }

        case CART_REMOVE_ITEM:
            return
        case CART_CLEAR_ITEMS:
            return {cartItems:[]}
        default:
            return state;
    }
}