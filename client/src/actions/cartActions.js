// import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_ADD_ITEM_REQUEST, CART_ADD_ITEM_SUCCESS, CART_CLEAR_ITEMS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_UPDATE_QUANTITY } from '../constants/cartConstants';
// import axios from 'axios';

// export const addToCart = (id,quantity) => async (dispatch, getState) => {
    
//     try{
//         const { data: item } = await axios.get(`/api/products/${id}`);
        
//         dispatch({
//             type: CART_ADD_ITEM,
//             payload: {
//                 _id: id,
//                 name: item.name,
//                 category: item.category,
//                 productType: item.productType,
//                 image: item.image,
//                 price: item.price,
//                 countInStock: item.countInStock,
//                 flavourImage: item.flavourImage,
//                 quantity
//             }
//         })
        

//         If there is no user logged in, add to the local storage cart.
//         const user = getState().user.userLogin;
//         if(!user.username){
//             localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
//         }

//     }catch(error){
//         console.log(`Error adding item to cart:${error}`);
//     }   
// }

// export const addToCart = (id, quantity) => async (dispatch, getState)=>{
//     try{

//         dispatch({
//             type: CART_ADD_ITEM_REQUEST,
//         })
//         // Get the user details
//         const {user: {userLogin: {userInfo}}} = getState();
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }
//         const { data: user } = await axios.get('/api/users/profile', config);

//         const {data: product} = await axios.get(`/api/products/${id}`);
//         console.log(user,product);
//         // Check if the item is already in the wishlist
//         // if(user.cartItems.find((item)=>item._id === product._id)){
//         //     throw new Error("Item already in the cart.");
//         // }
//         const newUser = {
//             cartItems: [...user.cartItems, {
//                 _id: id,
//                 name: product.name,
//                 category: product.category,
//                 productType: product.productType,
//                 image: product.image,
//                 price: product.price,
//                 countInStock: product.countInStock,
//                 flavourImage: product.flavourImage,
//                 quantity
//             }]
//         }
//         console.log(newUser);

//         const postConfig = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }
//         await axios.put('/api/users/profile', newUser, postConfig);
        
//         dispatch({
//             type: CART_ADD_ITEM_SUCCESS,
//         })
        
//     }catch(error){
//         dispatch({
//             type: CART_ADD_ITEM_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// }

// export const clearCart = () => (dispatch)=>{
//     localStorage.removeItem('cartItems');
//     dispatch({
//         type: CART_CLEAR_ITEMS
//     })
// }

// export const updateCartItemQuantity = (id,quantity) => (dispatch,getState) => {

//     dispatch({
//         type: CART_UPDATE_QUANTITY,
//         payload: {
//             _id: id,
//             quantity
//         }
//     })


//     // If there is no user logged in, add to the local storage cart.
//     const user = getState().user.userLogin;
//     if(!user.username){
//         localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
//     }
// }

// export const removeCartItem = (id) => (dispatch, getState) =>{

//     dispatch({
//         type: CART_REMOVE_ITEM,
//         payload: {
//             _id: id
//         }
//     })

//     // If there is no user logged in, add to the local storage cart.
//     const user = getState().user.userLogin;
//     if(!user.username){
//         localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
//     }
// }

// export const saveShippingInfo = (address,city,province,country,postalCode) => (dispatch, getState) =>{

//     dispatch({
//         type: CART_SAVE_SHIPPING_INFO,
//         payload: {
//             address,
//             city,
//             province,
//             country,
//             postalCode
//         }
//     })


//     localStorage.setItem('shippingInfo', JSON.stringify(getState().cart.shippingInfo));
// }

// export const savePaymentMethod = (paymentMethod) =>
//     (dispatch) =>{

//     dispatch({
//         type: CART_SAVE_PAYMENT_METHOD,
//         payload: {
//             paymentMethod
//         }
//     })

//     localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
    
// }