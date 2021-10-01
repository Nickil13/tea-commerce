import React from 'react'
import { useGlobalContext } from '../context'
import CartCard from '../components/CartCard'
import { useHistory} from 'react-router-dom'

export default function Cart() {
    const{cart,clearCart} = useGlobalContext();
    const history = useHistory();
    if(!cart.length>0){
        return(
            <main>
                <div className="cart-container">
                    <div className="cart">
                        <div className="cart-header">
                            <h1>My Cart</h1>
                        </div>
                        <p>You don't have any items in your cart!</p>
                        <button className="btn btn-primary" onClick={()=>history.push("/shop/loose-leaf/")}>Shop</button>
                    </div>
                </div>

            </main>
        )
    }
    return (
        <main>
            <div className="cart-container">
                <div className="cart">
                    <div className="cart-header">
                        <h1>My Cart</h1>
                    </div>
                    <div className="cart-items">
                        {cart.length>0 ? cart.map((item,index)=>{
                            return(
                                <CartCard key={index} {...item}/>
                            )
                        }) : <p></p>}
                    </div>
                    <div>
                        <p>Total amount in cart: $0</p>
                    </div>
                    <div className="cart-btns">
                        <button onClick={clearCart} className="btn btn-primary">Clear Cart</button>
                        <button className="btn btn-primary">Checkout</button>
                    </div>
                    
                </div>
            </div>  
        </main>
    )
}
