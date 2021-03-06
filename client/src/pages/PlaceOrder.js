import React, { useEffect } from "react";
import { CheckoutSteps, OrderTable } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { createCheckoutSession } from "../actions/checkoutActions";
import { createOrder } from "../actions/orderActions";
import { Message } from "../components";
import { getUserProfile } from "../actions/userActions";
import { orderCreatedReset } from "../reducers/ordersSlice";
import { Helmet } from "react-helmet";

export default function PlaceOrder() {
    const { user, userPaymentMethod } = useSelector(
        (state) => state.usersSlice
    );
    const { shippingAddress, cartItems } = user;
    const subtotal = cartItems
        ? cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)
        : 0;

    const shipping = subtotal < 80.0 ? (subtotal * 0.15).toFixed(2) : 0;

    const taxes = (subtotal * 0.05).toFixed(2);

    const total = (Number(subtotal) + Number(shipping) + Number(taxes)).toFixed(
        2
    );

    const dispatch = useDispatch();

    const {
        checkoutSession,
        checkoutSessionSuccess,
        loading: sessionLoading,
        error: sessionError,
    } = useSelector((state) => state.checkoutSlice);

    const { url } = checkoutSession;

    const {
        createdOrder: order,
        creatingOrder,
        orderCreatedSuccess,
        orderCreatedError,
    } = useSelector((state) => state.ordersSlice);

    useEffect(() => {
        if (orderCreatedSuccess) {
            dispatch(
                createCheckoutSession(order._id, cartItems, taxes, shipping)
            );
            dispatch(orderCreatedReset());
        }

        if (!user.username) {
            dispatch(getUserProfile());
        }
    }, [
        orderCreatedSuccess,
        user,
        dispatch,
        order,
        cartItems,
        taxes,
        shipping,
    ]);

    useEffect(() => {
        if (checkoutSessionSuccess && url) {
            window.location = url;
        }
    }, [checkoutSessionSuccess, url]);

    const handlePlaceOrder = () => {
        const newOrder = {
            cartItems,
            shippingAddress,
            userPaymentMethod,
            subtotal,
            taxes,
            shipping,
            total,
        };

        dispatch(createOrder(newOrder));
    };

    return (
        <div>
            <Helmet>
                <title>Place Order | Tea-Commerce</title>
                <meta name="description" content="Place an order." />
            </Helmet>
            <CheckoutSteps currentStepNum={4} />
            <h1 className="page-title">Place Order</h1>
            <section className="order-shipping-section">
                <div className="section-container">
                    <h3>Shipping Information</h3>
                    <ul>
                        <li>{shippingAddress.address}</li>
                        <li>
                            {shippingAddress.city}, {shippingAddress.province}
                        </li>
                        <li>{shippingAddress.country}</li>
                        <li>{shippingAddress.postalCode}</li>
                    </ul>
                </div>
            </section>

            <section className="order-payment-section">
                <div className="section-container">
                    <h3>Payment Information</h3>
                    <p>Transaction type: {userPaymentMethod}</p>
                </div>
            </section>

            <section className="order-items-section">
                <div className="section-container">
                    <h3>Order Items</h3>
                    <OrderTable orderItems={cartItems} />
                </div>
            </section>

            <section className="order-summary">
                <div className="section-container">
                    <h3>Order Summary</h3>
                    <ul>
                        <li>Subtotal: ${subtotal}</li>
                        <li>Shipping cost: ${shipping}</li>
                        <li>Taxes: ${taxes}</li>
                        <li>Total: ${total}</li>
                    </ul>
                    <button
                        className="btn-secondary"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>

                    {creatingOrder ? (
                        <Message>Placing order...</Message>
                    ) : (
                        orderCreatedError && (
                            <Message>{orderCreatedError}</Message>
                        )
                    )}

                    {sessionLoading ? (
                        <Message>Loading Stripe session...</Message>
                    ) : (
                        sessionError && (
                            <Message>Error loading Stripe session.</Message>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}
