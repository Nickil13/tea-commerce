import React, { useEffect } from "react";
import {BrowserRouter as Router, Route, Switch, Redirect, useLocation} from "react-router-dom";
import { Cart, Shipping, Home, Login, OrderSuccess,Payment, PlaceOrder, ProductProfile, Shop, Signup, UserProfile} from "./pages";
import {Navbar, Footer, Sidebar, Alert} from './components';
import { useSelector} from 'react-redux';

const ScrollToTop = (props) =>{
  const {pathname} = useLocation();

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [pathname]);

  return props.children;
}

function App() {
  const user = useSelector((state)=>state.user.userLogin);
  const {userInfo} = user;
 

  return (
      <Router>
        <ScrollToTop>
          <Navbar/>
          <Sidebar/>
          <main>
              <Switch>
                <Route exact path="/"><Home/></Route>
                <Route path="/cart"><Cart/></Route>
                <Route path="/account">
                  {
                    userInfo ? <UserProfile/> : <Redirect to="/login"/> 
                  }
                </Route>
                <Route path="/login"><Login/></Route>
                <Route path="/shop/:category/:type/:id"><ProductProfile/></Route>
                <Route path="/shop/:category?/:type?"><Shop/></Route>
                <Route path="/signup"><Signup/></Route>
                <Route path="/shipping"><Shipping/></Route>
                <Route path="/payment"><Payment/></Route>
                <Route path="/placeorder"><PlaceOrder/></Route>
                <Route path="/ordersuccess/:id"><OrderSuccess/></Route>
              </Switch>
          </main>
          <Footer/>
          <Alert/>
        </ScrollToTop>
      </Router>  
  );
}

export default App;
