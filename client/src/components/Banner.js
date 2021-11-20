import React from 'react'
import { teaProductCategories as categories, teaProductTypes as productTypes} from '../resources/teaInfoData';

export default function Banner({category, productType}) {
    const categoryInfo = categories.filter((tea)=>tea.type === category)[0];
    const{ type: name, image, bannerColor, description } = categoryInfo;
    
    if(productType){
        const productInfo = productTypes.filter((tea)=>tea.type === productType)[0];
        return(
            <div className="shop-hero" style={{backgroundColor:productInfo.bannerColor}}>
                <img src={productInfo.image} alt={productInfo.type} />
                <div className="shop-hero-info">
                    <h1 className="shop-hero-title">{productInfo.type}</h1>
                    <p>{productInfo.description}</p>
                </div>
        </div>
        )
    }

    return (
        <div className="shop-hero" style={{backgroundColor:bannerColor}}>
            <img src={image} alt={name} />
            <div className="shop-hero-info">
                <h1 className="shop-hero-title">{name}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

