import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    CaffeineRating,
    Rating,
    Breadcrumbs,
    Message,
    BrewingStep,
    LoadingSpinner,
    ProductReview,
    CustomSelect,
} from "../components";

import { useGlobalContext } from "../context";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import {
    createProductReview,
    getProductDetails,
    getTopProductReview,
} from "../actions/productActions";
import {
    addToWishlist,
    getUserProfile,
    addToCart,
} from "../actions/userActions";
import { Helmet } from "react-helmet";
import { teaInfo } from "../resources/teaInfoData";
import { reviewComments } from "../resources/reviewComments";
import { addToLocalCart } from "../actions/localCartActions";
import { wishlistSuccessReset } from "../reducers/usersSlice";
import { productReviewReset } from "../reducers/productsSlice";

export default function ProductProfile() {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isHigherQuantity, setIsHigherQuantity] = useState(false);
    const [message, setMessage] = useState("");

    const { id } = useParams();
    const location = useLocation();

    const { showAlert } = useGlobalContext();
    const dispatch = useDispatch();

    const {
        product,
        productReviewAddedSuccess,
        addingProductReview,
        productReviewAddedError,
        topReview,
        loading,
        error,
    } = useSelector((state) => state.productsSlice);

    const { user, wishlistItemAddedSuccess, authenticated } = useSelector(
        (state) => state.usersSlice
    );
    const { cartItems: localCartItems } = useSelector(
        (state) => state.localCartSlice
    );

    const tea = product.productType
        ? teaInfo.filter((tea) =>
              product.productType.split(" ").includes(tea.type)
          )[0]
        : {};

    const reviewedByUser =
        product.reviews && user
            ? product.reviews.find((product) => product._id === user._id)
            : false;

    const existsInCart = authenticated
        ? user.cartItems.find((item) => item.Id === id)
        : localCartItems.find((item) => item._id === id);

    const checkWishlist = useCallback(() => {
        if (user && user.wishlist) {
            const wishlist = user.wishlist;
            const itemExists = wishlist.filter((item) => item._id === id);
            if (itemExists.length === 0) {
                setIsInWishlist(false);
            } else {
                setIsInWishlist(true);
            }
        }
    }, [user, id]);

    useEffect(() => {
        // If there is no product information, or the information is not correct, fetch the product.
        if (!product.name || product._id !== id) {
            dispatch(getProductDetails(id));
            dispatch(getTopProductReview(id));
        }

        // If the product was successfully reviewed, clear the form details
        if (productReviewAddedSuccess) {
            setRating(0);
            setComment("");
            dispatch(productReviewReset());
        }

        // If the user is authenticated but not yet loaded, load and check wishlist.
        if (authenticated) {
            checkWishlist();
            if (!user.username) {
                dispatch(getUserProfile());
            }
        }

        // If the wishlist item was added successfully, alert and reset success value;
        if (wishlistItemAddedSuccess) {
            dispatch(wishlistSuccessReset());
            showAlert(product.name, "wishlist");
        }
    }, [
        id,
        dispatch,
        authenticated,
        user,
        product,
        showAlert,
        checkWishlist,
        wishlistItemAddedSuccess,
        productReviewAddedSuccess,
    ]);

    const handleAddToCart = () => {
        //Check if the user typed in a value higher than the amount of product in stock.
        if (quantity > product.countInStock || quantity < 0) {
            setMessage("Not a valid quantity.");
        } else if (
            existsInCart &&
            existsInCart.quantity + Number(quantity) > product.countInStock
        ) {
            setMessage(
                `Only ${
                    product.countInStock - existsInCart.quantity
                } left in stock.`
            );
        } else {
            if (!authenticated) {
                dispatch(addToLocalCart(product._id, quantity));
            } else {
                dispatch(addToCart(product._id, quantity));
            }
            showAlert(product.name, "cart", quantity);
            setMessage("");
            setIsHigherQuantity(false);
            setQuantity(1);
        }
    };

    const handleAddToWishlistClick = () => {
        dispatch(addToWishlist(id));
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        const args = {
            id,
            review: {
                rating,
                comment,
            },
        };
        dispatch(createProductReview(args));
    };

    const handleQuantitySelect = (e) => {
        if (e.target.value <= 10) {
            setQuantity(e.target.value);
        } else if (e.target.value === "higher quantity") {
            setIsHigherQuantity(true);
        }
    };
    const handleSelectRating = (e) => {
        setRating(e.target.value);
        setComment("");
    };

    const upperCase = (str) => {
        if (str === undefined) return str;
        const strList = str.split(" ");
        let newStr = "";
        strList.forEach((str, index) => {
            newStr += str[0].toUpperCase() + str.substring(1);
            // If the str is not the last word in the list, add a space.
            if (index !== strList.length - 1) {
                newStr += " ";
            }
        });
        return newStr;
    };

    return (
        <div>
            <Helmet>
                <title>
                    {upperCase(product.name) || "Product"} | Tea-Commerce
                </title>
                <meta
                    name="description"
                    content="Cart with products and a total."
                />
            </Helmet>
            {loading ? (
                <div className="content-container">
                    <LoadingSpinner />
                </div>
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <div className="product-breadcrumbs">
                        <Breadcrumbs
                            path={location.pathname}
                            productName={product.name}
                        />
                    </div>
                    <section className="product-profile">
                        <div className="section-container">
                            <div className="title-box">
                                <h2>{product.name}</h2>
                                <span>{product.productType}</span>
                            </div>
                            <div className="img-container">
                                <img src={product.image} alt={product.name} />
                                {product.flavourImage && (
                                    <div className="flavour-container">
                                        <img
                                            src={product.flavourImage}
                                            alt={product.name}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="product-profile-info">
                                <p>{product.description}</p>
                                <p>
                                    <span>
                                        $
                                        {product.price &&
                                            product.price.toFixed(2)}
                                    </span>{" "}
                                    / 50g
                                </p>

                                {product.countInStock === 0 ? (
                                    <p>
                                        Sorry, this product is currently
                                        <u>out of stock.</u>
                                    </p>
                                ) : existsInCart &&
                                  Number(existsInCart.quantity) ===
                                      Number(product.countInStock) ? (
                                    <p className="max-cart-message">
                                        You have added the max amount of this
                                        product to your cart.
                                    </p>
                                ) : (
                                    <div className="product-btn-container">
                                        {!isHigherQuantity ? (
                                            <select
                                                name="qty"
                                                id="qty"
                                                className="product-quantity-select"
                                                value={quantity}
                                                onChange={handleQuantitySelect}
                                            >
                                                {product.countInStock &&
                                                    [
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys(),
                                                    ]
                                                        .slice(0, 11)
                                                        .map((num, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        num + 1
                                                                    }
                                                                >
                                                                    {num + 1}
                                                                </option>
                                                            );
                                                        })}
                                                {product.countInStock > 10 && (
                                                    <option value="higher quantity">
                                                        higher quantity
                                                    </option>
                                                )}
                                            </select>
                                        ) : (
                                            <div className="product-quantity-input">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={product.countInStock}
                                                    onChange={(e) =>
                                                        setQuantity(
                                                            e.target.value
                                                        )
                                                    }
                                                />{" "}
                                                <p>of {product.countInStock}</p>
                                            </div>
                                        )}
                                        <button
                                            className="btn-secondary"
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                )}
                                {message && (
                                    <Message type="error">{message}</Message>
                                )}
                                {authenticated &&
                                    (!isInWishlist ? (
                                        <div
                                            className="btn add-wishlist-btn"
                                            onClick={handleAddToWishlistClick}
                                        >
                                            <span>
                                                <FaRegHeart />
                                            </span>
                                            <p>Add to wishlist</p>
                                        </div>
                                    ) : (
                                        <div className="btn add-wishlist-btn wishlisted">
                                            <span>
                                                <FaHeart />
                                            </span>
                                            <p>On your wishlist!</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </section>

                    <section className="profile-ingredients">
                        <h2>Ingredients</h2>
                        <CaffeineRating
                            productType={
                                product.category === "tea mixes"
                                    ? product.ingredients.find((ingredient) =>
                                          ingredient.includes("tea")
                                      )
                                    : product.productType
                            }
                        />
                        <ul>
                            {product.ingredients &&
                                product.ingredients.length > 0 &&
                                product.ingredients.map((ingredient, index) => {
                                    return <li key={index}>{ingredient}</li>;
                                })}
                        </ul>
                    </section>
                    <section className="brewing-instruction-section">
                        <h2>Brewing instructions</h2>
                        <div className="brewing-steps">
                            {tea.brewingInstructions &&
                                tea.brewingInstructions.map((step, index) => {
                                    return (
                                        <BrewingStep
                                            key={index}
                                            step={step}
                                            index={index}
                                        />
                                    );
                                })}
                        </div>
                    </section>

                    <section className="review-section">
                        <div className="section-container">
                            <h2>Reviews</h2>
                            <span>
                                ({product.reviews && product.reviews.length}{" "}
                                review
                                {product.reviews && product.reviews.length !== 1
                                    ? "s"
                                    : ""}
                                )
                            </span>
                            <div>
                                {product.reviews &&
                                product.reviews.length > 0 ? (
                                    <div className="average-rating">
                                        <span>Average stars:</span>
                                        <Rating value={product.rating} />
                                    </div>
                                ) : (
                                    <p className="product-not-reviewed">
                                        This product has not been reviewed yet!
                                    </p>
                                )}
                                <div className="product-review-list">
                                    {topReview && (
                                        <ProductReview
                                            review={topReview}
                                            topReview
                                        />
                                    )}
                                    {product.reviews &&
                                        product.reviews
                                            .filter(
                                                (r) =>
                                                    topReview &&
                                                    r._id !== topReview._id
                                            )
                                            .slice(0)
                                            .reverse()
                                            .map((review) => {
                                                return (
                                                    <ProductReview
                                                        key={review._id}
                                                        review={review}
                                                    />
                                                );
                                            })}
                                </div>
                            </div>
                            {reviewedByUser ? (
                                <p>You have already reviewed this product.</p>
                            ) : authenticated ? (
                                <form
                                    onSubmit={handleSubmitReview}
                                    className="customer-review-form"
                                >
                                    <h3>Write a Customer Review</h3>
                                    <div className="input-control">
                                        <label htmlFor="rating">Rating</label>
                                        <select
                                            name="rating"
                                            id="rating"
                                            value={rating}
                                            onChange={handleSelectRating}
                                        >
                                            <option value="" hidden>
                                                Select...
                                            </option>
                                            <option value="1">Poor</option>
                                            <option value="2">Fair</option>
                                            <option value="3">Good</option>
                                            <option value="4">Very Good</option>
                                            <option value="5">Excellent</option>
                                        </select>
                                    </div>
                                    {user.role === "admin" ? (
                                        <div className="input-control">
                                            <label htmlFor="comment">
                                                Comment
                                            </label>
                                            <textarea
                                                rows="6"
                                                type="text"
                                                name="comment"
                                                id="comment"
                                                value={comment}
                                                onChange={(e) =>
                                                    setComment(e.target.value)
                                                }
                                            />
                                        </div>
                                    ) : (
                                        rating !== 0 && (
                                            <div className="input-control">
                                                <label htmlFor="comment">
                                                    Comment
                                                </label>
                                                <p>
                                                    *In order to regulate
                                                    comments for this personal
                                                    website, select your
                                                    favourite from the dropdown!
                                                </p>
                                                <CustomSelect
                                                    optionList={
                                                        reviewComments.find(
                                                            (comment) =>
                                                                Number(
                                                                    comment.rating
                                                                ) ===
                                                                Number(rating)
                                                        ) &&
                                                        reviewComments.find(
                                                            (comment) =>
                                                                Number(
                                                                    comment.rating
                                                                ) ===
                                                                Number(rating)
                                                        ).comments
                                                    }
                                                    defaultOption="Select a comment"
                                                    value={comment}
                                                    setValue={setComment}
                                                />
                                            </div>
                                        )
                                    )}

                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                    {productReviewAddedError ? (
                                        <Message>
                                            {productReviewAddedError}
                                        </Message>
                                    ) : (
                                        addingProductReview && (
                                            <LoadingSpinner />
                                        )
                                    )}
                                </form>
                            ) : (
                                <p>
                                    Please{" "}
                                    <Link to="/login">
                                        <u>log in</u>
                                    </Link>{" "}
                                    to leave a review.
                                </p>
                            )}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
