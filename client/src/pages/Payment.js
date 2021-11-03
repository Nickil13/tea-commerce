import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { savePaymentInfo } from '../actions/cartActions';
import { CheckoutSteps, Message } from '../components';
import { useHistory } from 'react-router';

export default function Payment() {
    const cart = useSelector((state)=>state.cart);
    const {paymentInfo} = cart;
    const [cardType,setCardType] = useState(paymentInfo.cardType? paymentInfo.cardType : "VISA");
    const [cardNumber, setCardNumber] = useState(paymentInfo.cardNumber);
    const [cardName, setCardName] = useState(paymentInfo.cardName);
    const[error,setError] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const validate = () =>{
        
        const form = document.getElementById("payment-form");
        
        if(!cardType){
            form.cardType.classList.add("invalid-input");
        }else{
            form.cardType.classList.remove("invalid-input");
        }
        
        if(!cardNumber || (cardNumber && cardNumber.length<12)){
            form.cardNumber.classList.add("invalid-input");
            
            if(cardNumber && cardNumber.length<12){
                throw Error("Invalid card number.");
            }
        }else{
            form.cardNumber.classList.remove("invalid-input");
        } 
            
        if(!cardName){
            form.cardName.classList.add("invalid-input");
        }else{
            form.cardName.classList.remove("invalid-input");
        }
       
        if(!cardType || !cardNumber || !cardName){
            throw Error("Please fill out all fields.");
        }
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        try{
            validate();
            dispatch(savePaymentInfo(cardType,cardNumber,cardName));
            history.push('/placeorder');
            setError("");
        }catch(error){
            setError(error.message);
        }
        
    }

    return (
        <div>
            <CheckoutSteps currentStepNum={3}/>
            <h1 className="page-title">Payment Method</h1>
            <section className="payment-section">
                <form className="payment-form" id="payment-form" onSubmit={handleSubmit}>
                    <div className="input-control">
                        <label htmlFor="cardType">Card Type</label>
                        <select name="cardType" id="cardType" value={cardType} onChange={(e)=>setCardType(e.target.value)}>
                            <option value="VISA">VISA</option>
                            <option value="Mastercard">Mastercard</option>
                            <option value="Debit">Debit</option>
                            <option value="Amex">Amex</option>
                        </select>
                    </div>
                    <div className="input-control">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="tel" name="cardNumber" maxLength="12" value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="cardName">Name on Card</label>
                        <input type="text" name="cardName" style={{textTransform:"capitalize"}} value={cardName} onChange={(e)=>setCardName(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn-secondary">Submit</button>
                </form>
                
            </section>
            <Message type={"error"}>{error}</Message>
        </div>
    )
}
