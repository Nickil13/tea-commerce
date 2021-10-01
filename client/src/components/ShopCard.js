import React from 'react';
import { useGlobalContext } from '../context';
import { useHistory, useParams } from 'react-router-dom';

export default function ShopCard({item}) {
    const{addToCart} = useGlobalContext();
    const history = useHistory();
    const {category,type} = useParams();
    const{name,id,image,price} = item;

    const handleCardClick = () =>{
        let currentPath = history.location.pathname;
        if(category){
            if(type){
                history.push(`${currentPath}/${id}`);
            }else{
                history.push(`${currentPath}/${item.type.replace(" ","-")}/${id}`);
            }
            
        }else{
            history.push(`${currentPath}/${item.category.replace(" ","-")}/${item.type.replace(" ","-")}/${id}`);
        }
        
    }
    return (
        <div className="shop-card">
            <div className="img-container" onClick={handleCardClick}>
                <img className="fit-image" src={image} alt={name} />
                {item.flavourImage &&
                <div className="flavour-container">
                    <img className="fit-image" src={item.flavourImage} alt={name} />
                </div>}
            </div>
            <div className="card-info">
                <h2>{name}</h2>
                <p>{type}</p>
                <p>$ {price}/50g</p>
                <button className="btn btn-secondary"
                onClick={()=>{addToCart(item)}}>Add to Cart</button>
             </div>    
        </div>
    )
}
