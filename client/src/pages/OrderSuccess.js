import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCheckoutDetails } from "../actions/checkoutActions";
import { updateOrderToPaid } from "../actions/orderActions";
import { clearCartItems } from "../actions/userActions";
import { Message } from "../components";
import { checkoutDetailsReset } from "../reducers/checkoutSlice";

export default function OrderSuccess() {
    const {
        checkoutDetails: session,
        checkoutDetailsLoadedError,
        checkoutDetailsLoadedSuccess,
    } = useSelector((state) => state.checkoutSlice);

    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        if (checkoutDetailsLoadedSuccess) {
            //Pay order
            const paymentResult = {
                id: session.id,
                status: session.payment_status,
                customer_details: session.customer_details,
            };
            dispatch(updateOrderToPaid(id, paymentResult));

            //Clear the cart
            dispatch(clearCartItems());
            dispatch(checkoutDetailsReset());
        }

        if (!session.id) {
            dispatch(getCheckoutDetails(location.search.split("=")[1]));
        }
    }, [checkoutDetailsLoadedSuccess, dispatch, id, session, location]);

    if (checkoutDetailsLoadedError) {
        return (
            <div>
                <h1>Error loading the checkout details</h1>
                <Message>{checkoutDetailsLoadedError}</Message>
            </div>
        );
    }
    return (
        <div>
            <h1 className="page-title">Order Successful</h1>
            <div className="order-success-info">
                <p>Thank you for you order!</p>
                <p>
                    For status updates and order information,{" "}
                    <Link to="/account">check your orders</Link>.
                </p>
            </div>
        </div>
    );
}
