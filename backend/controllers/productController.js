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

// @desc     Get product by ID
// @route    GET /api/products/:id
// @access   Public

const getProductById = async (req,res) => {

    const product = await Product.findById({_id: req.params.id});
    
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
    
}



// @desc     Add product
// @route    GET /api/products
// @access   Public

const addProduct = (req,res) => {
    res.json('adding product');
}


module.exports = { getProducts, getProductById};