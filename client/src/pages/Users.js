import React, { useState,useEffect, useRef} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { AdminBar, DeleteConfirmation, LoadingSpinner, Message, Pagination, SearchBar } from '../components';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { listUsers} from '../actions/userActions';

export default function Users() {
    const[keyword, setKeyword] = useState('');
    const{isDeleteConfirmationShowing, showDeleteConfirmation} = useGlobalContext();
    const location = useLocation();
    const history = useHistory();
    const searchRef = useRef(null);
    const pageNumber = location.search.split('=')[1] || 1;
    const dispatch = useDispatch();
    const {userList, userDelete} = useSelector((state)=>state.user);
    const {users, pages, page, loading, error} = userList;
    const {success: successDelete} = userDelete;

    useEffect(()=>{
        dispatch(listUsers(pageNumber, keyword));
    } ,[pageNumber, successDelete, keyword, dispatch])

    const handleSearch = (e) =>{
        e.preventDefault();
        setKeyword(searchRef.current.value);
        history.push('/admin/users?page=1');
    }
   
    const handleResetSearch = () => {
        setKeyword('');
        searchRef.current.value = '';
        history.push('/admin/users?page=1');
    }

    const handleDelete = (id, name) => {
        showDeleteConfirmation(id,name,"user");
    }

    return (
        <div>
            <AdminBar/>
            <h1 className="page-title">Users</h1>
        
            <SearchBar handleSearch={handleSearch} searchRef={searchRef} placeholder={"filter users"} handleResetSearch={handleResetSearch}/>
            
            {loading ? <LoadingSpinner/> : error ? <Message>{error}</Message> : 
            <div className="search-container">
                {users && users.length>0 ?<table className="search-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>{
                            return(
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.isAdmin ? <span className="tag tag-admin">admin</span> : <span className="tag tag-user">user</span>}</td>
                                    <td><Link className="btn" to={`/admin/users/${user._id}/edit`}>Edit</Link></td>
                                    <td><button className="btn" onClick={()=>handleDelete(user._id, user.username)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> : <Message>No users found.</Message>}
            </div>}

            <Pagination page={page} pages={pages}/>

            {isDeleteConfirmationShowing && <DeleteConfirmation/>}
        </div>
    )
}
