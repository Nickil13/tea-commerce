import React, { useEffect } from "react";
import {BrowserRouter as Router, Route, Switch, Redirect, useLocation} from "react-router-dom";
import { Cart, Shipping, Home, Login, Order, OrderSuccess,Payment, PlaceOrder, ProductProfile, Shop, Signup, UserProfile, EditUserProfile, MyOrders} from "./pages";
import {Navbar, Footer, SearchModal, Sidebar, Alert} from './components';
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
          <SearchModal/>
          <main>
              <Switch>
                <Route exact path="/"><Home/></Route>
                <Route path="/cart"><Cart/></Route>
                <Route path="/account/orders/:id">
                  <Order/>
                </Route>
                <Route path="/account/orders/">
                  <MyOrders/>
                </Route>
                
                <Route path="/account/edit-profile">
                  {
                    userInfo ? <EditUserProfile/> : <Redirect to="/login"/> 
                  }
                </Route>
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
                <Route path="/order-success/:id"><OrderSuccess/></Route>
              </Switch>
          </main>
          <Footer/>
          <Alert/>
        </ScrollToTop>
      </Router>  
  );
}

export default App;
