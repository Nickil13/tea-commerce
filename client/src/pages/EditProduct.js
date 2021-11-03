import React, { useState, useEffect } from 'react';
import { BsImage} from 'react-icons/bs';
import { teaProductCategories } from '../resources/teaInfoData';
import { useParams, useHistory} from 'react-router-dom';
import { getProductDetails, updateProduct, uploadProductImage } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingSpinner, Message } from '../components';
import { PRODUCT_UPDATE_RESET, PRODUCT_UPLOAD_IMAGE_RESET } from '../constants/productConstants';

export default function EditProduct() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [productType,setProductType] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(1);
    const [imageURI, setImageURI] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imagePath, setImagePath] = useState('');

    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const {productDetails, productUpdate, productUploadImage}= useSelector((state)=>state.products);
    const {product, loading, error} = productDetails;
    const {loading: updateLoading, success: updateSuccess, error: updateError} = productUpdate;
    const {uploadedResponse, success: uploadSuccess, loading: uploading, msg, error: uploadError} = productUploadImage;

    useEffect(()=>{
        //Load the  product
        if(!product.name || product._id!==id || updateSuccess){
            dispatch(getProductDetails(id));
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch({type: PRODUCT_UPLOAD_IMAGE_RESET});

            if(updateSuccess){
                history.push('/admin/products');
            }
        }else if(uploadSuccess && uploadedFile){
            setImageName(uploadedFile.name);
            setImagePath(uploadedResponse.secure_url); 
            
        }else{
            setName(product.name);
            setCategory(product.category);
            setProductType(product.productType);
            setImageName(product.image.split("/")[product.image.split("/").length-1]);
            setImagePath(product.image);
            setIngredients(product.ingredients.join(", "));
            setDescription(product.description);
            setPrice(product.price.toFixed(2));
            setCountInStock(Number(product.countInStock));
        }      
        
    },[id, product, updateSuccess, uploadSuccess])

    useEffect(()=>{
        // When the image source is set, upload the image.
        if(imageURI){
            uploadImage();
        }
    }, [imageURI])


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

    const handleEditProduct = (e) =>{
        e.preventDefault();
        let updatedIngredients = ingredients;
        if(ingredients && ingredients.includes(",")){
            updatedIngredients = [...new Set(ingredients.split(","))];
            updatedIngredients = updatedIngredients.map((ingredient)=> ingredient.trim());
        }else if(ingredients===''){
            updatedIngredients = [];
        }
       
        dispatch(updateProduct({
            _id: id,
            name,
            category,
            productType,
            image: imagePath,
            ingredients: updatedIngredients,
            description,
            price,
            countInStock
        }));
    }

    return (
        <div>
            <div className="edit-product-title">
                <h1>Edit Product</h1>
                <p>{product.name}</p>
            </div>
           
            {loading ? <LoadingSpinner/> : error ? <Message>{error}</Message> : <form className="edit-product-form" action="">
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
                    <h4>Image: </h4>
                    <div className="image-input-box">
                        <input type="file" accept="image/*" type="file" name="image" id="image" onChange={handleSelectImage} />
                        <p className="image-input-text">{imageName}</p>
                        <label htmlFor="image" className="image-input-label"><BsImage className="image-icon"/></label>
                        {uploading && <LoadingSpinner/>}
                    </div>
                    {uploadSuccess ? <Message type="success">{msg}</Message> : uploadError && <Message>{uploadError}</Message>}
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
                <button type="submit" className="btn btn-primary" onClick={handleEditProduct}>Edit</button>
                {updateLoading ? <LoadingSpinner/> : updateError ? <Message>{updateError}</Message> : updateSuccess && <Message>Successfully updated product.</Message>}
            </form>}
            
        </div>
    )
}
