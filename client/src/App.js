import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import ItemProfile from "./pages/ProductProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Account from './pages/UserProfile';
import Alert from './components/Alert';
import { useGlobalContext} from "./context";
import { useSelector} from 'react-redux';


function App() {
  const user = useSelector((state)=>state.user.userLogin);
  const {userInfo} = user;

  return (
      <Router>
        <Navbar/>
        <Sidebar/>
        <main>
          {/* <div className="container"> */}
            <Switch>
              <Route exact path="/"><Home/></Route>
              <Route path="/cart"><Cart/></Route>
              <Route path="/account">
                {
                  userInfo ? <Account/> : <Redirect to="/login"/> 
                }
              </Route>
              <Route path="/login"><Login/></Route>
              <Route path="/shop/:category/:type/:id"><ItemProfile/></Route>
              <Route path="/shop/:category?/:type?"><Shop/></Route>
              <Route path="/signup"><Signup/></Route>
            </Switch>
          {/* </div> */}
        </main>
        <Footer/>
        <Alert/>
      </Router>  
  );
}

export default App;
