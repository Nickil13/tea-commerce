import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function Pagination({page, pages, modalPagination, setCurrentPage}) {
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

    const handlePreviousModalClick = () =>{
        const newPage = page-1;
        if(newPage>0){
            setCurrentPage(newPage);
        }
        
    }

    const handleNextModalClick = () =>{
        const newPage = page+1;
        if(newPage<=pages){
            setCurrentPage(newPage);
        }
        
    }

    if(modalPagination){
        return pages>1 &&(
            <div className="pagination">
                <ul className="page-indices">
                    <li className={(page-1>0) ?'active-page-btn' : ''} onClick={handlePreviousModalClick}>Previous</li>
                    {[...Array(pages).keys()].map((pageNum)=>{
                        return(
                            <li key={pageNum+1} className={`${Number(page)===(pageNum+1) && 'active-index'}`} onClick={()=>setCurrentPage(pageNum+1)}>
                                {pageNum +1}
                            </li>
                        );
                    })}
                    <li className={(page+1<=pages) ?'active-page-btn' : ''} onClick={handleNextModalClick}>Next</li>
                </ul>
            </div>
        )
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
