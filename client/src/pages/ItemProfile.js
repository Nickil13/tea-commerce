import React, { useState, useEffect} from 'react'
import { useParams} from "react-router-dom";
import {useGlobalContext} from "../context";
import data from '../teaItemData';
export default function ItemProfile() {
    const{id} = useParams();
    const{getItem, addToCart} = useGlobalContext();
    const[item,setItem] = useState(null);

    useEffect(()=>{
        let newItem = data.filter((item)=>item.id === Number(id))[0];
        console.log(newItem);
        if(newItem){
            setItem(newItem);
        }else{
            setItem(null);
        }
    },[])

    if(!item){
        return <p>No item found.</p>
    }
    const {name,type,category,description,image,price,amount} = item;
    return (
        <main>
            <section style={{display:"grid",gridTemplateColumns:"1fr 1fr", gridTemplateRows: "2fr 1fr",width: "80%", margin:"0 auto"}}>
                <img className="fit-image" src={image} alt={name} style={{gridRow:"1",gridColumn:"1"}} />
                <div className="item-info" style={{gridRow:"1",gridColumn:"2",width:"80%",margin:"0 auto",textAlign:"center"}}>
                    <h2 style={{fontSize:"30px",textTransform:"capitalize",padding:"20px"}}>{name}</h2>
                    <p>{type}</p>
                    <p>caffeine: 0</p>
                    <p>{`$ ${price}/50g`}</p>
                </div>
                
                <p style={{gridRow:"2",gridColumn:"span 2",padding:"30px 0",maxWidth:"50ch",margin:"0 auto"}}>{description}</p>
                <button className="btn" style={{gridRow:"3",gridColumn:"span 2"}} onClick={()=>addToCart(item)}>Add to Cart</button>
            </section>
            <section>
                Brewing instructions
            </section>
            <section>
                Reviews
                <button>Review this product</button>
            </section>
        </main>
    )
}
