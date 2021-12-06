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
    },[])

    useEffect(()=>{
        dispatch(getUserProfile())
    },[wishlistRemoveSuccess])

    return (
        <div>
            <h1 className="page-title">My Wishlist</h1>
            <div className="page-description">
                <p>Things you want to try, or buy again!</p>
            </div>
            <div className="wishlist-container">
                {loading ? <LoadingSpinner/> : <div className="profile-wishlist">
                    {user.wishlist && user.wishlist.length>0 ? user.wishlist.map((item)=>{
                        return(
                            <WishlistCard key={item._id} {...item}/>
                        )
                    }) : <Message>You haven't added any items to your wishlist.</Message>}
                </div>}
            </div>
        </div>
    )
}
