import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeCartItem } from '../actions/cartActions';
import { Link } from 'react-router-dom';

export default function CartCard({name,_id,productType,category,image,price,quantity,flavourImage,countInStock}) {
    const total = (Number(price)*Number(quantity)).toFixed(2);

    const dispatch = useDispatch();

    const handleSelectChange = (e) =>{
        dispatch((updateCartItemQuantity(_id, e.target.value)));
    }

    const handleRemoveClick = () =>{
        dispatch((removeCartItem(_id)));
    }
    return (
        <article className="cart-card">
            <div className="img-container">
                <Link to={`/shop/${category}/${productType}/${_id}`}><img className="cart-image" src={image} alt={name} /></Link>
                {flavourImage &&<div className="flavour-container">
                    <img src={flavourImage} alt={name} />
                </div>}
            </div>
            
            <div className="cart-card-description">
                <h3>{name}</h3>
                <ul>
                    <li>{category} - {productType} </li>
                    <li>${price.toFixed()} / 50g</li>
                </ul>
                <div className="quantity-select">
                    <span>Quantity: </span>
                    <select onChange={handleSelectChange}>
                        <option value={quantity} hidden>{quantity}</option>
                        {[...Array(countInStock).keys()].slice(1,-1).map((amount,index)=>{
                            return(
                                <option key={index} value={amount}>{amount}</option>
                            )
                            })}
                    </select>
                </div>
                <div className="cart-card-total">
                    <p>total: <strong>${total}</strong> | {quantity*50}g</p>
                </div>
                <FaTimes onClick={handleRemoveClick}className="remove-item-btn"/>
            </div>
        </article>
    )
}
