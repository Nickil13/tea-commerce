import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps } from "../components";
import { useHistory } from "react-router";
import { savePaymentMethod } from "../actions/userActions";

export default function Payment() {
    const { userPaymentMethod } = useSelector((state) => state.usersSlice);
    const [paymentMethod, setPaymentMethod] = useState(
        userPaymentMethod || "Stripe"
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    React.useEffect(() => {
        // Implementation to set preferred payment type for multiple payment options
        const radioBtns = document.querySelectorAll("input[name=payMethod]");
        for (let i = 0; i < radioBtns.length; i++) {
            const value = radioBtns[i].value;
            if (value === paymentMethod) {
                radioBtns[i].checked = true;
            }
        }
    }, [paymentMethod]);

    return (
        <div>
            <CheckoutSteps currentStepNum={3} />
            <h1 className="page-title">Payment Method</h1>
            <section className="payment-section">
                <form
                    className="payment-form"
                    id="payment-form"
                    onSubmit={handleSubmit}
                >
                    <div className="input-control">
                        <input
                            type="radio"
                            id="Stripe"
                            name="payMethod"
                            value="Stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="Stripe">Stripe</label>
                    </div>

                    <button type="submit" className="btn-secondary">
                        Submit
                    </button>
                </form>
            </section>
        </div>
    );
}
