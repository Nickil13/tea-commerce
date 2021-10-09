import React, {useEffect} from 'react'
import { useParams, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { getProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import CaffeineRating from '../components/CaffeineRating';
import Rating from '../components/Rating';
import Breadcrumbs from '../components/Breadcrumbs';
import { useGlobalContext } from '../context';

export default function ProductProfile() {
    const{showAlert} = useGlobalContext();
    const dispatch = useDispatch();
    const productDetails = useSelector((state)=>state.products.productDetails);
    const location = useLocation();
    const{loading, error,product} = productDetails;
    
    const{id} = useParams();
    
    const handleAddToCart = () =>{
        dispatch((addToCart(product._id,1)));
        showAlert(product.name,'cart',1);
    }

    useEffect(()=>{
        dispatch(getProductDetails(id));
    },[dispatch])

    return (
        <div>
            {loading ? <h2>Loading...</h2> : error ? <h2>Error! {error}</h2>  : <>
            <div className="product-breadcrumbs">
                <Breadcrumbs path={location.pathname} productName={product.name}/>
            </div>
            <section className="product-profile">
                
                <div className="title-box">
                    <h2>{product.name}</h2>
                    <span>{product.productType}</span>
                </div>
                <img src={product.image} alt={product.name}/>
                <div className="product-profile-info">
                    <p>{product.description}</p>
                    <p><span>${product.price && product.price.toFixed(2)}</span> / 50g</p>
                    <button className="btn-secondary" onClick={handleAddToCart}>Add to Cart</button>
                </div>
                
                
            </section>
            <section className="profile-ingredients">
                <h2>Ingredients</h2>
                <CaffeineRating productType={product.teaMixBase ? product.teaMixBase : product.productType}/>
                <ul>{product.ingredients && product.ingredients.length>0 && product.ingredients.map((ingredient,index)=>{
                    return(
                        <li key={index}>{ingredient}</li>
                    )
                })}</ul>
            </section>
            <section className="brewing-instruction-section">
                <h2>Brewing instructions</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe blanditiis architecto repudiandae impedit dolorum doloremque, iste quae numquam quibusdam doloribus deserunt veniam beatae sapiente, in dolore totam eveniet quisquam nemo facere veritatis culpa a. Sequi labore fugit temporibus praesentium dolore.</p>
            </section>
            <section className="review-section">
                <h2>Reviews</h2>
                <span>41 total reviews</span>
                <div>
                    <div className="average-rating">
                        <span>Average stars:</span>
                        <Rating value={3.5}/>
                    </div>
                    <div className="product-review-list">

                        <div className="product-review product-review-top">
                            <div className="review-info">
                                <div className="user-thumbnail"><img src="/images/user-picture.jfif" alt="" /></div>
                                <div>
                                    <h3>{"Nina<3Tea"}</h3>
                                    <Rating value={5}/>
                                </div>  
                            </div>
                            <div className="review-description">
                                <p>My absolute favourite tea! I love how the rose is subtle and doesn't overpower the white tea.</p>
                            </div>
                        </div>
                        <div className="product-review">
                            <div className="review-info">
                                <div className="user-thumbnail"><img src="/images/user-picture.jfif" alt="" /></div>
                                <div>
                                    <h3>{"Nina<3Tea"}</h3>
                                    <Rating value={5}/>
                                </div>
                            </div>
                            <div className="review-description">
                            <p>My absolute favourite tea! I love how the rose is subtle and doesn't overpower the white tea.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn">Review this product</button>
            </section></>}
        </div>
    )
}
