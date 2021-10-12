import React, { useState } from 'react'

export default function Payment() {
    const
    return (
        <div>
            <h1 className="payment-title">Payment Method</h1>
            <section className="payment-section">
                <form className="payment-form">
                    <div className="input-control">
                        <label htmlFor="cardType">Card Type</label>
                        <select name="cardType" id="cardType">
                            <option value="VISA">VISA</option>
                            <option value="Mastercard">Mastercard</option>
                            <option value="Debit">Debit</option>
                            <option value="Amex">Amex</option>
                        </select>
                    </div>
                    <div className="input-control">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="tel" name="cardNumber" maxLength="12"/>
                    </div>
                    <div className="input-control">
                        <label htmlFor="name">Name on Card</label>
                        <input type="text" name="name"/>
                    </div>
                </form>
                <button type="submit" className="btn-secondary">Submit</button>
            </section>
        </div>
    )
}
