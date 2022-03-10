import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import {
    getOrderDetails,
    updateOrderToDelivered,
} from "../actions/orderActions";
import { Message, LoadingSpinner, OrderTable } from "../components";

export default function Order() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {
        currentOrder: order,
        loading,
        error,
        orderDeliveredSuccess,
    } = useSelector((state) => state.ordersSlice);
    const history = useHistory();

    const {
        user,
        createdAt,
        isDelivered,
        isPaid,
        orderItems,
        paidAt,
        deliveredAt,
        shippingAddress,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentMethod,
    } = order;

    const subtotal = orderItems
        ? orderItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)
        : 0;

    useEffect(() => {
        if (orderDeliveredSuccess) {
            history.push("/admin/orders");
        } else if (!order.user || order._id !== id) {
            dispatch(getOrderDetails(id));
        }
    }, [id, order, orderDeliveredSuccess, dispatch, history]);

    return (
        <div>
            <Helmet>
                <title>Order Details | Tea-Commerce</title>
                <meta name="description" content="Order details and status." />
            </Helmet>
            <h1 className="page-title">Order Details</h1>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <div>
                    <section className="order-status">
                        <div className="section-container">
                            <p>
                                <strong>Order Id</strong>: #{id}
                            </p>
                            <div className="order-subsection">
                                <h3>Customer</h3>
                                <ul>
                                    <li>
                                        <strong>Customer Id: </strong>{" "}
                                        {user && user._id}
                                    </li>
                                    <li>
                                        <strong>Customer name: </strong>{" "}
                                        {user && user.username}
                                    </li>
                                </ul>
                            </div>
                            <div className="order-subsection">
                                <h3>Status</h3>
                                <ul>
                                    <li>
                                        <strong>Placed on: </strong>{" "}
                                        <Moment
                                            format="YYYY-MM-DD, HH:mm"
                                            date={createdAt}
                                        />
                                    </li>
                                    <li className="payment-status">
                                        <strong>Paid: </strong>
                                        <ul>
                                            <li>
                                                Paid at:{" "}
                                                {isPaid ? (
                                                    <Moment
                                                        format="YYYY-MM-DD, HH:mm"
                                                        date={paidAt}
                                                    />
                                                ) : (
                                                    "Not paid"
                                                )}
                                            </li>
                                            <li>
                                                Payment method: {paymentMethod}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Delivered: </strong>{" "}
                                        {isDelivered ? (
                                            <Moment
                                                format="YYYY-MM-DD, HH:mm"
                                                date={deliveredAt}
                                            />
                                        ) : (
                                            "Not delivered"
                                        )}
                                    </li>
                                </ul>
                                {!isDelivered && (
                                    <button
                                        onClick={() =>
                                            dispatch(updateOrderToDelivered(id))
                                        }
                                        className="btn"
                                    >
                                        mark as delivered
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                    <section className="order-shipping-section">
                        <div className="section-container">
                            <h3>Shipping Information</h3>
                            <ul>
                                <li>{shippingAddress.address}</li>
                                <li>
                                    {shippingAddress.city},{" "}
                                    {shippingAddress.province}
                                </li>
                                <li>{shippingAddress.country}</li>
                                <li>{shippingAddress.postalCode}</li>
                            </ul>
                        </div>
                    </section>

                    <section className="order-payment-section">
                        <div className="section-container">
                            <h3>Payment Information</h3>
                            <p>
                                <strong>Payment Method:</strong> {paymentMethod}
                            </p>
                            <p>
                                <strong>Paid: </strong>{" "}
                                {isPaid ? (
                                    <Moment
                                        format="YYYY-MM-DD, HH:mm"
                                        date={paidAt}
                                    />
                                ) : (
                                    "Not paid"
                                )}
                            </p>
                        </div>
                    </section>

                    <section className="order-items-section">
                        <div className="section-container">
                            <h3>Order Items</h3>
                            <OrderTable orderItems={orderItems} />
                        </div>
                    </section>

                    <section className="order-summary">
                        <div className="section-container">
                            <h3>Order Summary</h3>
                            <ul>
                                <li>Subtotal: ${subtotal}</li>
                                <li>Shipping cost: ${shippingPrice}</li>
                                <li>Taxes: ${taxPrice}</li>
                                <li>Total: ${totalPrice}</li>
                            </ul>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
