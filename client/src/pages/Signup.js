import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Message from '../components/Message';

export default function Signup() {
    const[username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");
    const[error, setError] = useState("");
    const{register,isLoggedIn} = useGlobalContext();
    const history = useHistory();
    
    // useEffect(()=>{
    //     if(isLoggedIn){
    //         history.push("/account");
    //     }
        
    // },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if(username && email && password){
            let unique = false;
            let savedUser = localStorage.getItem("userInfo");
            let userInfo = {};
            if(savedUser){
                userInfo = JSON.parse(savedUser);
            }
            //Check if that username already exists
            if(userInfo){
                if(userInfo.username === username || userInfo.email === email){
                    unique = false;
                    setError("User already exists.");
                }else{
                    unique = true;
                }
            }else{
                unique = true;
            }
            //Confirm passwords and unique account
            if(unique && password === confirmPassword){
                let user = {username,email,password}
                register(user);
                history.push("/account");
            }
            if(password !== confirmPassword){
                setError("Passwords do not match.");
            }
            
        }else{
            setError("Fill in all required fields.");
        }
        
    }
    return (
        <div className="signup-container" onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            {error && <Message type="error">{error}</Message>}
            <form className="signup-form">
                <div className="form-control">
                    <input type="text" name="username" id="username" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>           
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
        </div>
    )
}
