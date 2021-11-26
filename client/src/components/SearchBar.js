import React from 'react'
import { GoSearch } from 'react-icons/go';
import { IoRefreshSharp } from 'react-icons/io5';

export default function SearchBar({handleSearch, searchRef, placeholder, handleResetSearch}) {
    return (
        <div className="search-bar">
            <form className="search-bar-form" onSubmit={handleSearch}>
                <label className="search-icon" htmlFor="search"><GoSearch/></label>
                <input type="text" placeholder={placeholder} ref={searchRef}/>
                    <IoRefreshSharp className="search-icon"  onClick={handleResetSearch}/>
            </form>
                
        </div>
    )
}
