const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');


// @desc     Get products
// @route    GET /api/products
// @access   Public

const getProducts = asyncHandler(async (req,res) => {
    const pageSize = 8;
    const page = Number(req.query.page) || 1;

    let query = {};

    //Query by product category (ex. loose leaf teas)
    if(req.query.category){
        query = {...query, category:req.query.category}
    }

    //Query by product type (ex. black tea, matcha)
    if(req.query.type){
        query = {...query, productType:req.query.type}
    }

    //Query by keyword
    if(req.query.keyword){
        query = {...query, $or: [
            {name: {
                $regex: req.query.keyword,
                $options: 'i'}
            },
            {productType: {
                $regex: req.query.keyword,
                $options: 'i'}
            },
            {category: {
                $regex: req.query.keyword,
                $options: 'i'}
            },
            {ingredients: {
                $regex: req.query.keyword,
                $options: 'i'}
            },
                    
        ]}
    }
    const count = await Product.countDocuments({...query});
    const products = await Product.find({...query}).limit(pageSize).skip(pageSize * (page-1));
    
    res.json({products, page, pages: Math.ceil(count/pageSize)});
})


// @desc     Get top product review
// @route    GET /api/products/:id/top-review
// @access   Public

const getTopProductReview = async (req,res) => {

    const product = await Product.findById(req.params.id);
    
    if(product){
        let topReview = product.reviews[0];
        for(let i=0;i<product.reviews.length;i++){
            if(product.reviews[i]>topReview){
                topReview = product.reviews[i];
            }
        }
        res.json(topReview);
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
    
}

// @desc     Get product by ID
// @route    GET /api/products/:id
// @access   Public

const getProductById = async (req,res) => {

    const product = await Product.findById(req.params.id);
    
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
    
}



// @desc     Create product
// @route    POST /api/products
// @access   Private/Admin

const createProduct = asyncHandler( async (req,res) => {
    const productExists = await Product.find({name: req.body.name});

    if(productExists){
        res.status(400);
        throw new Error("Product already exists by that name." + req.body.name);
    }else{
        const product = {
            name: req.body.name,
            productType: req.body.productType,
            user: req.user._id,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
            ingredients: req.body.ingredients,
            description: req.body.description,
            countInStock: req.body.countInStock
        }
        const createdProduct = await product.save();
        res.status(201);
        res.json(createdProduct);
    }
})

// @desc     Update product
// @route    PUT /api/products/:id
// @access   Private/Admin

const updateProduct = asyncHandler(async (req,res) => {
    const{name, productType, image, category, price, ingredients, description, countInStock} = req.body;
    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.productType = productType;
        product.image = image;
        product.category = category;
        product.price = price;
        product.ingredients = ingredients;
        product.description = description;
        product.countInStock = countInStock;

        try{
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        }catch(error){
            console.log(error);
        }
        
    }else{
        res.status(404);
        throw new Error("Product not found.");
    }
})

// @desc     Delete product
// @route    DELETE /api/products/:id
// @access   Private/Admin

const deleteProduct = async (req,res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        await product.remove();
        res.json({message: "Product removed"});
    }else{
        res.status(404);
        throw new Error("Product not found.");
    }
}


// @desc     Create a product review
// @route    POST /api/products/:id/reviews
// @access   Private

const createProductReview = asyncHandler(async (req,res) => {
    const{rating, comment} = req.body;

    const product = await Product.findById(req.params.id);
    
    if(product){
        const alreadyReviewed = product.reviews.find((review)=>review.user.toString() === req.user._id.toString());

        if(alreadyReviewed){
            res.status(400);
            throw new Error('User has already reviewed the product.');
        }

        const review = {
            username: req.user.username,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review)=>review.rating + acc, 0)/ product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added.'})
    }else{
        res.status(404);
        throw new Error('Product not found.');
    }
})

module.exports = { getProducts, getProductById, createProductReview, getTopProductReview, createProduct, updateProduct, deleteProduct};