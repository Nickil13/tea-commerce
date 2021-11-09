import React, { useState, useEffect } from 'react'
import { CheckoutSteps, Message } from '../components';
import { useDispatch, useSelector } from 'react-redux';
// import { saveShippingInfo } from '../actions/cartActions';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import { useHistory } from 'react-router';

export default function Shipping() {
    const {userProfile} = useSelector((state)=>state.user);
    const {user} = userProfile;
    const[address,setAddress] = useState('');
    const[city,setCity] = useState('');
    const[province,setProvince] = useState('');
    const[country,setCountry] = useState('');
    const[postalCode, setPostalCode] = useState('');
    const[error,setError] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(()=>{
        if(!user.username){
            dispatch(getUserProfile());
        }else{
            const {address,city,province,country,postalCode} = user.shippingAddress;
            setAddress(address);
            setCity(city);
            setProvince(province);
            setCountry(country);
            setPostalCode(postalCode);
        }
        
    },[user, dispatch])

    const validate = () =>{
        
        const form = document.getElementById("shipping-form");
        
        if(!address){
            form.address.classList.add("invalid-input");
        }else{
            form.address.classList.remove("invalid-input");
        }
            
        if(!city){
            form.city.classList.add("invalid-input");
        }else{
            form.city.classList.remove("invalid-input");
        } 
            
        if(!province){
            form.province.classList.add("invalid-input");
        }else{
            form.province.classList.remove("invalid-input");
        }
            
        if(!country){
            form.country.classList.add("invalid-input");
        }else{
             form.country.classList.remove("invalid-input");
        } 
            
        if(!postalCode){
            form.postalcode.classList.add("invalid-input");
        }else{
            form.postalcode.classList.remove("invalid-input");
        }

        if(!address || !city || !province || !country || !postalCode){
            throw Error("Please fill out all fields.");
        }
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        try{
            validate();
            const shippingAddress = {address,city,province,country,postalCode}
            dispatch(updateUserProfile({shippingAddress}));
            history.push('/payment');
            setError("");
        }catch(error){
            setError(error.message);
        }
    }
    
    return (
        <div>
            <CheckoutSteps currentStepNum={2}/>
            <h1 className="page-title">Shipping</h1>
            <section className="shipping-section">
                <form id="shipping-form" className="shipping-form" onSubmit={handleSubmit}>
                    <div className="input-control">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="province">Province/State</label>
                        <input type="text" name="province" value={province} onChange={(e)=>setProvince(e.target.value)}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="country">Country</label>
                        <input type="text" name="country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="postalcode">Postal Code</label>
                        <input type="text" name="postalcode" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}/>
                    </div>
                    <button className="btn-secondary" type="submit" >Submit</button>
                </form>
            </section>
            <Message type={"error"}>{error}</Message>
        </div>
    )
}
