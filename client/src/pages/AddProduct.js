import React, { useState, useEffect } from "react";
import { BsImage } from "react-icons/bs";
import { teaProductCategories } from "../resources/teaInfoData";
import { useParams, useHistory } from "react-router-dom";
import { createProduct, uploadProductImage } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner, Message } from "../components";

import {
    productAddedReset,
    productUploadImageReset,
} from "../reducers/productsSlice";
import { Helmet } from "react-helmet";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [productType, setProductType] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(1);
    const [imageURI, setImageURI] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [imageName, setImageName] = useState("");
    const [imagePath, setImagePath] = useState("");

    //Flavour image
    const [hasFlavourImage, setHasFlavourImage] = useState(false);
    const [isUploadingFlavourImage, setIsUploadingFlavourImage] =
        useState(false);
    const [flavourImagePath, setFlavourImagePath] = useState("");
    const [flavourImageName, setFlavourImageName] = useState("");

    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        productImage,
        productImageUploading,
        productImageError,
        productAdded,
        addingProduct,
        addingProductError,
    } = useSelector((state) => state.productsSlice);

    useEffect(() => {
        //On page load
        dispatch(productUploadImageReset());
        dispatch(productAddedReset());
    }, [dispatch]);

    useEffect(() => {
        if (productAdded) {
            history.push("/admin/products");
            dispatch(productAddedReset());
        }
        if (productImage?.secure_url) {
            if (isUploadingFlavourImage) {
                setFlavourImageName(uploadedFile.name);
                setFlavourImagePath(productImage.secure_url);
                setIsUploadingFlavourImage(false);
            } else {
                setImageName(uploadedFile.name);
                setImagePath(productImage.secure_url);
            }
            dispatch(productUploadImageReset());
        }
    }, [
        dispatch,
        productAdded,
        productImage,
        history,
        uploadedFile,
        isUploadingFlavourImage,
    ]);

    useEffect(() => {
        // When the image source is set, upload the image.
        if (imageURI) {
            //Upload to cloudinary
            const arg = {
                imageURI,
                name: uploadedFile.name,
            };
            dispatch(uploadProductImage(arg)).unwrap();
            setImageURI("");
        }
    }, [imageURI, dispatch, uploadedFile]);

    useEffect(() => {
        //Automatically set the productType to the first value when a category is chosen.
        const currentCategory = teaProductCategories.filter(
            (cat) => cat.type === category
        )[0];
        if (currentCategory) {
            setProductType(currentCategory.items[0]);
        }
    }, [category]);

    const handleSelectImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setUploadedFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageURI(reader.result);
            };
        }
    };

    const handleSelectFlavourImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setUploadedFile(file);
            setIsUploadingFlavourImage(true);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageURI(reader.result);
            };
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        let updatedIngredients = ingredients;
        if (ingredients && ingredients.includes(",")) {
            updatedIngredients = [...new Set(ingredients.split(","))];
            updatedIngredients = updatedIngredients.map((ingredient) =>
                ingredient.trim()
            );
        } else if (ingredients === "") {
            updatedIngredients = [];
        }

        dispatch(
            createProduct({
                _id: id,
                name,
                category,
                productType,
                image: imagePath,
                flavourImage: flavourImagePath,
                ingredients: updatedIngredients,
                description,
                price,
                countInStock,
            })
        );
    };

    const handleFlavourCheckbox = (e) => {
        setHasFlavourImage(e.target.checked);
        if (!e.target.checked) {
            setFlavourImagePath("");
        }
    };

    return (
        <div>
            <Helmet>
                <title>Add Product | Tea-Commerce</title>
                <meta
                    name="description"
                    content="Add a new product to the store."
                />
            </Helmet>
            <div className="page-title">
                <h1>Add Product</h1>
            </div>

            <form className="product-form">
                <div className="input-control">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="category-box">
                    <div className="input-control">
                        <label htmlFor="">Category: </label>

                        <select
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="default" hidden>
                                product category
                            </option>
                            {teaProductCategories
                                .filter((cat) => cat.type !== "all")
                                .map((category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.type}
                                        >
                                            {category.type}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {category && (
                        <div className="input-control">
                            <label htmlFor="">Product Type: </label>
                            <select
                                name="productType"
                                id="productType"
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                            >
                                {teaProductCategories.filter(
                                    (x) => x.type === category
                                )[0] &&
                                    teaProductCategories
                                        .filter((x) => x.type === category)[0]
                                        .items.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                            );
                                        })}
                            </select>
                        </div>
                    )}
                </div>
                <div className="input-control">
                    <h4 className="image-label">Image: </h4>
                    <div className="image-input-box">
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            id="image"
                            onChange={handleSelectImage}
                        />
                        <p className="image-input-text">{imageName}</p>
                        <label htmlFor="image" className="image-input-label">
                            <BsImage className="image-icon" />
                        </label>
                        {!isUploadingFlavourImage && productImageUploading && (
                            <LoadingSpinner anchor="right" />
                        )}
                    </div>
                    {productImageError && (
                        <Message>{productImageError}</Message>
                    )}
                </div>
                <div className="input-control">
                    <div className="checkbox-control">
                        <input
                            type="checkbox"
                            id="flavour-checkbox"
                            name="flavour-checkbox"
                            onChange={handleFlavourCheckbox}
                        />
                        <label htmlFor="">Flavour Image: </label>
                    </div>

                    {hasFlavourImage && (
                        <div className="image-input-box">
                            <input
                                type="file"
                                accept="image/*"
                                name="flavourImage"
                                id="flavourImage"
                                onChange={handleSelectFlavourImage}
                            />
                            <p className="image-input-text">
                                {flavourImageName}
                            </p>
                            <label
                                htmlFor="flavourImage"
                                className="image-input-label"
                            >
                                <BsImage className="image-icon" />
                            </label>
                            {isUploadingFlavourImage &&
                                productImageUploading && (
                                    <LoadingSpinner anchor="right" />
                                )}
                        </div>
                    )}
                </div>

                <div className="input-control">
                    <label htmlFor="">Ingredients: </label>
                    <p>(separate ingredients with a comma)</p>
                    <textarea
                        type="text"
                        rows="3"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>

                <div className="input-control">
                    <label htmlFor="">Description: </label>
                    <textarea
                        type="text"
                        rows="6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="input-control">
                    <label htmlFor="price">Price (CAD): </label>
                    <span className="price-wrapper">
                        <input
                            type="number"
                            min="1"
                            step="any"
                            name="price"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </span>
                </div>
                <div className="input-control">
                    <label htmlFor="count">Count in Stock:</label>
                    <input
                        type="number"
                        step="1"
                        name="count"
                        id="count"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleAddProduct}
                >
                    Add
                </button>
                {addingProduct ? (
                    <LoadingSpinner />
                ) : (
                    addingProductError && (
                        <Message>{addingProductError}</Message>
                    )
                )}
            </form>
        </div>
    );
}
