import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { login, updateUserProfile } from '../actions/userActions';

export default function Login() {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.user.userLogin);
    const { userInfo, error } = user;
    const localCart = useSelector((state)=>state.localCart);
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username,password));
    }

    useEffect(()=>{
        if(userInfo){
            // If the user is logging in in order to checkout, push to shipping.
            // Update the users cart to have the local cart items.
            if(location.search.includes('redirect')){
                history.push(location.search.split('=')[1]);
                dispatch(updateUserProfile({
                    cartItems: localCart.cartItems
                }))
            }else{
                history.push("/account");
            }
        }
    },[userInfo])
    
    return (
        <div className="signup-container" onSubmit={handleSubmit}>
            <h1>Log in</h1>
            {error && <Message type="error">{error}</Message>}
            <form className="signup-form">
                <div className="form-control">
                    <input type="text" name="username" id="username" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>           
                </div>
                <div className="form-control">
                    <input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />           
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
            <p>Don't have an account? <Link to={location.search.includes('redirect') ? `/signup?redirect=${location.search.split('=')[1]}` : '/signup'}>Sign up</Link></p>
        </div>
    )
}
