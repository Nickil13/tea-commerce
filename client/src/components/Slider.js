import React, { useState, useEffect } from 'react'
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { BsChevronRight, BsChevronLeft} from 'react-icons/bs';


export default function Slider() {
    const[sliderIndex,setSliderIndex] = useState(0);
    const slideNum = 3;

    const handleSliderClick = (direction) =>{
        let nextIndex = sliderIndex + 1;
        if(direction==="left"){
            nextIndex = sliderIndex -1;
            if(nextIndex<0){
                nextIndex = slideNum-1;
            }
        }
        if(nextIndex>=slideNum){
            nextIndex=0;
        }
        setSliderIndex(nextIndex);
    }

    useEffect(()=>{
        let slider = setInterval(() => {
            let nextIndex = sliderIndex + 1;
            if(nextIndex>=slideNum) nextIndex = 0;
            setSliderIndex(nextIndex);
        }, 8000);
        return () => {
            clearInterval(slider);
        };
    },[sliderIndex])

    return (
        <div className="slider">
            <div className={`slide ${sliderIndex===0 && "slide-active"}`} style={{backgroundImage:"url('images/hero-loosetea.jfif')"}}>
                <div className="slide-content">
                <   h1 className="slide-title">Over 50 flavours of quality tea for you to enjoy!</h1>
                </div>
            </div>
                
            <div className={`slide ${sliderIndex===1 && "slide-active"}`} style={{backgroundImage:"url('images/hero-matcha.jpg')"}} id="matcha-slide">
                <div className="slide-content">
                    <h1 className="slide-title">Caffeinate and energize with our original and flavoured matcha</h1>
                    <button className="btn btn-primary">Shop Matcha</button>
                </div>
                
            </div>
            <div className={`slide ${sliderIndex===2 && "slide-active"}`} style={{backgroundImage:"url('images/hero-rooibos.jfif')"}} id="rooibos-slide">
                <div className="slide-content">
                    <h1 className="slide-title">Rooibos Americano</h1>
                    <p>A caffeine-free way to cool off at the end of your study session.</p>
                    <button className="btn btn-primary-orange">Order</button>
                </div>  
            </div>
            <ul className="slide-dots">
                <li onClick={()=>setSliderIndex(0)}>{sliderIndex===0 ? <FaCircle/> : <FaRegCircle/>}</li>
                <li onClick={()=>setSliderIndex(1)}>{sliderIndex===1 ? <FaCircle/> : <FaRegCircle/>}</li>
                <li onClick={()=>setSliderIndex(2)}>{sliderIndex===2 ? <FaCircle/> : <FaRegCircle/>}</li>
            </ul>
            <span className="slider-arrow arrow-left" onClick={()=>handleSliderClick("left")}><BsChevronLeft/></span>
            <span className="slider-arrow arrow-right" onClick={()=>handleSliderClick("right")}><BsChevronRight/></span>
        </div>
    )
}
