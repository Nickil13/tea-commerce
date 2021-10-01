import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Message from '../components/Message';

export default function Login() {
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const{login, isLoggedIn,error} = useGlobalContext();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username,password);
        console.log(isLoggedIn);
    }
    useEffect(()=>{
        if(isLoggedIn){
            history.push("/account");
        }
    },[isLoggedIn])
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
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    )
}
