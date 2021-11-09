import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducers';
import { productReducer } from './reducers/productReducers';
import { orderReducer } from './reducers/orderReducers';
import { checkoutReducer } from './reducers/checkoutReducers';
import { localCartReducer } from './reducers/localCartReducer';


const reducer = combineReducers({
    user: userReducer,
    products: productReducer,
    orders: orderReducer,
    checkout: checkoutReducer,
    localCart: localCartReducer
});

const middleware = [thunk];


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null;
const localCartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];


const initialState = {
    user : {userLogin: {userInfo: userInfoFromStorage}, userPaymentMethod: {paymentMethod: paymentMethodFromStorage}},
    localCart : {cartItems: localCartItemsFromStorage}
}


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;