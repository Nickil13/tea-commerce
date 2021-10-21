import React from 'react'
import { useGlobalContext } from '../context'

export default function SearchModal() {
    const {closeSearchModal, isSearchModalOpen} = useGlobalContext();
    return (
        <>
        {isSearchModalOpen && <div className="search-modal-container">
            <div className="search-modal">
        testing
            </div>
            <div className="search-modal-overlay">
            </div>
            <button onClick={closeSearchModal}></button>
        </div>}
        </>
    )
}
