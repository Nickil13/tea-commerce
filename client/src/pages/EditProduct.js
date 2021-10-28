import React, { useState, useEffect } from 'react';
import { teaProductCategories } from '../resources/teaInfoData';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

export default function EditProduct() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [productType,setProductType] = useState('');
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [description, setDescription] = useState("");

    const {id} = useParams();
    const dispatch = useDispatch();
    const {productDetails}= useSelector((state)=>state.products);
    const {product, success} = productDetails;

    useEffect(()=>{
        
        if(success){
            setName(product.name);
            setCategory(product.category);
            setProductType(product.category);
        }else{
            dispatch(getProductDetails(id));
        }
        
    },[id, success])

    return (
        <div>
            <h1 className="edit-product-title">Edit Product</h1>
            <form className="edit-product-form" action="">
                <div className="input-control">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="category-box">
                    <div className="input-control">
                        <label htmlFor="">Category: </label>
                        <select name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                {teaProductCategories.map((category)=>{
                                    return(
                                        <option key={category.id} value={category.type}>{category.type}</option>
                                    )
                                })}
                            </select>
                    </div>
                    <div className="input-control">
                        <label htmlFor="">Product Type: </label>
                        <select name="productType" id="productType" value={productType} onChange={(e)=>setProductType(e.target.value)}>
                                {teaProductCategories.filter((x)=>x.type === category)[0] && teaProductCategories.filter((x)=>x.type === category)[0].items.map((item, index)=>{
                                    return(
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                        </select>
                    </div>
                </div>
                <div className="input-control">
                    <label htmlFor="">Image: </label>
                    <input type="file" />
                </div>
                {/* <div className="input-control">
                    <label htmlFor="">Flavour Image: </label>
                    <input type="checkbox" />
                    <input type="text" />
                </div> */}
                <div className="input-control">
                    <label htmlFor="">Ingredients: </label>
                    <p>Separate ingredients with a comma</p>
                    <textarea type="text" rows="5"/>
                </div>
                <div className="input-control">
                    <label htmlFor="">Description: </label>
                    <textarea type="text" rows="10" />
                </div>
                <div className="input-control">
                    <label htmlFor="">Price: </label>
                    <input type="text" />
                </div>
                <div className="input-control">
                    <label htmlFor="">Count in Stock:</label>
                    <input type="text" />
                </div>
                <button type="submit" className="btn btn-primary">Edit</button>
            </form>
        </div>
    )
}
