import React, { useEffect } from "react";
import { CheckoutSteps, OrderTable } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { createCheckoutSession } from "../actions/checkoutActions";
import { createOrder } from "../actions/orderActions";
import { Message } from "../components";
import { getUserProfile } from "../actions/userActions";

export default function PlaceOrder() {
    // const { userProfile, userPaymentMethod } = useSelector(
    //     (state) => state.user
    // );
    // const { shippingAddress, cartItems } = userProfile.user;
    // const { paymentMethod } = userPaymentMethod;
    const {
        user: { shippingAddress, cartItems },
        userPaymentMethod,
    } = useSelector((state) => state.usersSlice);
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

    const { checkoutSession } = useSelector((state) => state.checkoutSlice);
    // const checkout = useSelector((state) => state.checkout);
    // const { checkoutSession } = checkout;
    const {
        url,
        loading: sessionLoading,
        success: checkoutSessionSuccess,
        error: sessionError,
    } = checkoutSession;

    const { createdOrder } = useSelector((state) => state.ordersSlice);
    // const createdOrder = useSelector((state) => state.orders.createdOrder);
    const {
        loading,
        success: orderSuccess,
        error: orderError,
        order,
    } = createdOrder;

    useEffect(() => {
        if (orderSuccess) {
            dispatch(
                createCheckoutSession(order._id, cartItems, taxes, shipping)
            );
        } else {
            dispatch(getUserProfile());
        }
        // eslint-disable-next-line
    }, [orderSuccess, dispatch]);

    useEffect(() => {
        if (checkoutSessionSuccess && url) {
            window.location = url;
        }
    }, [checkoutSessionSuccess, url]);

    const handlePlaceOrder = () => {
        dispatch(
            createOrder({
                cartItems,
                shippingAddress,
                userPaymentMethod,
                subtotal,
                taxes,
                shipping,
                total,
            })
        );
    };

    return (
        <div>
            <CheckoutSteps currentStepNum={4} />
            <h1 className="page-title">Place Order</h1>
            <section className="order-shipping-section">
                <h3>Shipping Information</h3>
                <ul>
                    <li>{shippingAddress.address}</li>
                    <li>
                        {shippingAddress.city}, {shippingAddress.province}
                    </li>
                    <li>{shippingAddress.country}</li>
                    <li>{shippingAddress.postalCode}</li>
                </ul>
            </section>

            <section className="order-payment-section">
                <h3>Payment Information</h3>
                <p>Transaction type: {userPaymentMethod}</p>
            </section>

            <section className="order-items-section">
                <h3>Order Items</h3>
                <OrderTable orderItems={cartItems} />
            </section>

            <section className="order-summary">
                <h3>Order Summary</h3>
                <ul>
                    <li>Subtotal: ${subtotal}</li>
                    <li>Shipping cost: ${shipping}</li>
                    <li>Taxes: ${taxes}</li>
                    <li>Total: ${total}</li>
                </ul>
                <button className="btn-secondary" onClick={handlePlaceOrder}>
                    Place Order
                </button>

                {loading ? (
                    <Message>Placing order...</Message>
                ) : (
                    orderError && <Message>{orderError}</Message>
                )}

                {sessionLoading ? (
                    <Message>Loading Stripe session...</Message>
                ) : (
                    sessionError && (
                        <Message>Error loading Stripe session.</Message>
                    )
                )}
            </section>
        </div>
    );
}
