import React from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addToCart } from '../actions/userActions';
import { useGlobalContext } from '../context';

export default function ShopCard({item}) {
    const history = useHistory();
    const{showAlert} = useGlobalContext();
    const{name,category,productType,_id,image,price} = item;

    const dispatch = useDispatch();

    const handleAddToCart = () =>{
        dispatch((addToCart(item._id,1)));
        showAlert(item.name,'cart',1);
    }
    const handleCardClick = () =>{
        history.push(`/shop/${category}/${productType}/${_id}`);
    }

    return (
        <div className="shop-card">
            <div className="img-container" onClick={handleCardClick}>
                <img src={image} alt={name} />
                {item.flavourImage &&
                <div className="flavour-container">
                    <img src={item.flavourImage} alt={name} />
                </div>}
            </div>
            <div className="card-info">
                <h3>{name}</h3>
                <p>{productType}</p>
                <p><span>${price.toFixed(2)}</span> / 50g</p>
                <button className="btn-secondary"
                onClick={handleAddToCart}>Add to Cart</button>
             </div>    
        </div>
    )
}
