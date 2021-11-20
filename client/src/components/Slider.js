import React, { useState, useEffect } from 'react'
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { BsChevronRight, BsChevronLeft} from 'react-icons/bs';
import { useHistory } from 'react-router-dom';


export default function Slider() {
    const[sliderIndex,setSliderIndex] = useState(0);
    const slideNum = 3;
    const history = useHistory();

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
            <div className={`slide ${sliderIndex===0 && "slide-active"}`}>
                <img src="images/hero-loosetea.jfif" alt="black tea" />
                <div className="slide-content">
                <h1 className="slide-title">Over 50 flavours of quality tea for you to enjoy!</h1>
                </div>
            </div>
                
            <div className={`slide slide-darken ${sliderIndex===1 && "slide-active"}`} id="matcha-slide">
                <img src="images/hero-matcha.jpg" alt="matcha" />
                <div className="slide-content">
                    <h1 className="slide-title">Caffeinate and energize with our original and flavoured matcha</h1>
                    <button className="btn btn-primary" onClick={()=>history.push('/shop/matcha')}>Shop Matcha</button>
                </div>
                
            </div>
            <div className={`slide slide-darken ${sliderIndex===2 && "slide-active"}`} id="rooibos-slide">
                <img src="images/hero-rooibos.jfif" alt="rooibos iced" />
                <div className="slide-content">
                    <h1 className="slide-title">Rooibos Americano</h1>
                    <p>A caffeine-free way to cool off at the end of your study session.</p>
                    <button className="btn btn-primary-orange" onClick={()=>history.push('/shop/loose leaf/red tea')}>Shop Rooibos</button>
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
