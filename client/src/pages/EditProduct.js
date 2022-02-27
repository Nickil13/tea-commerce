import React, { useState, useEffect } from "react";
import { BsImage } from "react-icons/bs";
import { teaProductCategories } from "../resources/teaInfoData";
import { useParams, useHistory } from "react-router-dom";
import {
    getProductDetails,
    editProduct,
    uploadProductImage,
} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner, Message } from "../components";
import {
    productEditedReset,
    productUploadImageReset,
} from "../reducers/productsSlice";

export default function EditProduct() {
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
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        product,
        productImage,
        productImageUploading,
        productImageError,
        productEditedLoading,
        productEditedSuccess,
        productEditedError,
        loading,
        error,
    } = useSelector((state) => state.productsSlice);

    useEffect(() => {
        // On page load
        dispatch(productUploadImageReset());
    }, []);

    useEffect(() => {
        //Load the  product
        if (!product.name || product._id !== id || productEditedSuccess) {
            if (productEditedSuccess) {
                history.goBack();
                dispatch(productEditedReset());
            } else {
                dispatch(getProductDetails(id));
            }
        } else if (!name || !productType) {
            setName(product.name);
            setCategory(product.category);
            setProductType(product.productType);
            setImageName(
                product.image.split("/")[product.image.split("/").length - 1]
            );
            setImagePath(product.image);
            setFlavourImageName(
                product.flavourImage
                    ? product.flavourImage.split("/")[
                          product.image.split("/").length - 1
                      ]
                    : ""
            );
            setFlavourImagePath(
                product.flavourImage ? product.flavourImage : ""
            );
            if (product.flavourImage) {
                setHasFlavourImage(true);
            }
            setIngredients(product.ingredients.join(", "));
            setDescription(product.description);
            setPrice(product.price.toFixed(2));
            setCountInStock(Number(product.countInStock));
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
        }
    }, [
        id,
        product,
        productEditedSuccess,
        productImage,
        dispatch,
        history,
        isUploadingFlavourImage,
        uploadedFile,
        name,
        productType,
    ]);

    useEffect(() => {
        // When the image source is set, upload the image.
        if (imageURI) {
            const arg = {
                imageURI,
                name: uploadedFile.name,
            };
            // Upload to cloudinary
            dispatch(uploadProductImage(arg)).unwrap();
            setImageURI("");
        }
    }, [imageURI, dispatch, uploadedFile]);

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

    const handleEditProduct = (e) => {
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
            editProduct({
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
            <div className="page-title">
                <h1>Edit Product</h1>
                <p>{product.name}</p>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
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
                            <label
                                htmlFor="image"
                                className="image-input-label"
                            >
                                <BsImage className="image-icon" />
                            </label>
                            {!isUploadingFlavourImage &&
                                productImageUploading && (
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
                                defaultChecked={product.flavourImage}
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
                        onClick={handleEditProduct}
                    >
                        Edit
                    </button>
                    {productEditedLoading ? (
                        <LoadingSpinner />
                    ) : (
                        productEditedError && (
                            <Message>{productEditedError}</Message>
                        )
                    )}
                </form>
            )}
        </div>
    );
}
