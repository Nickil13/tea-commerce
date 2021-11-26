import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { removeWishlistItem } from '../actions/userActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

export default function WishlistCard({_id, image, name, category, productType, flavourImage}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleWishlistRemoveItem = (id) =>{
        dispatch(removeWishlistItem(id));
    }

    return (
        <div className="wishlist-card">                  
            <div className="img-container" >
                <img src={image} alt={name} onClick={()=>history.push(`/shop/${category}/${productType}/${_id}`)}/>
                <span onClick={()=>handleWishlistRemoveItem(_id)} className="remove-wishlist-item-btn"><AiOutlineCloseCircle/></span>
            </div>
                                        
            {flavourImage &&
                <div className="flavour-container">
                    <img src={flavourImage} alt={name} />
                </div>} 

            <h3>{name}</h3>
            <span>{productType}</span>
        </div>
    )
}
