import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { Cart, Shipping, Home, Login, Payment, ProductProfile, Shop, Signup, UserProfile} from "./pages";
import {Navbar, Footer, Sidebar, Alert} from './components';
import { useSelector} from 'react-redux';


function App() {
  const user = useSelector((state)=>state.user.userLogin);
  const {userInfo} = user;

  return (
      <Router>
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
            </Switch>
        </main>
        <Footer/>
        <Alert/>
      </Router>  
  );
}

export default App;
