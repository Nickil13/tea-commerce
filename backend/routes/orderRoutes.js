const express = require('express');
const {protect, admin} = require('../middleware/authMiddleware');
const { getMyOrders, getOrderById, createOrder, getMyOrderById, updateOrderToPaid} = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .post(protect,createOrder);
router.get('/myorders/:id', protect, getMyOrderById);
router.get('/myorders', protect, getMyOrders);
router.put('/:id/pay', protect, updateOrderToPaid);
router.route('/:id').get(protect, admin, getOrderById);


module.exports = router;