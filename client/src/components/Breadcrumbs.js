import React from 'react'

export default function Breadcrumbs({location}) {
    const[breadcrumbs,setBreadcrumbs] = React.useState([]);
    
    React.useEffect(()=>{
        let crumbs = location.substring(1,location.length-1).split("/");
        crumbs.unshift("home");
        setBreadcrumbs(crumbs);
    },[])
    return (
        <ul className="breadcrumbs">
            {breadcrumbs.map((breadcrumb,index)=>{
                return(
                  <li key={index}>
                      {breadcrumb}
                  </li>  
                );
            })}
        </ul>
    )
}
