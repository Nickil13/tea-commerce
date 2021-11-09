import React from 'react'
import {FaStar, FaRegStar, FaStarHalfAlt} from 'react-icons/fa';

export default function Rating({value, numReviews, text}) {
    return (
        <div className="star-rating-container">
            <ul className="star-rating">
                <li>{value>0 ? value===0.5 ? <FaStarHalfAlt/> : <FaStar/> : <FaRegStar/>}</li>
                <li>{value>1 ? value===1.5 ? <FaStarHalfAlt/> : <FaStar/> : <FaRegStar/>}</li>
                <li>{value>2 ? value===2.5 ? <FaStarHalfAlt/> : <FaStar/> : <FaRegStar/>}</li>
                <li>{value>3 ? value===3.5 ? <FaStarHalfAlt/> : <FaStar/> : <FaRegStar/>}</li>
                <li>{value>4 ? value===4.5 ? <FaStarHalfAlt/> : <FaStar/> : <FaRegStar/>}</li>
            </ul>
            {text && (<p>{value}/5 ({numReviews})</p>)}
        </div>
        
    )
}
