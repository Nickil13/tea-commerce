import React, { useEffect } from 'react'
import CartCard from '../components/CartCard'
import { Link, useHistory} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { getUserProfile, clearCartItems } from '../actions/userActions';
import { LoadingSpinner, Message } from '../components';
import { CART_CLEAR_ITEMS_RESET, CART_UPDATE_QUANTITY_RESET } from '../constants/userConstants';

export default function Cart() {
    const dispatch = useDispatch();
    const {userProfile, userClearCart, userUpdateCart} = useSelector((state)=>state.user);
    const {user, loading, error} = userProfile;
    const {success: clearCartSuccess} = userClearCart;
    const {success: updateCartSuccess, loading: updateCartLoading} = userUpdateCart;
    
    const history = useHistory();
    
    const totalItems = user.cartItems.reduce((acc, item)=> acc + item.quantity,0);

    const subtotal = user.cartItems.reduce((acc,item)=>acc + (item.price*item.quantity),0).toFixed(2);

    useEffect(()=>{
        if(!user.username || clearCartSuccess || updateCartSuccess){
            dispatch(getUserProfile());
            dispatch({type: CART_UPDATE_QUANTITY_RESET});
            dispatch({type: CART_CLEAR_ITEMS_RESET});
        }
    },[user, clearCartSuccess, updateCartSuccess])
    
    if(!user.cartItems.length>0){
        return(
            <div>
                <div className="shipping-info-bar">
                    <p>Free shipping on orders over $80!</p>
                </div>
                <h1 className="cart-title">My Cart</h1>
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
            <h1 className="cart-title">My Cart</h1>
            {loading || updateCartLoading ? <LoadingSpinner/> : error ? <Message>{error}</Message> : <div className="cart">
                <div className="cart-container">
                    <div>
                        {user.cartItems.length>0 ? user.cartItems.map((item,index)=>{
                            return(
                                <CartCard key={index} {...item}/>
                            )
                        }) : <p></p>}
                    </div>
                    <button onClick={()=>{dispatch(clearCartItems())}} className="btn btn-primary">Clear Cart</button>
                    </div> 
                <div className="cart-total">
                    <h3>Subtotal ({totalItems}) {totalItems>1 ? 'items' : 'item'}</h3>
                    <p>${subtotal}</p>
                    
                    <Link to='/shipping'><button className=" btn-secondary" >Proceed to Checkout</button></Link>
                </div> 
                  
            </div>}
        </div>
    )
}
