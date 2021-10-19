import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Message from '../components/Message';
import { useSelector, useDispatch} from 'react-redux';
import { registerUser } from '../actions/userActions';
import { Loader } from '../components';

export default function Signup() {
    const[username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const {userRegister, userLogin} = useSelector((state)=>state.user);
    const {loading,error,userInfo} = userRegister;
    
    useEffect(()=>{
        if(userLogin.userInfo || userInfo){
            history.push("/account");
        }    
    },[history,userInfo])

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(registerUser(username, email, password, confirmPassword));
        
        
    }
    return (
        <div className="signup-container" onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            {error && <Message type="error">{error}</Message>}
            <form className="signup-form">
                <div className="form-control">
                    <input type="text" name="username" id="username" placeholder="username" style={{textTransform:"capitalize"}} value={username} onChange={(e)=>setUsername(e.target.value)}/>           
                </div>
                <div className="form-control">
                    <input type="email" name="email" id="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>           
                </div>
                <div className="form-control">
                    <input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>           
                </div>
                <div className="form-control">
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>           
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
            <p>Already have an account? <Link to="/login">Log in</Link></p>
            {loading && <Loader/>}
        </div>
    )
}
