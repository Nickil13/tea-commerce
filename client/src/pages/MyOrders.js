import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import { OrderCard, Message, LoadingSpinner } from "../components";

export default function MyOrders() {
    const { orders, loading, error } = useSelector(
        (state) => state.ordersSlice
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listMyOrders());
    }, [dispatch]);

    return (
        <div>
            <h1 className="page-title">My Orders</h1>
            <div className="page-description">
                <p>All orders made. For more details, click the order card.</p>
            </div>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <div className="my-orders-container">
                    {orders.length > 0 ? (
                        orders.map((order) => {
                            return <OrderCard key={order._id} {...order} />;
                        })
                    ) : (
                        <Message>You have not placed any orders.</Message>
                    )}
                </div>
            )}
        </div>
    );
}
