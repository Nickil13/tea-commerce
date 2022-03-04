import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
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
import { PrivateRoute } from "./utils/PrivateRoute";

const ScrollToTop = (props) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return props.children;
};

function App() {
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
                        <PrivateRoute path="/account/orders/:id">
                            <MyOrder />
                        </PrivateRoute>
                        <PrivateRoute path="/account/orders/">
                            <MyOrders />
                        </PrivateRoute>
                        <PrivateRoute path="/account/edit-profile">
                            <EditUserProfile />
                        </PrivateRoute>
                        <PrivateRoute path="/account" exact>
                            <UserProfile />
                        </PrivateRoute>

                        <PrivateRoute path="/account/wishlist">
                            <MyWishlist />
                        </PrivateRoute>

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
                        <PrivateRoute
                            path="/admin/orders"
                            privacy="admin"
                            exact
                        >
                            <Orders />
                        </PrivateRoute>
                        <PrivateRoute
                            path="/admin/orders/:id/edit"
                            privacy="admin"
                        >
                            <Order />
                        </PrivateRoute>
                        <PrivateRoute
                            path="/admin/products"
                            privacy="admin"
                            exact
                        >
                            <Products />
                        </PrivateRoute>
                        <PrivateRoute
                            path="/admin/products/:id/edit"
                            privacy="admin"
                        >
                            <EditProduct />
                        </PrivateRoute>
                        <PrivateRoute
                            path="/admin/products/add"
                            privacy="admin"
                        >
                            <AddProduct />
                        </PrivateRoute>
                        <PrivateRoute path="/admin/users" privacy="admin" exact>
                            <Users />
                        </PrivateRoute>
                        <PrivateRoute
                            path="/admin/users/:id/edit"
                            privacy="admin"
                        >
                            <EditUser />
                        </PrivateRoute>
                    </Switch>
                </main>
                <Footer />
                <Alert />
            </ScrollToTop>
        </Router>
    );
}

export default App;
