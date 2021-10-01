import React, { useState, useEffect ,useRef} from 'react'
import itemData from "../teaItemData";
import ShopCard from "../components/ShopCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { useParams ,useHistory} from 'react-router-dom';
import { FaSearch} from 'react-icons/fa';
import { teaProductCategories as categories} from '../teaInfoData';

export default function Shop() {
    const[pageInfo,setPageInfo] = useState({title:"All tea",image: "/images/chamomile.jpg",description:"",bannerColor:"lemonchiffon"});
    const[shopItems,setShopItems] = useState([]);
    const{category,type,id} = useParams();
    const[shopButtons,setShopButtons] = useState([]);
    const history = useHistory();

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("submitting form to search for item");
    }
    useEffect(()=>{
        fetchShopItems();
        updateShopButtons();
    },[category,type])

    // useEffect(()=>{
    //     //Load the shop items
    //     fetchShopItems();    
    // },[])

    const fetchShopItems = () => {
        let newItems = [];
        if(category){
            newItems = itemData.filter((item)=>item.category === category.replace("-"," "));

            if(type){
                newItems = newItems.filter((item)=>item.type === type.replace("-"," "));
            }
            
        }else{
            newItems = itemData;
        }
        setShopItems(newItems);
    }
    
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
        let formattedValue = value.replace(" ","-");
        if(category){
            history.push(`/shop/${category}/${formattedValue}`);
        }else{
            history.push(`/shop/${formattedValue}`);
        }
       
    }

    return (
        <main>
            <div className="hero shop-hero" style={{backgroundColor:`${pageInfo.bannerColor}`}}>
                <div className="shop-hero-info"
                >
                    <h1 className="shop-hero-title">{pageInfo.title}</h1>
                    <p>{pageInfo.description}</p>
                </div>
                <img className="fit-image"
                 src={pageInfo.image} alt="chamomile" />
            </div>
            
            <div className="shop-btns">
                {shopButtons.length>0 && shopButtons.map((category,index)=>{
                    return(
                        <button key={index} className="btn" onClick={()=>handleShopButtonClick(category)}>{category}</button>
                    );
                    
                })}
            </div>
            {/* {!category ? 
            <div className="shop-btns">
                {categories.map((category)=>{
                    return(
                        <button key={category.id} className="btn" onClick={()=>handleCategoryClick(category.type)}>{category.type}</button>
                    );
                    
                })}
            </div> :
            <div>
                {category.list.map((item,index)=>{
                    return(
                        <button key={index} className="btn" onClick={()=>handleTypeClick(item)}>{item}</button>
                    );
                    
                })}
            </div>} */}
            
            <div className="shop-list">
                {shopItems.length>0 ? shopItems.map((item,index)=>{
                    return (
                        <ShopCard key={index} item={item}/>
                    );
                }) : <h2>No items found.</h2>}
            </div>
        </main>
    )
}
