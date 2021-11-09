import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { CheckoutSteps } from '../components';
import { useHistory } from 'react-router';
import { savePaymentMethod } from '../actions/userActions';

export default function Payment() {
    const[paymentMethod, setPaymentMethod] = useState("Stripe");

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');  
    }

    return (
        <div>
            <CheckoutSteps currentStepNum={3}/>
            <h1 className="page-title">Payment Method</h1>
            <section className="payment-section">
                <form className="payment-form" id="payment-form" onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input type="radio" id="payMethod" name="payMethod"  checked onChange={(e)=>setPaymentMethod(e.target.value)}/>
                        <label htmlFor="payMethod">Stripe</label>
                    </div>
                   
                    <button type="submit" className="btn-secondary">Submit</button>
                </form>   
            </section>
        </div> 
    )
}
