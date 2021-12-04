import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { getUserProfile, clearCartItems } from '../actions/userActions';
import { LoadingSpinner, CartCard} from '../components';
import { USER_CART_CLEAR_ITEMS_RESET, USER_CART_UPDATE_QUANTITY_RESET } from '../constants/userConstants';
import { clearLocalCart } from '../actions/localCartActions';

export default function Cart() {
    const dispatch = useDispatch();
    const {userProfile, userLogin, userClearCart, userUpdateCart} = useSelector((state)=>state.user);
    const localCart = useSelector((state)=>state.localCart);
    const {user, loading} = userProfile;
    const {userInfo} = userLogin;
    const {success: clearCartSuccess} = userClearCart;
    const {success: updateCartSuccess, loading: updateCartLoading} = userUpdateCart;
    
    const history = useHistory();
    const [cartItems, setCartItems] = useState([]);

    const totalItems = cartItems.reduce((acc, item)=> acc + item.quantity,0);

    const subtotal = cartItems.reduce((acc,item)=>acc + (item.price*item.quantity),0).toFixed(2);

    useEffect(()=>{
        if(!userInfo){
            setCartItems(localCart.cartItems);
        }else{
            if(!user.username || clearCartSuccess || updateCartSuccess){
                dispatch({type: USER_CART_UPDATE_QUANTITY_RESET});
                dispatch({type: USER_CART_CLEAR_ITEMS_RESET});
                dispatch(getUserProfile());
            }else{
                setCartItems(user.cartItems);
            }
        }
    },[user, localCart, clearCartSuccess, updateCartSuccess, dispatch, userInfo])

    const handleClearCart = () => {
        if(!userInfo){
            dispatch(clearLocalCart());
        }else{
            dispatch(clearCartItems());
        }
    }
    const handleCheckoutClick = () =>{
        if(!userInfo){
            //Have a redirect back to shipping when the user logs in
            history.push('/login?redirect=/shipping');
        }else{
            history.push('/shipping');
        }
    }
    
    
    if(!cartItems.length>0){
        return(
            <div>
                <div className="shipping-info-bar">
                    <p>Free shipping on orders over $80!</p>
                </div>
                <div className="page-title">
                    <h1>My Cart</h1>
                </div>
                <div className="empty-cart">
                    <p>You don't have any items in your cart!</p>
                    <button className="btn-secondary" onClick={()=>history.push("/shop")}>Shop</button>
                </div>
            </div>
        )
    }
    
    return (
        <div>
            <div className="shipping-info-bar">
                <p>Free shipping on orders over $80!</p>
            </div>
            <div className="page-title">
                <h1>My Cart</h1>
            </div>
            
            {loading || updateCartLoading ? <LoadingSpinner/> : <div className="cart-container">
                <div className="cart">
                    <div>
                        {cartItems.length>0 ? cartItems.map((item,index)=>{
                            return(
                                <CartCard key={index} {...item}/>
                            )
                        }) : <p></p>}
                    </div>
                    <button onClick={handleClearCart} className="btn btn-primary">Clear Cart</button>
                    </div> 
                <div className="cart-total">
                    <div className="cart-total-title">
                        <h3>Order Summary</h3>
                        <span>({totalItems} {totalItems>1 ? 'items)' : 'item)'}</span>
                    </div>
                    
                    <ul>
                        <li>Subtotal: ${subtotal}</li>
                        <li>Shipping:  TBD</li>
                        <li>Sales tax: TBD</li>
                    </ul> 
                  <button className="btn-secondary" onClick={handleCheckoutClick} >Proceed to Checkout</button>
                </div> 
                  
            </div>}
        </div>
    )
}


