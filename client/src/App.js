import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import ItemProfile from "./pages/ItemProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Recipes from "./pages/Recipes";
import Sidebar from "./components/Sidebar";
import Account from './pages/Account';
import Alert from './components/Alert';
import { useGlobalContext} from "./context";

function App() {
  const{isLoggedIn} = useGlobalContext();

  return (
    <div className="page-container">
      <Router>
        <Navbar/>
        <Sidebar/>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/cart"><Cart/></Route>
          <Route path="/account">
            {
              isLoggedIn ? <Account/> : <Redirect to="/login"/> 
            }
          </Route>
          <Route path="/login"><Login/></Route>
          <Route path="/shop/:category/:type/:id"><ItemProfile/></Route>
          <Route path="/shop/:category?/:type?"><Shop/></Route>
          <Route path="/signup"><Signup/></Route>
          <Route path="/recipes"><Recipes/></Route>
          <Route path="/itemProfile/:name"><ItemProfile/></Route>
        </Switch>
        <Footer/>
        <Alert/>
      </Router>
    </div>
    
  );
}

export default App;
