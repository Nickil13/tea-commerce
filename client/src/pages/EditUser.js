import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getUserDetails, updateUser} from '../actions/userActions';
import { useParams, useHistory } from 'react-router';
import { Loader, Message} from '../components';
import { UPDATE_USER_RESET } from '../constants/userConstants';

export default function EditUser() {
    const {userDetails, userUpdate} = useSelector((state)=>state.user);
    const {user,loading,error} = userDetails;
    const {success: updateSuccess} = userUpdate;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        if(updateSuccess){
            dispatch({type: UPDATE_USER_RESET});
            history.push('/admin/users');
        }else{
            if(!user.username || user._id !== id){
                dispatch(getUserDetails(id));
            }else{
                setUsername(user.username);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    },[id, user, updateSuccess, dispatch, history])


    const handleEditUser = (e) =>{
        e.preventDefault();
        dispatch(updateUser(user._id, {
            username,
            email,
            isAdmin
        }))
        
    }

    return (
        <div>
            <div className="page-title">
                <h1>Edit User</h1>
                <p>{user.username}</p>
            </div>
            
            {loading ? <Loader/> : error ? <Message>{error}</Message> :
            <form className="edit-profile-form" onSubmit={handleEditUser}>
                <div className="input-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div className="input-control">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="input-control checkbox-control">
                    <input type="checkbox" id="admin-checkbox" name="admin-checkbox" defaultChecked={user.isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}/>
                    <label htmlFor="admin-checkbox">Admin</label>
                    
                </div>
                
                <button type="submit" className="btn btn-primary">Edit</button>
            </form>
            }
        </div>
    )
}
