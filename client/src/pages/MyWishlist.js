import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../actions/userActions';
import { WishlistCard } from '../components';

export default function MyWishlist() {
    const {userProfile, userRemoveWishlist} = useSelector((state)=>state.user);
    const {user} = userProfile;
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
            <div className="wishlist-container">
                <div className="profile-wishlist">
                    {user.wishlist && user.wishlist.length>0 && user.wishlist.map((item)=>{
                        return(
                            <WishlistCard key={item._id} {...item}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
