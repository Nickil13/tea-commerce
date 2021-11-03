import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getUserProfile, updateUserProfile} from '../actions/userActions';
import { Loader, LoadingSpinner, Message} from '../components';
import { UPDATE_USER_PROFILE_RESET } from '../constants/userConstants';

export default function EditUserProfile() {
    const dispatch = useDispatch();
    const {userProfile, userUpdateProfile} = useSelector((state)=>state.user);
    const {user,loading,error} = userProfile;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState("");
    
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    
    const[formEdited, setFormEdited] = useState('');
    const {loading: updateLoading, success: updateSuccess, error: updateError} = userUpdateProfile;

    useEffect(()=>{
    
        if(!user || !user.username){
            dispatch(getUserProfile());
        }else{
            setUsername(user.username);
            setEmail(user.email);
            setAddress(user.shippingAddress.address);
            setCity(user.shippingAddress.city);
            setCountry(user.shippingAddress.country);
            setProvince(user.shippingAddress.province);
            setPostalCode(user.shippingAddress.postalCode);
        }
        
    },[dispatch, user])


    const handlePersonalSubmit = (e) =>{
        e.preventDefault();
        setFormEdited("personal");
        setMessage("");
        dispatch({type: UPDATE_USER_PROFILE_RESET});

        if(password){
            if(password!==confirmPassword){
                setMessage("Passwords do not match.");
            }else{
                dispatch(updateUserProfile(
                    {username,
                    email,
                    password,
                    confirmPassword}
                ))
            }
        }else{
            dispatch(updateUserProfile(
                {username,
                email}
            ))
        }  
    }

    const handleAddressSubmit = (e) =>{
        e.preventDefault();
        setFormEdited("address");
        dispatch(updateUserProfile(
            {shippingAddress: {
                address,
                city,
                country,
                province,
                postalCode
            }}
        ))
        
    }

    return (
        <div>
            <h1 className="page-title">Edit User Profile</h1>
            
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
                <div className="input-control">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>     
                <button type="submit" className="btn btn-primary">Edit</button>
                {formEdited==="personal" && (updateLoading ? <LoadingSpinner/> : updateError ? <Message>{updateError}</Message> : updateSuccess ? <Message>Personal information updated.</Message> : message && <Message>{message}</Message>)}
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
                {formEdited==="address" && (updateLoading ? <LoadingSpinner/> : updateError ? <Message>{updateError}</Message> : updateSuccess && <Message>Address updated.</Message>)}
            </form>
            </>}
        </div>
    )
}
