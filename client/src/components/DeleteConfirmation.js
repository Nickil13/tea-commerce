import React from 'react';
import { VscClose } from 'react-icons/vsc';
import { deleteProduct } from '../actions/productActions';
import { useDispatch } from 'react-redux';
import { useGlobalContext } from '../context';

export default function DeleteConfirmation() {
    //Is open, closeDeleteConfirmation
    const {deleteConfirmationInfo, closeDeleteConfirmation} = useGlobalContext();
    const {id,name,subject} = deleteConfirmationInfo;
    const dispatch = useDispatch();

    const handleDeleteConfirmation = () =>{
        dispatch(deleteProduct(id));
        closeDeleteConfirmation();
    }

    return (
        <div className="delete-confirmation-container">
            <div className="delete-confirmation">
                <h2>Delete {subject}</h2>
                <p>Are you sure you want to delete <strong>{name}</strong> ?</p>
                <button className="btn" onClick={handleDeleteConfirmation}>Yes</button>
                <span className="close-delete" onClick={closeDeleteConfirmation}><VscClose/></span>
            </div>
        </div>
        
    )
}
