import React, { useState, useContext, useEffect} from 'react';
import data from "./resources/teaItemData";
import userData from './resources/userData';
const AppContext = React.createContext();

export const AppProvider = ({children}) =>{
    const[cart,setCart] = useState([]);
    const[user,setUser] = useState(null);
    const[isSidebarOpen,setIsSidebarOpen] = useState(false);
    const[isLoggedIn,setIsLoggedIn] = useState(false);
    const[isAlertShowing,setIsAlertShowing] = useState(false);
    const[alertContent,setAlertContent] = useState("");
    const[error,setError] = useState("");

    const showAlert = (message) =>{
        setIsAlertShowing(true);
        setAlertContent(message);
    }
    const closeAlert = () =>{
        setIsAlertShowing(false);
        setAlertContent("");
    }
    const closeSidebar = () =>{
        setIsSidebarOpen(false);
        document.body.style.overflow = "visible";
    }

    const openSidebar = () =>{
        setIsSidebarOpen(true);
        document.body.style.overflow = "hidden";
    }
    useEffect(()=>{
        console.log("checking for existing user in local storage");
        let localUser = localStorage.getItem("userInfo");
        if(localUser){
            let newUser = JSON.parse(localUser);
            login(newUser.username, newUser.password);
            setCart(newUser.cart);
        }
    },[])

    useEffect(()=>{
        if(user){
            setUser((currentUser)=>{
                return {...currentUser,cart: cart}
            });
            
        }
    },[cart])
    useEffect(()=>{
        if(user){
            localStorage.setItem("userInfo",JSON.stringify(user));
            console.log("saving user to local storage");
        } 
    },[user])

    const clearCart = () =>{
        setCart([]);
    }
    const addToCart = (item) =>{
        let tempCart = cart;
        
        // Check if item is in cart. If it isn't, add it. If it is, increase it's amount.
        if(cart.filter((cartItem)=>cartItem.name === item.name).length>0){
            tempCart = cart.map((cartItem)=>{
                if(cartItem.name === item.name){
                    showAlert(`You added ${item.name} to your cart! (total: ${cartItem.amount +1})`);
                    return {...cartItem,amount: cartItem.amount + 1};
                }
                return cartItem;
            })
        }else{
            tempCart = [...cart, item];
            showAlert(`You added ${item.name} to your cart!`);
        }
        
        setCart(tempCart);    
    }

    const getItem = (name) =>{
        console.log(`getting item: ${name}`);
        return(
            data.filter((item)=>item.name === name)
        );
        

    }
    const register = (user) => {
        user.cart = cart;
        localStorage.setItem("userInfo", JSON.stringify(user));
        console.log("user registered");
        login(user.username,user.password);
    }
    const login = (username,password) => {
        let existingUser = userData.filter((user)=>user.username===username)[0];

        if(existingUser){
            if(existingUser.password === password){
                setIsLoggedIn(true);
                setUser(existingUser);
                localStorage.setItem("userInfo", JSON.stringify(existingUser));
                setError("");
                console.log(`logging in as ${username}`);
            }else{
                console.log(`${existingUser.username}/${username}---${existingUser.password}/${password}`)
                setError("Invalid username or password.");
            }
        }else{
            setError("User does not exist.");
        }    
    }
    const logout = () => {
        localStorage.removeItem("userInfo");
        setUser(null);
        setCart([]);
        setIsLoggedIn(false);
        

    }
      
    
    return <AppContext.Provider 
    
    value=
    {{
        cart,
        addToCart,
        getItem,
        clearCart,
        isSidebarOpen,
        closeSidebar,
        openSidebar,
        isLoggedIn,
        isAlertShowing,
        showAlert,
        closeAlert,
        alertContent,
        login,
        register,
        logout,
        user,
        error,
    }}>

        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}