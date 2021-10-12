import React from 'react'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeCartItem } from '../actions/cartActions';
import { Link } from 'react-router-dom';

export default function CartCard({name,_id,productType,category,image,price,quantity,countInStock}) {
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
            <Link to={`/shop/${category}/${productType}/${_id}`}><img className="cart-image" src={image} alt={name} /></Link>
            <div className="cart-card-description">
                <h3>{name}</h3>
                <ul>
                    <li>{category} - {productType} </li>
                    <li>${price.toFixed(2)} / 50g</li>
                </ul>
                <div className="quantity-select">
                    <span>Quantity: </span>
                    <select onChange={handleSelectChange}>
                        <option value={quantity} hidden>{quantity}</option>
                        {[...Array(countInStock).keys()].map((amount,index)=>{
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
