const express = require('express');
const {protect, admin} = require('../middleware/authMiddleware');
const { getMyOrders, getOrderById, createOrder, getMyOrderById} = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .post(protect,createOrder);
router.get('/myorders/:id', protect, getMyOrderById);
router.get('/myorders', protect, getMyOrders);
router.put('/:id/pay', protect);
router.route('/:id').get(protect, admin, getOrderById);


module.exports = router;