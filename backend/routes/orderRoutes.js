const express = require('express');
const {protect, admin} = require('../middleware/authMiddleware');
const { getMyOrders, getOrderById, createOrder } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .post(protect,createOrder);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);


module.exports = router;