import React, { useState, useEffect, useRef} from 'react';
import { ShopCard, Breadcrumbs, Banner, SearchBar, Message} from '../components';
import { useParams ,useHistory, useLocation} from 'react-router-dom';
import { teaProductCategories as categories} from '../resources/teaInfoData';
import { useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';


export default function Shop() {
    const dispatch = useDispatch();
    const productList = useSelector((state)=>state.products.productList);
    const [keyword, setKeyword] = useState('');
    const {products, pages, page, loading, error} = productList;

    const{category,type} = useParams();
    const[shopButtons,setShopButtons] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const pageNumber = location.search.split('=')[1] || 1;
    const searchRef = useRef(null);
    
  
    useEffect(()=>{
        dispatch(listProducts(category ? category : '',type ? type: '',pageNumber,keyword));
        updateShopButtons();
    },[category,type,pageNumber,keyword,dispatch])

    const updateShopButtons = () =>{
        let newShopButtons = [];
        if(category){
            newShopButtons = categories.filter((cat)=>cat.type === category.replace("-"," "))[0].items;
            
        }else{
            newShopButtons = categories.map((category)=>category.type);
        }

        setShopButtons(newShopButtons.filter((btn)=>btn!=="all"));
    }

    const handleShopButtonClick = (value) => {
        if(category){
            history.push(`/shop/${category}/${value}`);     
        }else{
            history.push(`/shop/${value}`);      
        }
       
    }
    const handleSearch = (e) =>{
        e.preventDefault();
        setKeyword(searchRef.current.value);
        history.push(`${location.pathname}?page=1`);
    }

    const handleResetSearch = () =>{
        setKeyword('');
        searchRef.current.value = '';
        history.push(`${location.pathname}?page=1`);
    }
    
    return (
        <div>
            <Banner category={category ? category : 'all'} productType={type ? type : ''}/>
            <Breadcrumbs path={location.pathname}/>
            
            <div className="filter-bar">
                <SearchBar handleSearch={handleSearch} searchRef={searchRef}placeholder={"product name"} handleResetSearch={handleResetSearch}/>
                <div className="shop-btns">
                    {shopButtons.length>0 && shopButtons.map((category,index)=>{
                        return(
                            <button key={index} className="btn" onClick={()=>handleShopButtonClick(category)}>{category}</button>
                        );
                        
                    })}
                </div>
                <Pagination page={page} pages={pages}/>
            </div>
            
            
            {loading ? <LoadingSpinner/> : error ? <Message>{error}</Message> :
                <div className="shop-list">
                {products.length>0 ? products.map((item,index)=>{
                    return (
                        <ShopCard key={index} item={item}/>
                    );
                }) : <Message>No items found.</Message>}
                </div>
            }
        </div>
    )
}
