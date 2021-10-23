const express = require('express');
const { getProducts, getProductById, createProductReview, getTopProductReview } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getProducts);
router.get('/:id/reviews/top-review', getTopProductReview);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id').get(getProductById);


module.exports = router;
