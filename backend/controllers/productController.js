const asyncHandler = require('express-async-handler');

// @desc     Get products
// @route    GET /api/products
// @access   Public

const getProducts = (req,res) => {
    res.json('getting products');
}


module.exports = { getProducts};