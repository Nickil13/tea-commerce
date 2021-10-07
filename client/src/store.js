import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { productReducer } from './reducers/productReducers';


const reducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    products: productReducer
});

const middleware = [thunk];


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    user : {userLogin: {userInfo: userInfoFromStorage}},
    cart: {cartItems: cartItemsFromStorage}
}

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;