import React, { useState, useEffect} from 'react'
import ShopCard from "../components/ShopCard";
import Breadcrumbs from "../components/Breadcrumbs";
import Banner from '../components/Banner';
import { useParams ,useHistory, useLocation} from 'react-router-dom';
import { teaProductCategories as categories} from '../resources/teaInfoData';
import { useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export default function Shop() {
    const dispatch = useDispatch();
    const productList = useSelector((state)=>state.products.productList);
 
    const {products, pages, page, loading, error} = productList;

    const{category,type} = useParams();
    const[shopButtons,setShopButtons] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const pageNumber = location.search.split('=')[1] || 1;
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("submitting form to search for item");
    }


    useEffect(()=>{
        dispatch(listProducts(category ? category : '',type ? type: '',pageNumber));
        updateShopButtons();
    },[category,type,pageNumber,dispatch])

    const updateShopButtons = () =>{
        let newShopButtons = [];
        if(category){
            newShopButtons = categories.filter((cat)=>cat.type === category.replace("-"," "))[0].items;
            
        }else{
            newShopButtons = categories.map((category)=>category.type);
        }
        setShopButtons(newShopButtons);
    }
    const handleShopButtonClick = (value) => {
        if(category){
            history.push(`/shop/${category}/${value}`);
        }else{
            history.push(`/shop/${value}`);
        }
       
    }
    const handleSelectFilter = (e) => {
        let value = e.target.value;
        history.push(`${location.pathname}?filter=${value}`);
    }
    return (
        <div>
            <Banner category={location.pathname.split('/')[2] ? location.pathname.split('/')[2] : 'all'}/>
            <Breadcrumbs path={location.pathname}/>
            
            <div className="filter-bar">
                <div className="shop-btns">
                    {shopButtons.length>0 && shopButtons.map((category,index)=>{
                        return(
                            <button key={index} className="btn" onClick={()=>handleShopButtonClick(category)}>{category}</button>
                        );
                        
                    })}
                </div>
                <Pagination page={page} pages={pages}/>
                {/* <div className="filter-select">
                    <select onChange={handleSelectFilter}>
                        <option value="" hidden></option>
                        <option value="alphabetical">Name (A-Z)</option>
                        <option value="popular">Popular</option>
                    </select>
                </div> */}
            </div>
            
            
            {loading ? <Loader/> : error ? <h2>Error!{error}</h2> :
                <div className="shop-list">
                {products.length>0 ? products.map((item,index)=>{
                    return (
                        <ShopCard key={index} item={item}/>
                    );
                }) : <h2>No items found.</h2>}
                </div>
            }
        </div>
    )
}
