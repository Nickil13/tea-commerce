import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getUserProfile, updateUserProfile} from '../actions/userActions';
import { Loader, Message} from '../components';

export default function EditUserProfile() {
    const dispatch = useDispatch();
    const userProfile = useSelector((state)=>state.user.userProfile);
    const {user,loading,error} = userProfile;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    
    

    useEffect(()=>{
        
        if(!userProfile){
            console.log('getting user profile')
            dispatch(getUserProfile());
            console.log(userProfile);
        }else if(user){
            console.log(userProfile);
            setUsername(user.username);
            setEmail(user.email);
        }
        
        console.log(user);
        // console.log("getting user profile");
        // console.log("setting username to: " + user.username);
        // setUsername(user.username);
        // setEmail(user.email);
        // setAddress(user.shippingAddress.address);
        // setCity(user.shippingAddress.city);
        // setCountry(user.shippingAddress.country);
        // setProvince(user.shippingAddress.province);
        // setPostalCode(user.shippingAddress.postalCode);
    },[user, dispatch])

    const handlePersonalSubmit = (e) =>{
        e.preventDefault();
        
    }

    const handleAddressSubmit = (e) =>{
        e.preventDefault();
        
    }

    return (
        <div>
            <h1 className="edit-profile-title">Edit User Profile</h1>
            {loading ? <Loader/> : error ? <Message>{error}</Message> :<>
            <form className="edit-profile-form" onSubmit={handlePersonalSubmit}>
                <h2>Personal Information</h2>
                <div className="input-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="input-control">
                <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="input-control">
                <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Edit</button>
            </form>
            
            <form className="edit-profile-form"  onSubmit={handleAddressSubmit}>
                <h2>Shipping Address</h2>
                <div className="input-control">
                    <label htmlFor="street">Address</label>
                    <input type="text" name="address" id="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div className="input-control">
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" value={city} onChange={(e)=>setCity(e.target.value)}/>
                </div>
                <div className="input-control">
                    <label htmlFor="province">Province</label>
                    <input type="text" name="province" id="province" value={province} onChange={(e)=>setProvince(e.target.value)}/>
                </div>
                <div className="input-control">
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" id="country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                </div>
                <div className="input-control">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" name="postalCode" id="postalCode" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Edit</button>
            </form>
            </>}
        </div>
    )
}
