import React from 'react'
import { teaProductCategories as categories} from '../resources/teaInfoData';

export default function Banner({category}) {
    const categoryInfo = categories.filter((tea)=>tea.type === category)[0];
    const{ type: name, image, bannerColor, description } = categoryInfo;
    
    return (
        <div className="hero shop-hero" style={{backgroundColor:bannerColor}}>
            <div className="shop-hero-info">
                <h1 className="shop-hero-title">{name}</h1>
                <p>{description}</p>
            </div>
            <img src={image} alt={name} />
        </div>
    )
}

