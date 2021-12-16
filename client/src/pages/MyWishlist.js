import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../actions/userActions';
import { WishlistCard, Message, LoadingSpinner } from '../components';

export default function MyWishlist() {
    const {userProfile, userRemoveWishlist} = useSelector((state)=>state.user);
    const {user, loading} = userProfile;
    const {success: wishlistRemoveSuccess} = userRemoveWishlist;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserProfile());
    },[dispatch, wishlistRemoveSuccess])

    return (
        <div>
            <h1 className="page-title">My Wishlist</h1>
            <div className="page-description">
                <p>Things you want to try, or buy again!</p>
            </div>
            {user.wishlist && user.wishlist.length>0 ?<div className="wishlist-container">
                {loading ? <LoadingSpinner/> : <div className="profile-wishlist">
                     {user.wishlist.map((item)=>{
                        return(
                            <WishlistCard key={item._id} {...item}/>
                        )
                    })}
                </div>}
            </div>: <Message>You haven't added any items to your wishlist.</Message>}
        </div>
    )
}
