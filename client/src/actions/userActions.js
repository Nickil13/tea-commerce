import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants"

import userData from '../userData';

export const login = (username,password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        let existingUser = userData.filter((user)=>user.username===username)[0];
        if(existingUser){
            if(existingUser.password === password){
                console.log(`logging in as ${username}`);
            }else{
                console.log(`${existingUser.username}/${username}---${existingUser.password}/${password}`)
                throw Error("Invalid username or password.");
            }
        }else{
            throw Error("User does not exist.");
        } 
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: existingUser
        })
    
        localStorage.setItem('userInfo', JSON.stringify(existingUser));

    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.reponse.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem('userInfo');
    dispatch({
        type: USER_LOGOUT
    })
}