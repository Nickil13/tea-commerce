import React, { useState, useEffect ,useRef} from 'react'
import ShopCard from "../components/ShopCard";
import Breadcrumbs from "../components/Breadcrumbs";
import Banner from '../components/Banner';
import { useParams ,useHistory, useLocation} from 'react-router-dom';
import { FaSearch} from 'react-icons/fa';
import { teaProductCategories as categories} from '../resources/teaInfoData';
import { useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function Shop() {
    const dispatch = useDispatch();
    const productList = useSelector((state)=>state.products.productList);
    const {products, loading, error} = productList;

    const{category,type,id} = useParams();
    const[shopButtons,setShopButtons] = useState([]);
    const history = useHistory();
    const location = useLocation();

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("submitting form to search for item");
    }


    useEffect(()=>{
        dispatch(listProducts(category,type));
        updateShopButtons();
    },[category,type])

    
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
        // let formattedValue = value.replace(" ","-");
        if(category){
            history.push(`/shop/${category}/${value}`);
        }else{
            history.push(`/shop/${value}`);
        }
       
    }

    return (
        <div>
            <Banner category={location.pathname.split('/')[2] ? location.pathname.split('/')[2] : 'all'}/>
            
            <div className="shop-btns">
                {shopButtons.length>0 && shopButtons.map((category,index)=>{
                    return(
                        <button key={index} className="btn" onClick={()=>handleShopButtonClick(category)}>{category}</button>
                    );
                    
                })}
            </div>
            
            {loading ? <h2>Loading...</h2> : error ? <h2>Error!{error}</h2> :
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
