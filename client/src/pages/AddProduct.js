import React, { useState, useEffect } from 'react';
import { BsImage} from 'react-icons/bs';
import { teaProductCategories } from '../resources/teaInfoData';
import { useParams } from 'react-router-dom';
import { createProduct, uploadProductImage } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingSpinner, Message } from '../components';

export default function AddProduct() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [productType,setProductType] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(1);
    const [imageURI, setImageURI] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imagePath, setImagePath] = useState('');

    const {id} = useParams();
    const dispatch = useDispatch();
    const {productUploadImage, productCreate}= useSelector((state)=>state.products);
    const {uploadedResponse, success: uploadSuccess, loading: uploading, msg, error} = productUploadImage;
    const {product, loading, error: createError, success: createSuccess} = productCreate;

    
    useEffect(()=>{
        // When the image source is set, upload the image.
        if(imageURI){
            uploadImage();
        }
    }, [imageURI])

    useEffect(()=>{
        if(uploadSuccess){
            setImageName(uploadedFile.name);
            setImagePath(uploadedResponse.secure_url);
        }
        
    },[uploadSuccess])

    useEffect(()=>{
        //Automatically set the productType to the first value when a category is chosen.
        const currentCategory = teaProductCategories.filter((cat)=>cat.type === category)[0];
        if(currentCategory){
            setProductType((currentCategory.items)[0]);
        }
    }, [category])

    const handleSelectImage =  (e) =>{
        const file = e.target.files[0];

        if(file){
            setUploadedFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageURI(reader.result);
            }
        }
    }

    const uploadImage = async () =>{
        if(imageURI){
            //Upload to cloudinary
            dispatch(uploadProductImage(imageURI, uploadedFile.name));
        }
    }

    const handleAddProduct = (e) =>{
        e.preventDefault();
        if(ingredients.includes(",")){
            console.log('commas found');
        }
        // let updatedIngredients = new Set(ingredients.split(","));
        
        dispatch(createProduct({
            _id: id,
            name,
            category,
            productType,
            image: imagePath,
            // ingredients: [...updatedIngredients],
            ingredients,
            description,
            price,
            countInStock
        }));
    }

    return (
        <div>
            <div className="edit-product-title">
                <h1>Add Product</h1>
            </div>
           
            <form className="edit-product-form" action="">
                <div className="input-control">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="category-box">
                    <div className="input-control">
                        <label htmlFor="">Category: </label>
                        
                        <select name="category" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="default" hidden>product category</option>
                                {teaProductCategories.map((category)=>{
                                    if(category.type!=="all"){
                                        return(
                                            <option key={category.id} value={category.type}>{category.type}</option>
                                        )
                                    } 
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
                    <h4>Image: </h4>
                    <div className="image-input-box">
                        <input type="file" accept="image/*" type="file" name="image" id="image" onChange={handleSelectImage} />
                        <p className="image-input-text">{imageName}</p>
                        <label htmlFor="image" className="image-input-label"><BsImage className="image-icon"/></label>
                        {uploading && <LoadingSpinner/>}
                    </div>
                    {uploadSuccess ? <Message type="success">{msg}</Message> : error && <Message>{error}</Message>}
                </div>
                {/* <div className="input-control">
                    <label htmlFor="">Flavour Image: </label>
                    <input type="checkbox" />
                    <input type="text" />
                </div> */}
                <div className="input-control">
                    <label htmlFor="">Ingredients: </label>
                    <p>Separate ingredients with a comma</p>
                    <textarea type="text" rows="3" value={ingredients} onChange={(e)=>setIngredients(e.target.value)}/>
                </div>
                <div className="input-control">
                    <label htmlFor="">Description: </label>
                    <textarea type="text" rows="6" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className="input-control">
                    <label htmlFor="price">Price (CAD): </label>
                    <span className="price-wrapper">
                    <input type="number" min="1"  step="any" name="price" id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/></span>
                </div>
                <div className="input-control">
                    <label htmlFor="count">Count in Stock:</label>
                    <input type="number" step="1" name="count" id="count" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddProduct}>Add</button>
                {loading ? <LoadingSpinner/> : createError ? <Message>{createError}</Message> : createSuccess && <Message>Successfully added product.</Message>}
            </form>
            
        </div>
    )
}
