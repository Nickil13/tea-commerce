import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    useLocation,
} from "react-router-dom";
import {
    AddProduct,
    Cart,
    Shipping,
    Home,
    Login,
    Order,
    Orders,
    OrderSuccess,
    Payment,
    PlaceOrder,
    Products,
    ProductProfile,
    Shop,
    Signup,
    EditUser,
    EditUserProfile,
    MyOrder,
    MyOrders,
    MyWishlist,
    Users,
    UserProfile,
    EditProduct,
} from "./pages";
import { Navbar, Footer, Sidebar, Alert } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/userActions";

const ScrollToTop = (props) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return props.children;
};

function App() {
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.usersSlice);

    return (
        <Router>
            <ScrollToTop>
                <Navbar />
                <Sidebar />
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/cart">
                            <Cart />
                        </Route>
                        <Route path="/account/orders/:id">
                            <MyOrder />
                        </Route>
                        <Route path="/account/orders/">
                            <MyOrders />
                        </Route>
                        <Route path="/account/edit-profile">
                            <EditUserProfile />
                        </Route>
                        <Route path="/account" exact>
                            <UserProfile />
                            {/* {authenticated ? (
                                <UserProfile />
                            ) : (
                                <Redirect to="/login" />
                            )} */}
                        </Route>
                        <Route path="/account/wishlist">
                            <MyWishlist />
                        </Route>

                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/shop/:category/:type/:id">
                            <ProductProfile />
                        </Route>
                        <Route path="/shop/:category?/:type?">
                            <Shop />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>

                        {/* Order Routes */}
                        <Route path="/shipping">
                            <Shipping />
                        </Route>
                        <Route path="/payment">
                            <Payment />
                        </Route>
                        <Route path="/placeorder">
                            <PlaceOrder />
                        </Route>
                        <Route path="/order-success/:id">
                            <OrderSuccess />
                        </Route>

                        {/* Admin Routes */}
                        <Route path="/admin/orders" exact>
                            <Orders />
                        </Route>
                        <Route path="/admin/orders/:id/edit">
                            <Order />
                        </Route>
                        <Route path="/admin/products" exact>
                            <Products />
                        </Route>
                        <Route path="/admin/products/:id/edit">
                            <EditProduct />
                        </Route>
                        <Route path="/admin/products/add">
                            <AddProduct />
                        </Route>
                        <Route path="/admin/users" exact>
                            <Users />
                        </Route>
                        <Route path="/admin/users/:id/edit">
                            <EditUser />
                        </Route>
                    </Switch>
                </main>
                <Footer />
                <Alert />
            </ScrollToTop>
        </Router>
    );
}

export default App;
