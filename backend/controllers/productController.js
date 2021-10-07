const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');


// @desc     Get products
// @route    GET /api/products
// @access   Public

const getProducts = asyncHandler(async (req,res) => {
    let query = {};

    if(req.query.category !== 'undefined'){
        query = {...query, category:req.query.category}
    }
    if(req.query.type !== 'undefined'){
        query = {...query, productType:req.query.type}
    }

    console.log(query);
    const products = await Product.find({...query});
    res.json(products);
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