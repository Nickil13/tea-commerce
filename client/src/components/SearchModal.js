import React, { useState, useEffect} from 'react';
import { GoSearch } from 'react-icons/go';
import { VscClose} from 'react-icons/vsc';
import { useGlobalContext } from '../context'
import {Pagination} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../actions/productActions';
import { Link} from 'react-router-dom';
import {Loader, Message} from './';
import { PRODUCT_SEARCH_RESET } from '../constants/productConstants';

export default function SearchModal() {
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const {closeSearchModal, isSearchModalOpen} = useGlobalContext();
    const dispatch = useDispatch();
    const {productSearch} = useSelector((state)=>state.products);
    const {products, pages, page, loading, error, success} = productSearch;
    
    useEffect(()=>{
        if(isSearchModalOpen){
            dispatch(searchProducts(keyword, currentPage));
        }
        // eslint-disable-next-line
    },[currentPage, isSearchModalOpen, keyword])

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(searchProducts(keyword, 1));
        setKeyword('');
    }

    const handleCloseSearch = () =>{
        closeSearchModal();
        dispatch({type: PRODUCT_SEARCH_RESET});
    }
    return (
        <>
        {isSearchModalOpen && <div className="search-modal-container">
            <div className="search-modal">
                <form onSubmit={handleSubmit}>
                    <div className="input-control">
                        <label htmlFor="search"><GoSearch className="search-btn-icon"/></label>
                        <input type="text" name="search" id="search" placeholder="enter a product name" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
                
                <button className="close-sidebar-btn"
                    onClick={handleCloseSearch}><VscClose/></button>
                {loading ? <Loader/> : error ? <Message>{error}</Message> : <div className="search-results">
                    {products && products.map((product)=>{
                        return(
                            <div key={product._id} className="search-result">
                                <Link to={`/shop/${product.category}/${product.productType}/${product._id}`} onClick={handleCloseSearch}>{product.name}</Link>
                            </div>
                        )
                    })}
                </div>}
                {(success && products.length===0) && <Message>No products found.</Message>}
                <div className="modal-pagination">
                    <Pagination page={page} pages={pages} modalPagination={true} setCurrentPage={setCurrentPage}/>
                </div>
                
            </div>
        </div>}
        <div className={isSearchModalOpen ? 'search-modal-overlay show' : 'search-modal-overlay'}>
        </div>
        </>
    )
}
