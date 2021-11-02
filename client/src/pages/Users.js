import React, { useState,useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { listProducts, searchProducts, getProducts } from '../actions/productActions';
import { GoSearch } from 'react-icons/go';
import { IoRefreshSharp } from 'react-icons/io5';
import { DeleteConfirmation, Loader, Message, Pagination } from '../components';
import { teaProductCategories } from '../resources/teaInfoData';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { listUsers } from '../actions/userActions';

export default function Users() {
    const[keyword, setKeyword] = useState('');
    const{isDeleteConfirmationShowing, showDeleteConfirmation} = useGlobalContext();
    const location = useLocation();
    const history = useHistory();
    const pageNumber = location.search.split('=')[1] || 1;
    const dispatch = useDispatch();
    const {userList} = useSelector((state)=>state.user);
    const {users, pages, page, loading, error} = userList;

    useEffect(()=>{
        dispatch(listUsers(pageNumber, keyword));
    } ,[pageNumber])

    // useEffect(()=>{
    //     dispatch(getProducts(category==="all" ? "" : category,productType,pageNumber, keyword));
    // }, [pageNumber, category, productType, successDelete])

    // useEffect(()=>{
    //     history.push('/admin/products?page=1');
    // }, [category, productType])

    const handleSearch = (e) =>{
        // e.preventDefault();
        // dispatch(getProducts(category==="all" ? "" : category,productType, 1, keyword));
        // history.push('/admin/products?page=1');
    }
   
    const handleResetSearch = () => {
        // setKeyword('');
        // setCategory('all');
        // setProductType('');
        // dispatch(getProducts(category==="all" ? "" : category,productType, 1, keyword));
        // history.push('/admin/products?page=1');
    }

    const handleDelete = (id, name) => {
        // Show delete confirmation
        showDeleteConfirmation(id,name,"product");
    }
    return (
        <div className="products-page">
            
                <div className="admin-bar">
                    <div className="admin-links">
                        <Link className="btn btn-primary" to="/admin/orders">Orders</Link>
                        <Link className="btn btn-primary" to="/admin/users"> Users</Link>
                        <Link className="btn btn-primary" to="/admin/products">Products</Link>
                    </div> 
                </div>
                
            <h1 className="products-title">Users</h1>
            <button className="btn btn-primary" onClick={()=>history.push('/admin/products/add')}>Create a new product</button>
            <div className="product-bar">
                <form className="product-search-bar" onSubmit={handleSearch}>
                    <label className="search-icon" htmlFor="search"><GoSearch/></label>
                    <input type="text" placeholder="filter products" value={keyword} onChange={(e)=>setKeyword(e.target.value)} />
                    <IoRefreshSharp className="search-icon"  onClick={handleResetSearch}/>
                </form>
            </div>
            {loading ? <Loader/> : error ? <Message>{error}</Message> : 
            <div className="search-products-container">
            <table className="search-products">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length>0 && users.map((user)=>{
                        return(
                            <tr>{user.name}</tr>
                            // <tr key={product._id}>
                            //     <td>{product._id}</td>
                            //     <td>{product.name}</td>
                            //     <td>{product.category}</td>
                            //     <td>{product.productType}</td>
                            //     <td>{product.countInStock}</td>
                            //     <td><Link className="btn" to={`/admin/products/${product._id}/edit`}>Edit</Link></td>
                            //     <td><button className="btn" onClick={()=>handleDelete(product._id, product.name)}>Delete</button></td>
                            // </tr>
                        )
                    })}
                </tbody>
            </table> </div>}
            <Pagination page={page} pages={pages}/>
            {isDeleteConfirmationShowing && <DeleteConfirmation/>}
        </div>
    )
}
