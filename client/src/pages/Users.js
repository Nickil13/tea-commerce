import React, { useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { listUsers } from '../actions/userActions';
import { Loader, Message } from '../components';

export default function Orders() {
    const dispatch = useDispatch();
    const {userList} = useSelector((state)=>state.user);
    const {users, loading, error} = userList;

    useEffect(()=>{
        dispatch(listUsers());
    }, [])

    return (
        <div>
            <h1>Users</h1>
            {loading && <Loader/>}
            {error && <Message>{error}</Message>}
            <div>
                {users.length>0 && users.map((user)=>{
                    return(
                        <div key={user._id}>
                            {user.username}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
