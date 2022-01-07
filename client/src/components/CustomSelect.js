import React from 'react';

export default function CustomSelect({optionList, defaultOption,setValue,value}) {
 
    React.useEffect(()=>{
        const closeSelects = (ele)=>{
            let items = document.getElementsByClassName("select-items");
            let selectedItems = document.getElementsByClassName("select-selected");
            let listToHide = [];
            for(let i=0;i<selectedItems.length;i++){
                if(ele === selectedItems[i]){
                    listToHide.push(i);
                }else{
                    selectedItems[i].classList.remove("select-arrow-active");
                }
            }
            for(let i=0;i<items.length;i++){
                if(listToHide.indexOf(i)){
                    items[i].classList.add("select-hide");
                }
            }
        }
        document.addEventListener("click", closeSelects);
        
        return() =>{
            document.removeEventListener("click", closeSelects);
        }
    },[])
    
    const handleClickOption = (option) =>{
        setValue(option);
        document.getElementById("select-items").classList.toggle('select-hide');
        document.getElementById("selected-option").classList.toggle('select-arrow-active');
    }

    const handleClickSelect = (e) =>{
        e.stopPropagation();
        let items = document.getElementById("select-items");
        items.classList.toggle('select-hide');
        e.target.classList.toggle('select-arrow-active');
    }

    return (
        <div className="custom-select">
            <div id="selected-option" className="select-selected" onClick={handleClickSelect}>
                {value ? value : defaultOption}  
            </div>
            <div id="select-items" className="select-items select-hide">
                {optionList.map((option,index)=>{
                    return(
                        <div key={index} className={option===value ? 'select-item same-as-selected' : 'select-item'} onClick={()=>handleClickOption(option)}>{option}</div>
                    )
                })}
            </div>
        </div>
    )
}