import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Breadcrumbs({path,productName}) {
    const[breadcrumbs,setBreadcrumbs] = React.useState([]);
    const history = useHistory();
    
    React.useEffect(()=>{
        let crumbNames = path.split("/");

        if(productName){
            //Slice off the last crumb for the product ID so we can replace it with the product name
            crumbNames =  crumbNames.slice(1,crumbNames.length-1);
        }else{
            crumbNames =  crumbNames.slice(1,crumbNames.length);
        }
        
        
        // Use crumb names to determine paths for each link
        let crumbs = crumbNames.map((name)=>{
            let crumbIndex = path.split("/").indexOf(name);
            let crumbPath = path.split("/").slice(0,crumbIndex+1).join("/");
            
            return {name,url:crumbPath};
        })
        
        crumbs.unshift({name:"home", url:"/"});
       
        if(productName){
            crumbs.push({name:productName, url: path});
        }
        setBreadcrumbs(crumbs);
    },[path, productName])

    const handleClick = (breadcrumb) =>{
        history.push(breadcrumb.url);
    }
    return (
        <ul className="breadcrumbs">
            {breadcrumbs.map((breadcrumb,index)=>{
                return(
                  <li key={index} onClick={()=>handleClick(breadcrumb)}>
                      {breadcrumb.name}
                  </li>
                );
            })}
        </ul>
    )
}
