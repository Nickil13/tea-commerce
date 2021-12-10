import React from 'react';
import Moment from 'react-moment';
import { Rating } from '../components';
export default function ProductReview({review, topReview}) {

    return (
        <div className={`product-review ${topReview && 'product-review-top'}`}>
            <div className="review-info">
                <div>
                    <h3>{review.username}</h3>
                    <div className="review-sub-info">
                        <Rating value={review.rating}/>
                        <span className="review-date">
                            <Moment format="MMMM DD, YYYY" date={review.createdAt}/>
                        </span>
                    </div>              
                </div>
            </div>
            <div className="review-description">
                <p>{review.comment}</p>
            </div>
        </div>
    )
}
