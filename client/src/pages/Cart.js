import React, { useState, useEffect } from 'react'
import CartCard from '../components/CartCard'
import { Link, useHistory} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { getUserProfile, clearCartItems } from '../actions/userActions';
import { LoadingSpinner, Message } from '../components';
import { USER_CART_CLEAR_ITEMS_RESET, USER_CART_UPDATE_QUANTITY_RESET } from '../constants/userConstants';
import { clearLocalCart } from '../actions/localCartActions';

export default function Cart() {
    const dispatch = useDispatch();
    const {userProfile, userLogin, userClearCart, userUpdateCart} = useSelector((state)=>state.user);
    const localCart = useSelector((state)=>state.localCart);
    const {user, loading, error} = userProfile;
    const {userInfo} = userLogin;
    const {success: clearCartSuccess} = userClearCart;
    const {success: updateCartSuccess, loading: updateCartLoading} = userUpdateCart;
    
    const history = useHistory();
    const [cartItems, setCartItems] = useState([]);
    // const totalItems = user.cartItems.reduce((acc, item)=> acc + item.quantity,0);

    // const subtotal = user.cartItems.reduce((acc,item)=>acc + (item.price*item.quantity),0).toFixed(2);

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
    },[user, localCart, clearCartSuccess, updateCartSuccess])

    const handleClearCart = () => {
        if(!userInfo){
            dispatch(clearLocalCart());
        }else{
            dispatch(clearCartItems());
        }
    }
    // useEffect(()=>{
    //     if(!user.username || clearCartSuccess || updateCartSuccess){
    //         dispatch({type: CART_UPDATE_QUANTITY_RESET});
    //         dispatch({type: CART_CLEAR_ITEMS_RESET});
    //         dispatch(getUserProfile());
    //     }else{
    //         setCartItems(user.cartItems);
    //     }
    // },[user, clearCartSuccess, updateCartSuccess])
    
    // if(userInfo && !user.cartItems.length>0){
    if(!cartItems.length>0){
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
            {/* {loading || updateCartLoading ? <LoadingSpinner/> : error ? <Message>{error}</Message> : <div className="cart"> */}
            {loading || updateCartLoading ? <LoadingSpinner/> :<div className="cart">
                <div className="cart-container">
                    <div>
                        {/* {user.cartItems.length>0 ? user.cartItems.map((item,index)=>{ */}
                        {cartItems.length>0 ? cartItems.map((item,index)=>{
                            return(
                                <CartCard key={index} {...item}/>
                            )
                        }) : <p></p>}
                    </div>
                    <button onClick={handleClearCart} className="btn btn-primary">Clear Cart</button>
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
