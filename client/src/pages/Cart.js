import React from 'react'
import CartCard from '../components/CartCard'
import { Link, useHistory} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { clearCart } from '../actions/cartActions';

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart);
    const { cartItems} = cart;

    const history = useHistory();
    
    const totalItems = cartItems.reduce((acc, item)=> acc + item.quantity,0);

    const subtotal = cartItems.reduce((acc,item)=>acc + (item.price*item.quantity),0).toFixed(2);

    const shipping = subtotal < 80.00 ? (subtotal*0.15).toFixed(2) : 0;

    const taxes = (subtotal * 0.05).toFixed(2);

    const total = (Number(subtotal)+Number(shipping) + Number(taxes)).toFixed(2);
    
    if(!cartItems.length>0){
        return(
            <div>
                <div className="shipping-info">
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
            <div className="cart">
                <div className="cart-container">
                    <div className="cart-items">
                        {cartItems.length>0 ? cartItems.map((item,index)=>{
                            return(
                                <CartCard key={index} {...item}/>
                            )
                        }) : <p></p>}
                    </div>
                    <button onClick={()=>{dispatch(clearCart())}} className="btn btn-primary">Clear Cart</button>
                    </div> 
                <section className="cart-payment-section">
                    <h3>Subtotal ({totalItems}) {totalItems>1 ? 'items' : 'item'}</h3>
                    <ul>
                        <li>${subtotal}</li>
                        <li>Shipping cost: ${shipping}</li>
                        <li>Taxes: ${taxes}</li>
                        <li>Total: ${total}</li>
                    </ul>
                    
                    <Link to='/shipping'><button className=" btn-secondary" >Proceed to Checkout</button></Link>
                </section> 
                  
            </div>
        </div>
    )
}
