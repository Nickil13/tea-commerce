import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addToCart } from '../actions/cartActions';
export default function ShopCard({item}) {
    const history = useHistory();
    // const {category,type} = useParams();
    const{name,category,productType,_id,image,price} = item;

    const dispatch = useDispatch();

    const handleAddToCart = () =>{
        dispatch((addToCart(item.id,1)));
    }
    const handleCardClick = () =>{
        history.push(`/shop/${category}/${productType}/${_id}`);
        // let currentPath = history.location.pathname;
        // console.log(currentPath);
        // if(category){
        //     if(type){
        //         history.push(`${currentPath}${id}`);
        //     }else{
        //         history.push(`${currentPath}${item.type}/${id}`);
        //     }
            
        // }else{
        //     history.push(`${currentPath}/${item.category}/${item.type}/${id}`);
        // }
        
    }
    return (
        <div className="shop-card">
            <div className="img-container" onClick={handleCardClick}>
                <img src={image} alt={name} />
                {item.flavourImage &&
                <div className="flavour-container">
                    <img className="fit-image" src={item.flavourImage} alt={name} />
                </div>}
            </div>
            <div className="card-info">
                <h2>{name}</h2>
                <p>{productType}</p>
                <p>$ {price.toFixed(2)}/50g</p>
                <button className="btn btn-secondary"
                onClick={handleAddToCart}>Add to Cart</button>
             </div>    
        </div>
    )
}
