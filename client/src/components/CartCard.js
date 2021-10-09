import React from 'react'

export default function CartCard({name,type,category,image,price,countInStock}) {
    return (
        <article className="cart-card">
            <img className="cart-image fit-image"src={image} alt={name} />
            <div className="cart-item-description">
                <h2>{name}</h2>
                <ul>
                    <li>{type}</li>
                    <li>{category}</li>
                    <li>${price}</li>
                </ul>
            </div>
            <div className="item-amount-info">
                <div>
                    <span>plus</span>
                    <p>{countInStock}</p>
                    <span>minus</span>
                </div>
                <button>Remove Item</button>
            </div>
        </article>
    )
}
