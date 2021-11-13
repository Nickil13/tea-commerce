import React, {useState,useEffect} from 'react'
import { useParams, useLocation, Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { createProductReview, getProductDetails, getTopProductReview } from '../actions/productActions';
import { CaffeineRating, Rating, Breadcrumbs, Message, BrewingStep } from '../components';
import Moment from 'react-moment';
import { useGlobalContext } from '../context';
import { FaHeart, FaRegHeart} from 'react-icons/fa';
import { addToWishlist, getUserProfile, addToCart} from '../actions/userActions';
import { WISHLIST_ADD_ITEM_RESET } from '../constants/userConstants';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { teaInfo } from '../resources/teaInfoData';
import { addToLocalCart } from '../actions/localCartActions';

export default function ProductProfile() {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isHigherQuantity, setIsHigherQuantity] = useState(false);
    const [message, setMessage] = useState("");
    const [cartItems, setCartItems] = useState([]);

    const{id} = useParams();
    const location = useLocation();

    const{showAlert} = useGlobalContext();
    const dispatch = useDispatch();

    const {productDetails, productCreateReview, productTopReview} = useSelector((state)=>state.products);
    const { success: reviewSuccess, error: reviewError} = productCreateReview;
    const{loading, error,product} = productDetails;
    const{topReview} = productTopReview;
    const tea = product.productType ? teaInfo.filter((tea)=>product.productType.split(" ").includes(tea.type))[0] : {};
    

    const {userProfile, userAddWishlist, userLogin} = useSelector((state)=>state.user);
    const {user} = userProfile;
    const {success: wishlistSuccess} = userAddWishlist;
    const reviewedByUser = (product.reviews && user) ? product.reviews.find((product)=>product.username === user.username) : false;

    const localCart = useSelector((state)=>state.localCart);
    const existsInCart = cartItems.find((item)=>item._id === id);
    
    
    useEffect(()=>{
        dispatch(getProductDetails(id));
        dispatch(getTopProductReview(id));
        // Once the user profile is successfully loaded, check the wishlist for the current product. Otherwise, fetch the user profile information.
        if(!userLogin.userInfo){
            setCartItems(localCart.cartItems);
        }else{
            if(user && user.username){
                checkWishlist();
                setCartItems(user.cartItems);
            }else{
                dispatch(getUserProfile());
            }   
    
            if(reviewSuccess){
                setRating(0);
                setComment('');
                dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
            }
            if(wishlistSuccess){
                dispatch({type: WISHLIST_ADD_ITEM_RESET});
                showAlert(product.name,'wishlist');
                dispatch(getUserProfile());
            }
        }
        
    },[user,id,localCart,reviewSuccess, wishlistSuccess,dispatch])


    const checkWishlist = () =>{
        if(user && user.wishlist){
            const wishlist = user.wishlist;
            const itemExists = wishlist.filter((item)=>item._id === id);
            if(itemExists.length===0){
                setIsInWishlist(false);
            }else{
                setIsInWishlist(true);
            }
        }
    }

    const handleAddToCart = () =>{
        //Check if the user typed in a value higher than the amount of product in stock.
        if(quantity>product.countInStock || quantity<0){
            setMessage("Not a valid quantity.");
        }else if(existsInCart && existsInCart.quantity + Number(quantity)>product.countInStock){
            setMessage(`Only ${product.countInStock-existsInCart.quantity} left in stock.`);
        
        }else{
            if(!userLogin.userInfo){
                dispatch(addToLocalCart(product._id,quantity));
            }else{
                dispatch(addToCart(product._id,quantity));
            }
            showAlert(product.name,'cart',quantity);
            setMessage("");
            setIsHigherQuantity(false);
            setQuantity(1);
            
        }
    }

    const handleHeartClick = () =>{
        dispatch((addToWishlist(id)));
    }

    const handleSubmitReview = (e) => {
        e.preventDefault();
        dispatch(createProductReview(id,{rating, comment}));
    }

    const handleQuantitySelect = (e) => {
        if(e.target.value<=10){
            setQuantity(e.target.value);
        }else if(e.target.value==="higher quantity"){
            setIsHigherQuantity(true);
        }
    }
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
                <div className="img-container">
                    <img src={product.image} alt={product.name}/>
                    {product.flavourImage &&
                    <div className="flavour-container">
                        <img src={product.flavourImage} alt={product.name} />
                    </div>}
                </div>
                
                <div className="product-profile-info">
                    <p>{product.description}</p>
                    <p><span>${product.price && product.price.toFixed(2)}</span> / 50g</p>

                    
                    {product.countInStock === 0 ? <span className="tag tag-not">product out of stock</span> : (existsInCart && Number(existsInCart.quantity)===Number(product.countInStock)) ? <p className="max-cart-message">You have added the max amount of this product to your cart.</p> :
                    <div className="product-btn-container">
                       {!isHigherQuantity ? <select name="qty" id="qty" className="product-quantity-select" value={quantity} onChange={handleQuantitySelect}>
                            {product.countInStock && [...Array(product.countInStock).keys()].slice(1,11).map((num, index)=>{
                                return(
                                    <option key={index} value={num}>{num}</option>
                                )
                            })}
                            {product.countInStock>10 &&
                            <option value="higher quantity">higher quantity</option>}
                       </select> :
                       <div className="product-quantity-input">
                           <input type="number" min="1" max={product.countInStock} onChange={(e)=>setQuantity(e.target.value)} /> <p>of {product.countInStock}</p>
                        </div>}    
                        <button className="btn-secondary" onClick={handleAddToCart}>Add to Cart</button>
                    </div>}
                    {message && <Message type="error">{message}</Message>}
                    {userLogin.userInfo && (!isInWishlist ? 
                        <div className="btn add-wishlist-btn" onClick={handleHeartClick}>
                            <span><FaRegHeart/></span>
                            <p>Add to wishlist</p>
                        </div> :
                        <div className="btn add-wishlist-btn wishlisted">
                            <span><FaHeart/></span>
                            <p>On your wishlist!</p>
                        </div> )}
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
            <section className="brewing-instruction-section section-wide">
                <h2>Brewing instructions</h2>
                <div className="brewing-steps">
                    {tea.brewingInstructions && tea.brewingInstructions.map((step, index)=>{
                        return(
                            <BrewingStep key={index} step={step}/>
                        )
                    })}
                </div>
            </section>
            <section className="review-section">
                <h2>Reviews</h2>
                <span>({product.reviews && product.reviews.length} review{product.reviews && product.reviews.length!==1 ? 's' : ''})</span>
                <div>
                    {product.reviews && product.reviews.length>0 ? <div className="average-rating">
                        <span>Average stars:</span>
                        <Rating value={product.rating}/>
                    </div> : <p className="product-not-reviewed">This product has not been reviewed yet!</p>}
                    <div className="product-review-list">
                        {topReview &&
                            <div className="product-review product-review-top">
                            <div className="review-info">
                                <div>
                                    <h3>{topReview.username}</h3>
                                    <div className="review-sub-info">
                                        <Rating value={topReview.rating}/>
                                        <span className="review-date">
                                            <Moment format="MMMM DD, YYYY" date={topReview.createdAt}/>
                                        </span>
                                    </div>
                                </div>  
                            </div>
                            <div className="review-description">
                                <p>{topReview.comment}</p>
                            </div>
                            </div>
                        }
                        {product.reviews && product.reviews.map((review)=>{
                            if(topReview && topReview._id === review._id){
                                return;
                            }
                            return(
                            <div key={review._id} className="product-review">
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
                        </div>);
                        })}
                    </div>
                </div>
                {reviewedByUser ? <p>You have already reviewed this product.</p>  : user ? <form onSubmit={handleSubmitReview} className="customer-review-form">
                    <h3>Write a Customer Review</h3>
                    <div className="input-control">
                        <label htmlFor="rating">Rating</label>
                        <select name="rating" id="rating" value={rating} onChange={(e)=>setRating(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="1">Poor</option>
                            <option value="2">Fair</option>
                            <option value="3">Good</option>
                            <option value="4">Very Good</option>
                            <option value="5">Excellent</option>
                        </select>
                    </div>
                    <div className="input-control">
                        <label htmlFor="comment">Comment</label>
                        <textarea rows="6" type="text" name="comment" id="comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    </div>
                    <button className="btn" type="submit">Submit</button>
                    {reviewError && <Message>{reviewError}</Message>}
                </form> : <p>Please <Link to="/login"><u>sign in</u></Link> to leave a review.</p>
                }
                
            </section></>}
        </div>
    )
}
