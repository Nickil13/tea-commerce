import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAIL, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAIL, WISHLIST_ADD_ITEM_REQUEST, WISHLIST_ADD_ITEM_FAIL, WISHLIST_ADD_ITEM_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS } from "../constants/userConstants"
import axios from "axios";

export const login = (username,password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const {data} = await axios.post('/api/users/login', {username, password}, config);
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    
        localStorage.setItem('userInfo', JSON.stringify(data));

    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem('userInfo');
    dispatch({
        type: USER_LOGOUT
    })
}

export const registerUser = (username, email, password, confirmPassword) => async(dispatch)=>{
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        if(password!==confirmPassword){
            throw new Error("Passwords do not match.");
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users', {
            username,
            email,
            password
        }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        //Log in after registering
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: UPDATE_USER_PROFILE_REQUEST
        })

        const {user: {userLogin: {userInfo}}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put('/api/users/profile', user, config);

        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const getUserProfile = () => async(dispatch, getState) =>{
    try{
        dispatch({
            type: GET_USER_PROFILE_REQUEST
        })

        const {user: {userLogin: {userInfo}}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/users/profile', config);

        dispatch({
            type: GET_USER_PROFILE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: GET_USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

// Get user Details
// Admin
export const getUserDetails = (id) => async(dispatch, getState) =>{
    try{
        dispatch({
            type: UPDATE_USER_PROFILE_REQUEST
        })

        const {user: {userLogin: {userInfo}}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const addToWishlist = (id) => async (dispatch, getState)=>{
    try{

        dispatch({
            type: WISHLIST_ADD_ITEM_REQUEST,
        })
        // Get the user details
        const {user: {userLogin: {userInfo}}} = getState();
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data: user } = await axios.get('/api/users/profile', config);
        console.log(user);

        const {data: product} = await axios.get(`/api/products/${id}`);
        console.log(product);

        // Check if the item is already in the wishlist
        if(user.wishlist.find((item)=>item._id === product._id)){
            throw new Error("Item already in the wishlist.");
        }
        const newUser = {
            wishlist: [...user.wishlist, {
                name: product.name,
                image: product.image,
                category: product.category,
                productType: product.productType,
                _id: product._id
            }]
        }

        const postConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        await axios.put('/api/users/profile', newUser, postConfig);
        
        dispatch({
            type: WISHLIST_ADD_ITEM_SUCCESS,
        })
        
    }catch(error){
        dispatch({
            type: WISHLIST_ADD_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}