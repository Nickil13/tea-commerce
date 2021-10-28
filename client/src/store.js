import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { productReducer } from './reducers/productReducers';
import { orderReducer } from './reducers/orderReducers';
import { checkoutReducer } from './reducers/checkoutReducers';


const reducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    checkout: checkoutReducer
});

const middleware = [thunk];


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const shippingInfoFromStorage = localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {};
const paymentInfoFromStorage = localStorage.getItem('paymentInfo') ? JSON.parse(localStorage.getItem('paymentInfo')) : {};


const initialState = {
    user : {userLogin: {userInfo: userInfoFromStorage}},
    cart: {cartItems: cartItemsFromStorage, shippingInfo: shippingInfoFromStorage,
    paymentInfo: paymentInfoFromStorage},  
}


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;