import React, { useState,useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { GoSearch } from 'react-icons/go';
import { IoRefreshSharp } from 'react-icons/io5';
import { DeleteConfirmation, Loader, Message, Pagination } from '../components';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { listUsers} from '../actions/userActions';

export default function Users() {
    const[keyword, setKeyword] = useState('');
    const{isDeleteConfirmationShowing, showDeleteConfirmation} = useGlobalContext();
    const location = useLocation();
    const history = useHistory();
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
        dispatch(listUsers(pageNumber, keyword));
        history.push('/admin/users?page=1');
    }
   
    const handleResetSearch = () => {
        setKeyword('');
        dispatch(listUsers(pageNumber, ''));
        history.push('/admin/users?page=1');
    }

    const handleDelete = (id, name) => {
        showDeleteConfirmation(id,name,"user");
    }

    return (
        <div>
            <div className="admin-bar">
                <div className="admin-links">
                    <Link className="btn btn-primary" to="/admin/orders">Orders</Link>
                    <Link className="btn btn-primary" to="/admin/users"> Users</Link>
                    <Link className="btn btn-primary" to="/admin/products">Products</Link>
                </div> 
            </div>
                
            <h1 className="page-title">Users</h1>
        
            <div className="search-bar">
                <form className="search-bar" onSubmit={handleSearch}>
                    <label className="search-icon" htmlFor="search"><GoSearch/></label>
                    <input type="text" placeholder="filter users" value={keyword} onChange={(e)=>setKeyword(e.target.value)} />
                    <IoRefreshSharp className="search-icon"  onClick={handleResetSearch}/>
                </form>
            </div>
            {loading ? <Loader/> : error ? <Message>{error}</Message> : 
            <div className="search-container">
                <table className="search-table">
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
                        {users && users.length>0 && users.map((user)=>{
                            return(
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.isAdmin ? <span className="tag tag-admin">admin</span> : <span className="tag tag-user">user</span>}</td>
                                    <td><Link className="btn" to={`/admin/user/${user._id}/edit`}>Edit</Link></td>
                                    <td><button className="btn" onClick={()=>handleDelete(user._id, user.username)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 
            </div>}

            <Pagination page={page} pages={pages}/>

            {isDeleteConfirmationShowing && <DeleteConfirmation/>}
        </div>
    )
}
