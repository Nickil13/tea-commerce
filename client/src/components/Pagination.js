import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function Pagination({page, pages}) {
    const location = useLocation();
    const history = useHistory();
    
    const handlePreviousClick = () =>{
        const newPage = page-1;
        if(newPage>0){
            history.push(`${location.pathname}?page=${newPage}`);
        }
        
    }

    const handleNextClick = () =>{
        const newPage = page+1;
        if(newPage<=pages){
            history.push(`${location.pathname}?page=${newPage}`);
        }
        
    }

    return pages>1 &&(
        <div className="pagination">
            <ul className="page-indices">
                <li className={(page-1>0) ?'active-page-btn' : ''} onClick={handlePreviousClick}>Previous</li>
                {[...Array(pages).keys()].map((pageNum)=>{
                    return(
                        <Link key={pageNum+1} to={`${location.pathname}?page=${pageNum+1}`} className="index-link">
                        <li className={`${Number(page)===(pageNum+1) && 'active-index'}`}>
                            {pageNum +1}
                        </li>
                    </Link>);
                })}
                <li className={(page+1<=pages) ?'active-page-btn' : ''} onClick={handleNextClick}>Next</li>
            </ul>
        </div>
    )
}
