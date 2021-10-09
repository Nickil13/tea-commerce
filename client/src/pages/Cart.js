import React from 'react'
import CartCard from '../components/CartCard'
import { useHistory} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { clearCart } from '../actions/cartActions';

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart);
    const { cartItems} = cart;

    const history = useHistory();
    
    
    if(!cartItems.length>0){
        return(
            <div className="cart-container">
                <div className="cart">
                    <div className="cart-header">
                        <h1>My Cart</h1>
                    </div>
                    <p>You don't have any items in your cart!</p>
                    <button className="btn btn-primary" onClick={()=>history.push("/shop/loose leaf/")}>Shop</button>
                </div>
            </div>
        )
    }
    return (
        <div className="cart-container">
            <div className="cart">
                <div className="cart-header">
                    <h1>My Cart</h1>
                </div>
                <div className="cart-items">
                     {cartItems.length>0 ? cartItems.map((item,index)=>{
                        return(
                            <CartCard key={index} {...item}/>
                        )
                    }) : <p></p>}
                </div>
                <div>
                    <p>Total amount in cart: $0</p>
                </div>
                <div className="cart-btns">
                    <button onClick={()=>{dispatch(clearCart())}} className="btn btn-primary">Clear Cart</button>
                    <button className="btn btn-primary">Checkout</button>
                </div>
                    
            </div>
        </div>
    )
}
