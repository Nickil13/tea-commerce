import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM,  CART_UPDATE_QUANTITY } from "../constants/localCartConstants";


export const localCartReducer = (state = {cartItems:[]},action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const newItem = action.payload;
            const itemExists = state.cartItems.find((item)=>item._id === newItem._id);

            if(itemExists){
                return {
                    ...state,cartItems: state.cartItems.map((item)=>{
                        if(item._id === newItem._id){
                            let newAmount = item.quantity + Number(newItem.quantity);
                            item.quantity = newAmount;
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

            //Save the cart for the user

        case CART_UPDATE_QUANTITY:
            const updatedItem = state.cartItems.find((item)=>item._id === action.payload._id);
            const newQuantity = action.payload.quantity;
            return {
                ...state, cartItems: state.cartItems.map((item)=>{
                    if(item._id === updatedItem._id){
                        item.quantity = Number(newQuantity);
                        return item;
                    }else{
                        return item;
                    }
                })
            }
        case CART_REMOVE_ITEM:
            const removeItem = state.cartItems.find((item)=>item._id === action.payload._id);

            return {
                ...state, cartItems: state.cartItems.filter((item)=> item._id!==removeItem._id)
            }
        case CART_CLEAR_ITEMS:
            return {cartItems:[]}

        default:
            return state;
    }
}
